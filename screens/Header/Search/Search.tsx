import { FlashList } from "@shopify/flash-list";
import Icon from "components/Icon";
import ProfileCard from "components/ProfileCard";
import Recommended from "components/Search/Recommended";
import { SEARCH } from "constants/tracking";
import { HandleInfo, LimitType, Profile, useSearchProfilesLazyQuery } from "customTypes/generated";
import { RootStackScreenProps } from "customTypes/navigation";
import { StatusBar } from "expo-status-bar";
import useDebounce from "hooks/useDebounce";
import React, { useEffect, useState } from "react";
import {
	Dimensions,
	Platform,
	Pressable,
	SafeAreaView,
	StyleSheet,
	TextInput,
	View,
} from "react-native";
import { useGuestStore } from "store/GuestStore";
import { useAuthStore, useThemeStore } from "store/Store";
import formatHandle from "utils/formatHandle";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";
import TrackAction from "utils/Track";

const Search = ({ navigation }: RootStackScreenProps<"Search">) => {
	const { DARK_PRIMARY } = useThemeStore();
	const authStore = useAuthStore();
	const [keyword, setKeyword] = useState<string>("");
	const inputRef = React.useRef<TextInput>(null);
	const debouncedValue = useDebounce<string>(keyword, 300);
	const { isGuest } = useGuestStore();

	const [searchChannels, { data: result, error, loading }] = useSearchProfilesLazyQuery();

	const onDebounce = async () => {
		if (keyword.trim().length > 0) {
			Logger.Log("Yeh hai chize", keyword);
			try {
				await searchChannels({
					variables: {
						request: {
							query: keyword,
							limit: LimitType.TwentyFive,
							// sources: ["lenstube"],
						},
					},
					context: {
						headers: {
							"x-access-token": `${!isGuest ? `Bearer ${authStore.accessToken}` : ""}`,
						},
					},
				});
			} catch (error) {
			} finally {
			}
		}
	};

	useEffect(() => {
		onDebounce();
	}, [debouncedValue]);

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

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor="transparent" style="auto" />
			{keyword?.length ? (
				<FlashList
					removeClippedSubviews={true}
					data={result?.searchProfiles?.items}
					keyExtractor={(_, index) => index.toString()}
					estimatedItemSize={100}
					renderItem={({ item }: { item: Profile }) => (
						<ProfileCard
							profileIcon={getRawurl(item?.metadata?.picture)}
							profileName={item?.metadata?.displayName || item?.id}
							profileId={item?.id}
							isFollowed={item?.operations?.isFollowedByMe?.value || false}
							handle={item?.handle?.fullHandle}
							owner={item?.ownedBy?.address}
						/>
					)}
					contentContainerStyle={{
						paddingHorizontal: 8,
					}}
				/>
			) : (
				<Recommended />
			)}
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
