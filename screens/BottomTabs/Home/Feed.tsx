import { FlashList } from "@shopify/flash-list";
import Icon from "components/Icon";
import PleaseLogin from "components/PleaseLogin";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import VideoCardSkeleton from "components/UI/VideoCardSkeleton";
import VideoCard from "components/VideoCard";
import CategoriesChip from "components/common/CategoriesChip";
import ErrorMessage from "components/common/ErrorMesasge";
import Skeleton from "components/common/Skeleton";
import { black, white } from "constants/Colors";
import { SOURCES } from "constants/index";
import {
	FeedEventItemType,
	useFeedQuery,
	type FeedItem,
	PublicationMetadataMainFocusType,
	type FeedRequest,
} from "customTypes/generated";
import type { RootTabScreenProps } from "customTypes/navigation";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import usePushNotifications from "hooks/usePushNotifications";
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
import { useGuestStore } from "store/GuestStore";
import {
	useActiveVideoFilters,
	useAuthStore,
	useProfile,
	useThemeStore,
} from "store/Store";
import getAndSaveNotificationToken from "utils/getAndSaveNotificationToken";
import Logger from "utils/logger";

const Feed = ({ navigation }: RootTabScreenProps<"Home">) => {
	usePushNotifications();
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const theme = useThemeStore();
	const { isGuest } = useGuestStore();
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();
	const { activeFilter } = useActiveVideoFilters();
	React.useEffect(() => {
		getAndSaveNotificationToken(currentProfile?.id);
	}, []);

	ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

	const QueryRequest: FeedRequest = {
		where: {
			feedEventItemTypes: [FeedEventItemType.Post],
			for: currentProfile?.id,
			metadata: {
				publishedOn: SOURCES,
				mainContentFocus: [PublicationMetadataMainFocusType.Video],
				tags: {
					//@ts-expect-error
					all: activeFilter === "all" ? undefined : activeFilter,
				},
			},
		},
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
		},
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
			Logger.Log("Making Paginato Call");
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
		if (item.root.metadata.__typename !== "VideoMetadataV3") return null;
		if (!item.root.isHidden) {
			return <VideoCard publication={item.root} id={item?.root?.id} />;
		}
		return null;
	}, []);
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
				) : Feeddata?.feed?.items.length! > 0 ? (
					<ErrorMessage message="No more Videos to load" withImage={false} />
				) : null}
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

	const _Empty = () => {
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView
					refreshControl={_RefreshControl}
					contentContainerStyle={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
						paddingVertical: 60,
					}}
				>
					<NotFound navigation={navigation} />
				</ScrollView>
			</SafeAreaView>
		);
	};

	const Empty = React.memo(_Empty);

	if (isGuest) return <PleaseLogin />;
	if (error) {
		Logger.Error("e", error);
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView
					refreshControl={_RefreshControl}
					contentContainerStyle={{
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<NotFound navigation={navigation} />
				</ScrollView>
			</SafeAreaView>
		);
	}
	if (loading) {
		return (
			<SafeAreaView style={styles.container}>
				<StatusBar backgroundColor={"black"} />
				<CategoriesChip />
				<Skeleton number={10}>
					<VideoCardSkeleton />
				</Skeleton>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={"black"} />
			<CategoriesChip />
			<FlashList
				data={Feeddata?.feed.items as FeedItem[]}
				keyExtractor={keyExtractor}
				estimatedItemSize={280}
				removeClippedSubviews={true}
				refreshControl={_RefreshControl}
				ListEmptyComponent={Empty}
				ListFooterComponent={<MoreLoader />}
				onEndReachedThreshold={0.2}
				onEndReached={onEndCallBack}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
};
export default Feed;

const NotFound = ({ navigation }: { navigation: any }) => {
	return (
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
					icon={<Icon name="arrowForward" size={16} color={black[500]} />}
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
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
});
