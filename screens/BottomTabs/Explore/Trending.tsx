import * as React from "react";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Pressable,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	View,
} from "react-native";
import ErrorMessage from "../../../components/common/ErrorMesasge";
import StyledText from "components/UI/StyledText";
import VideoCardSkeleton from "components/UI/VideoCardSkeleton";
import VideoCard from "components/VideoCard";
import Skeleton from "components/common/Skeleton";
import { dark_primary } from "constants/Colors";
import { EXPLORE } from "constants/tracking";
import {
	Mirror,
	Post,
	PublicationMainFocus,
	PublicationSortCriteria,
	PublicationTypes,
	useExploreQuery,
} from "customTypes/generated";
import { RootTabScreenProps } from "customTypes/navigation";
import { useGuestStore } from "store/GuestStore";
import { useAuthStore, useProfile, useThemeStore } from "store/Store";
import TrackAction from "utils/Track";

type Explore = Post | Mirror;

export default function Trending({ navigation }: RootTabScreenProps<"Trending">) {
	const tags = [
		{
			name: PublicationSortCriteria.Latest,
			active: true,
		},
		{
			name: PublicationSortCriteria.TopCommented,
			active: false,
		},
		{
			name: PublicationSortCriteria.TopCollected,
			active: false,
		},
		{
			name: PublicationSortCriteria.TopMirrored,
			active: false,
		},
		{
			name: PublicationSortCriteria.CuratedProfiles,
			active: false,
		},
	];

	const [currentTag, setCurrentTag] = useState<{
		name: PublicationSortCriteria;
		active: boolean;
	}>(tags[0]);
	const theme = useThemeStore();
	const { accessToken } = useAuthStore();
	const { currentProfile } = useProfile();
	const { isGuest, profileId } = useGuestStore();
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const QueryRequest = {
		sortCriteria: currentTag.name,
		noRandomize: true,
		publicationTypes: [PublicationTypes.Post],
		metadata: {
			mainContentFocus: [PublicationMainFocus.Video],
		},
		sources: ["lensplay", "lenstube"],
		limit: 10,
	};

	const {
		data: ExploreData,
		error,
		loading,
		refetch,
		fetchMore,
	} = useExploreQuery({
		variables: {
			request: QueryRequest,
			reactionRequest: {
				profileId: isGuest ? "" : currentProfile?.id,
			},
			channelId: isGuest ? "" : currentProfile?.id,
		},
		context: {
			headers: {
				"x-access-token": `${!isGuest ? `Bearer ${accessToken}` : ""}`,
			},
		},
	});

	useEffect(() => {
		refetch({
			request: QueryRequest,
		});
	}, [currentTag]);

	if (error) return <ErrorMessage message={"Looks like something went wrong"} />;

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

	const Refresh = (
		<RefreshControl
			refreshing={refreshing}
			onRefresh={onRefresh}
			colors={[theme.PRIMARY]}
			progressBackgroundColor={"black"}
		/>
	);

	const pageInfo = ExploreData?.explorePublications?.pageInfo;

	const keyExtractor = (item: Explore) => item.id.toString();

	const ITEM_HEIGHT = 280;

	const getItemLayout = (_: any, index: number) => {
		return {
			length: ITEM_HEIGHT,
			offset: ITEM_HEIGHT * index,
			index,
		};
	};
	TrackAction(EXPLORE.SWITCH_EXPLORE_FEED_TAB);

	const onEndCallBack = () => {
		if (!pageInfo?.next) {
			// console.log("sab khatam ho gaya");
			return;
		}
		fetchMore({
			variables: {
				request: {
					cursor: pageInfo?.next,
					...QueryRequest,
				},
			},
		}).catch((err) => {});
	};

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

	const RenderItem = ({ item }: { item: Explore }) => {
		if (!item.hidden) {
			return (
				<VideoCard
					key={`${item.id}-${item.createdAt}`}
					publication={item as Explore}
					id={item.id}
				/>
			);
		}
		return null;
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
			<ScrollView
				style={{
					height: 60,
					paddingVertical: 8,
					maxHeight: 60,
					marginLeft: 10,
				}}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			>
				{tags.map((item, index) => {
					return (
						<Pressable
							android_ripple={{
								color: "transparent",
							}}
							onTouchEndCapture={() => {
								setCurrentTag(tags[index]);
							}}
							key={index}
							style={{
								marginHorizontal: 4,
								backgroundColor: `${currentTag.name === item.name ? theme.PRIMARY : dark_primary}`,
								width: "auto",
								maxHeight: 34,
								paddingHorizontal: 12,
								paddingVertical: 6,
								justifyContent: "center",
								alignItems: "center",
								borderRadius: 8,
							}}
						>
							<StyledText
								title={item.name.replace(/_/g, " ")}
								style={{
									fontSize: 12,
									fontWeight: "600",
									color: `${currentTag.name === item.name ? "black" : "white"}`,
								}}
							/>
						</Pressable>
					);
				})}
			</ScrollView>
			{loading ? (
				<Skeleton children={<VideoCardSkeleton />} number={10} />
			) : (
				<FlatList
					data={ExploreData?.explorePublications.items as Explore[]}
					keyExtractor={keyExtractor}
					getItemLayout={getItemLayout}
					initialNumToRender={3}
					maxToRenderPerBatch={5}
					ListFooterComponent={<MoreLoader />}
					onEndReached={onEndCallBack}
					onEndReachedThreshold={0.5}
					refreshControl={Refresh}
					renderItem={RenderItem}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</SafeAreaView>
	);
}
