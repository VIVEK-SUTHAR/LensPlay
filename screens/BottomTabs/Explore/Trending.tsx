import * as React from "react";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	RefreshControl,
	SafeAreaView,
	ScrollView,
} from "react-native";
import ErrorMessage from "../../../components/common/ErrorMesasge";
import Skeleton from "../../../components/common/Skeleton";
import StyledText from "../../../components/UI/StyledText";
import VideoCardSkeleton from "../../../components/UI/VideoCardSkeleton";
import VideoCard from "../../../components/VideoCard";
import { dark_primary } from "../../../constants/Colors";
import { EXPLORE } from "../../../constants/tracking";
import { useGuestStore } from "../../../store/GuestStore";
import { useAuthStore, useProfile, useThemeStore } from "../../../store/Store";
import {
	PublicationMainFocus,
	PublicationSortCriteria,
	PublicationTypes,
	useExploreQuery,
	type Mirror,
	type Post,
} from "../../../types/generated";
import { type RootTabScreenProps } from "../../../types/navigation/types";
import TrackAction from "../../../utils/Track";

type Explore = Post | Mirror;

export default function Trending({ navigation }: RootTabScreenProps<"Trending">): JSX.Element {
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
				profileId: isGuest ? profileId : currentProfile?.id,
			},
		},
		context: {
			headers: {
				"x-access-token": `${!isGuest ? `Bearer ${accessToken}` : ""}`,
			},
		},
	});

	useEffect(() => {
		void refetch({
			request: QueryRequest,
		});
	}, [currentTag]);

	if (error != null) return <ErrorMessage message={"Looks like something went wrong"} />;

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		try {
			refetch({
				request: QueryRequest,
			})
				.then(() => {
					setRefreshing(false);
				})
				.catch(() => {});
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

	const keyExtractor = (item: Explore): string => item.id.toString();

	const ITEM_HEIGHT = 280;

	const getItemLayout = (_: any, index: number): any => {
		return {
			length: ITEM_HEIGHT,
			offset: ITEM_HEIGHT * index,
			index,
		};
	};
	void TrackAction(EXPLORE.SWITCH_EXPLORE_FEED_TAB);

	const onEndCallBack = (): void => {
		if (pageInfo?.next === null) {
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
		}).catch(() => {});
	};

	const _MoreLoader = (): JSX.Element => {
		return (
			<>
				{pageInfo?.next === null ? (
					<ActivityIndicator size={"large"} color={theme.PRIMARY} />
				) : (
					<ErrorMessage message="No more Videos to load" withImage={false} />
				)}
			</>
		);
	};

	const MoreLoader = React.memo(_MoreLoader);

	const RenderItem = ({ item }: { item: Explore }): JSX.Element | null => {
		if (!item.hidden) {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			return <VideoCard key={`${item.id}-${item.createdAt}`} publication={item} id={item.id} />;
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
				<Skeleton number={10}>
					<VideoCardSkeleton />
				</Skeleton>
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
