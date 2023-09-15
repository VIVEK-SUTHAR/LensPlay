import { FlashList } from "@shopify/flash-list";
import ArrowForward from "assets/Icons/ArrowForward";
import Icon from "components/Icon";
import PleaseLogin from "components/PleaseLogin";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import VideoCardSkeleton from "components/UI/VideoCardSkeleton";
import VideoCard from "components/VideoCard";
import ErrorMessage from "components/common/ErrorMesasge";
import Skeleton from "components/common/Skeleton";
import { black, white } from "constants/Colors";
import { SOURCES } from "constants/index";
import { HOME } from "constants/tracking";
import {
	FeedEventItemType,
	PublicationMainFocus,
	useFeedQuery,
	type FeedItem,
	type FeedItemRoot,
	useProfileBookMarksLazyQuery,
} from "customTypes/generated";
import type { RootTabScreenProps } from "customTypes/navigation";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	Image,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import { getColors } from "react-native-image-colors";
import { useGuestStore } from "store/GuestStore";
import { useAuthStore, useProfile, useThemeStore } from "store/Store";
import useWatchLater from "store/WatchLaterStore";
import TrackAction from "utils/Track";
import getAndSaveNotificationToken from "utils/getAndSaveNotificationToken";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";

const Feed = ({ navigation }: RootTabScreenProps<"Home">) => {
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const theme = useThemeStore();
	const { isGuest } = useGuestStore();
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();
	const { setCover, setColor, sessionCount } = useWatchLater();

	React.useEffect(() => {
		getAndSaveNotificationToken(currentProfile?.id);
	}, []);

	ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

	const QueryRequest = {
		profileId: currentProfile?.id,
		limit: 10,
		metadata: {
			mainContentFocus: [PublicationMainFocus.Video],
		},
		feedEventItemTypes: [FeedEventItemType.Post],
		sources: SOURCES,
	};

	const {
		data: Feeddata,
		error,
		loading,
		refetch,
		fetchMore,
	} = useFeedQuery({
		variables: {
			request: QueryRequest,
			reactionRequest: {
				profileId: currentProfile?.id,
			},
			channelId: currentProfile?.id,
		},
		fetchPolicy: "network-only",
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		try {
			refetch({
				request: QueryRequest,
			})
				.then(() => {
					setRefreshing(false);
				})
				.catch((err) => {});
		} catch (error) {
		} finally {
			setRefreshing(false);
		}
	}, []);

	const pageInfo = Feeddata?.feed.pageInfo;

	const keyExtractor = (item: FeedItem) => item?.root?.id?.toString();

	const onEndCallBack = React.useCallback(() => {
		if (!pageInfo?.next) {
			return;
		}
		fetchMore({
			variables: {
				request: {
					...QueryRequest,
					cursor: pageInfo?.next,
				},
			},
		}).catch((err) => {});
	}, [pageInfo?.next]);

	const renderItem = React.useCallback(({ item }: { item: FeedItem }) => {
		if (!item.root.hidden) {
			return <VideoCard publication={item?.root as FeedItemRoot} id={item?.root?.id} />;
		}
		return null;
	}, []);

	if (Feeddata) {
		TrackAction(HOME.SWITCH_HOME_TAB);
	}

	const _MoreLoader = () => {
		return (
			<>
				{pageInfo?.next ? (
					<View
						style={{
							height: 100,
							width: Dimensions.get("screen").width,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<ActivityIndicator size={"small"} color={theme.PRIMARY} />
					</View>
				) : (
					<ErrorMessage message="No more Videos to load" withImage={false} />
				)}
			</>
		);
	};

	const MoreLoader = React.memo(_MoreLoader);

	const _RefreshControl = (
		<RefreshControl
			refreshing={refreshing}
			onRefresh={onRefresh}
			colors={[theme.PRIMARY]}
			progressBackgroundColor={"black"}
		/>
	);

	//Bookmarks
	async function handleCover(coverURL: string) {
		setCover(coverURL);
		getColors(coverURL, {
			fallback: "#000000",
			cache: true,
			key: coverURL,
			quality: "lowest",
			pixelSpacing: 500,
		})
			.then((colors) => {
				switch (colors.platform) {
					case "android":
						setColor(colors?.average);
						break;
					case "ios":
						setColor(colors?.detail);
						break;
					default:
						setColor("#7A52B5");
				}
			})
			.catch((error) => {
				setColor("#7A52B5");
				Logger.Error("Failed to fetch image for geting dominient color", error);
			});
	}

	const [getBookMarks, { data }] = useProfileBookMarksLazyQuery({
		variables: {
			req: {
				profileId: currentProfile?.id,
				metadata: {
					mainContentFocus: [PublicationMainFocus.Video],
				},
			},
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});

	React.useEffect(() => {
		getBookMarks()
			.then((res) => {
				if (
					(res && res?.data?.publicationsProfileBookmarks?.items[0]?.__typename === "Post") ||
					res?.data?.publicationsProfileBookmarks?.items[0]?.__typename === "Mirror"
				) {
					handleCover(
						getIPFSLink(
							getRawurl(res?.data?.publicationsProfileBookmarks?.items[0]?.metadata?.cover)
						)
					);
				}
			})
			.catch((err) => {
				Logger.Error("[Error while fetching Bookmarks....]", err);
			});
	}, [sessionCount]);

	if (isGuest) return <PleaseLogin />;
	if (error) {
		Logger.Error("e", error);
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView
					refreshControl={_RefreshControl}
					contentContainerStyle={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<NotFound navigation={navigation} />
				</ScrollView>
			</SafeAreaView>
		);
	}
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={"black"} />
			{loading ? (
				<Skeleton children={<VideoCardSkeleton />} number={10} />
			) : (
				<FlashList
					data={Feeddata?.feed.items as FeedItem[]}
					keyExtractor={keyExtractor}
					estimatedItemSize={280}
					removeClippedSubviews={true}
					onLoad={({ elapsedTimeInMs }) => {
						Logger.Warn(`Feed List Loading time ${elapsedTimeInMs} ms`);
					}}
					refreshControl={_RefreshControl}
					ListFooterComponent={<MoreLoader />}
					onEndReachedThreshold={0.7}
					onEndReached={onEndCallBack}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</SafeAreaView>
	);
};
export default Feed;

const NotFound = ({ navigation }: { navigation: any }) => {
	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Image
					style={{
						height: 300,
						width: 300,
					}}
					resizeMode="contain"
					source={require("../../../assets/images/home.png")}
				/>
				<View
					style={{
						alignItems: "center",
						paddingHorizontal: 24,
					}}
				>
					<Heading
						title="Looks like you just landed,follow some profile to explore feed"
						style={{
							fontSize: 16,
							color: white[200],
							fontWeight: "600",
							alignSelf: "flex-start",
							textAlign: "center",
							marginBottom: 24,
						}}
					/>
					<Button
						title="Explore"
						icon={<ArrowForward height={16} width={16} />}
						iconPosition="right"
						width={"auto"}
						bg={white[800]}
						px={24}
						py={8}
						textStyle={{
							color: black[500],
							fontSize: 16,
							fontWeight: "600",
						}}
						onPress={() => {
							navigation.navigate("Trending");
						}}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
});
