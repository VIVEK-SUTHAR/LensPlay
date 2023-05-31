import { useLazyQuery } from "@apollo/client";
import Icon from "components/Icon";
import ProfileCard from "components/ProfileCard";
import Recommended from "components/Search/Recommended";
import { SEARCH } from "constants/tracking";
import {
	SearchProfilesDocument,
	SearchPublicationsDocument,
	SearchRequestTypes
} from "customTypes/generated";
import { RootStackScreenProps } from "customTypes/navigation";
import { StatusBar } from "expo-status-bar";
import useDebounce from "hooks/useDebounce";
import React, { useEffect, useState } from "react";
import {
	Dimensions,
	FlatList,
	Platform,
	Pressable,
	SafeAreaView,
	StyleSheet,
	TextInput,
	View
} from "react-native";
import { useGuestStore } from "store/GuestStore";
import { useAuthStore, useThemeStore } from "store/Store";
import TrackAction from "utils/Track";

const Search = ({ navigation }: RootStackScreenProps<"Search">) => {
	const { DARK_PRIMARY } = useThemeStore();
	const authStore = useAuthStore();
	const [keyword, setKeyword] = useState<string>("");
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [isfound, setIsfound] = useState<boolean>(true);
	const [searchType, setSearchType] = useState<SearchRequestTypes>(SearchRequestTypes.Profile);

	const inputRef = React.useRef<TextInput>(null);
	const debouncedValue = useDebounce<string>(keyword, 500);
	const { isGuest } = useGuestStore();

	const [searchChannels, { data: result, error, loading }] = useLazyQuery(
		searchType === SearchRequestTypes.Profile ? SearchProfilesDocument : SearchPublicationsDocument
	);

	const onDebounce = async () => {
		if (keyword.trim().length > 0) {
			try {
				setIsSearching(true);
				if (isGuest) {
					searchChannels({
						variables: {
							request: {
								type: searchType,
								query: keyword,
								limit: 30,
								sources: ["lenstube"],
							},
						},
					});
					if (result?.search?.items?.length > 0) {
						setIsfound(true);
					} else {
						setIsfound(false);
					}
				} else {
					searchChannels({
						variables: {
							request: {
								type: searchType,
								query: keyword,
								limit: 30,
								sources: ["lenstube"],
							},
						},
						context: {
							headers: {
								"x-access-token": `Bearer ${authStore.accessToken}`,
							},
						},
					});
					if (result?.items?.length > 0) {
						setIsfound(true);
					} else {
						setIsfound(false);
					}
				}
			} catch (error) {
				if (error instanceof Error) {
					setIsSearching(false);
				}
			} finally {
				// setIsSearching(false);
			}
		}
	};

	useEffect(() => {
		onDebounce();
	}, [debouncedValue, searchType]);

	React.useLayoutEffect(() => {
		TrackAction(SEARCH.SEARCH_VIDEOS_TAB);
		navigation.setOptions({
			headerStyle: { backgroundColor: "black" },
			headerTitle: "",
			headerTransparent: false,
			headerLeft: () => {
				return (
					<View style={[styles.headerContainer, { backgroundColor: DARK_PRIMARY }]}>
						<Pressable
							onPress={(e) => {
								e.preventDefault();
								navigation.goBack();
							}}
							style={{
								marginRight: 8,
								paddingHorizontal: 4,
							}}
						>
							<Icon name="arrowLeft" size={20} />
						</Pressable>
						<TextInput
							ref={inputRef}
							autoFocus={true}
							placeholder="Search by channel"
							placeholderTextColor={"white"}
							selectionColor={"white"}
							onChange={(e) => {
								setKeyword(e.nativeEvent.text);
								onDebounce();
							}}
							style={styles.textInput}
						/>
					</View>
				);
			},
		});
	}, []);

	const ITEM_HEIGHT = 78;

	const getItemLayout = (_: any, index: number) => {
		return {
			length: ITEM_HEIGHT,
			offset: ITEM_HEIGHT * index,
			index,
		};
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor="transparent" style="auto" />
			{!isSearching ? <Recommended /> : null}
			<FlatList
				style={{
					backgroundColor: "black",
					height: "100%",
				}}
				removeClippedSubviews={true}
				getItemLayout={getItemLayout}
				initialNumToRender={12}
				// ListEmptyComponent={!isfound ? <Recommended /> : null}
				data={searchType === SearchRequestTypes.Profile ? result?.search?.items : null}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => (
					<ProfileCard
						profileIcon={item?.picture?.original?.url}
						profileName={item?.name || item?.id}
						profileId={item?.id}
						isFollowed={item?.isFollowedByMe || false}
						handle={item?.handle}
						owner={item?.ownedBy}
					/>
				)}
			/>
			{/* <Tabs>
        <Tab.Screen
          name="Profile"
          listeners={{
            focus: () => {
              setSearchType(SearchRequestTypes.Profile);
            },
          }}
          children={() => (
             */}
			{/* <Tab.Screen
          name="Videos"
          listeners={{
            focus: () => {
              setSearchType(SearchRequestTypes.Publication);
            },
          }}
          children={() => (
            <FlatList
              style={{
                backgroundColor: "black",
                height: "100%",
              }}
              ListEmptyComponent={<NotFound message="Result not found" />}
              data={
                searchType === SearchRequestTypes.Publication
                  ? result?.search?.items
                  : null
              }
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    backgroundColor: "black",
                    paddingVertical: 8,
                  }}
                >
                  <VideoCard publication={item} id={index.toString()} />
                </View>
              )}
            />
          )}
        /> */}
			{/* </Tabs> */}
		</SafeAreaView>
	);
};

export default Search;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		paddingBottom: 16,
		paddingHorizontal: 16,
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: Dimensions.get("window").width * 0.9,
		paddingHorizontal: 8,
		borderRadius: 50,
		paddingVertical: 8,
	},
	searchingLoader: {
		fontSize: 16,
		color: "white",
		marginVertical: 4,
		marginHorizontal: 16,
		fontWeight: "600",
		alignSelf: "flex-start",
	},
	textInput: {
		flex: 1,
		color: "white",
		fontSize: 12,
		paddingVertical: Platform.OS == "ios" ? 4 : 0,
	},
});
