import { FlashList } from "@shopify/flash-list";
import NotFound from "components/common/NotFound";
import Skeleton from "components/common/Skeleton";
import StyledText from "components/UI/StyledText";
import VideoCardSkeleton from "components/UI/VideoCardSkeleton";
import VideoCard from "components/VideoCard";
import { SOURCES } from "constants/index";
import {
	Post,
	PublicationMainFocus,
	PublicationsQueryRequest,
	PublicationTypes,
	useProfilePostsQuery,
} from "customTypes/generated";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useActivePublication, useAuthStore, useProfile, useThemeStore } from "store/Store";
import formatHandle from "utils/formatHandle";

const MoreVideos = () => {
	const { activePublication } = useActivePublication();
	const title =
		activePublication?.profile?.name || formatHandle(activePublication?.profile?.handle);
	return (
		<View style={styles.moreVideosHeader}>
			<StyledText
				title={`More Videos by ${title}`}
				style={{
					fontSize: 18,
					fontWeight: "700",
					color: "white",
					marginBottom: 8
				}}
				numberOfLines={1}
			/>
			<MoreVideosList />
		</View>
	);
};

const MoreVideosList = React.memo(() => {
	const { activePublication } = useActivePublication();
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();
	const { PRIMARY } = useThemeStore();
	const title =
		activePublication?.profile?.name || formatHandle(activePublication?.profile?.handle);

	const QueryRequest: PublicationsQueryRequest = {
		profileId: activePublication?.profile?.id,
		publicationTypes: [PublicationTypes.Post],
		metadata: {
			mainContentFocus: [PublicationMainFocus.Video],
		},
		sources: SOURCES,
		limit: 5,
	};

	const { data, loading, fetchMore } = useProfilePostsQuery({
		variables: {
			request: QueryRequest,
			reactionRequest: {
				profileId: currentProfile?.id,
			},
			channelId: currentProfile?.id,
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});

	const AllVideos = data?.publications?.items;

	const pageInfo = data?.publications?.pageInfo;

	const keyExtractor = (item: Post) => item.id;

	const _MoreLoader = () => {
		return (
			<>
				{pageInfo?.next ? (
					<View
						style={{
							height: 200,
							width: "100%",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<ActivityIndicator size={"large"} color={PRIMARY} />
					</View>
				) : (
					<></>
				)}
			</>
		);
	};

	const MoreLoader = React.memo(_MoreLoader);

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

	const renderItem = React.useCallback(({ item }: { item: Post }) => {
		if (item.id === activePublication?.id) return null;
		return (
			<VideoCard
				publication={item}
				id={item.id}
				style={{ marginHorizontal: 0, marginVertical: 4 }}
			/>
		);
	}, []);

	if (loading)
		return (
			<View style={{ backgroundColor: "black" }}>
				<Skeleton number={10}>
					<VideoCardSkeleton />
				</Skeleton>
			</View>
		);

	if (AllVideos?.length === 1)
	return (
			<NotFound message={`No additional videos from ${title.split(' ')[0]}`} height={220} width={220} />
	);

	return (
		<View style={{ flex: 1 }}>
			<FlashList
				data={AllVideos as Post[]}
				keyExtractor={keyExtractor}
				ListEmptyComponent={<NotFound message="Looks like no videos" />}
				removeClippedSubviews={true}
				estimatedItemSize={110}
				ListFooterComponent={<MoreLoader />}
				onEndReachedThreshold={0.7}
				onEndReached={onEndCallBack}
				showsVerticalScrollIndicator={false}
				renderItem={renderItem}
			/>
		</View>
	);
});

export default React.memo(MoreVideos);

const styles = StyleSheet.create({
	moreVideosHeader: {
		paddingHorizontal: 16,
		marginVertical: 8,
	},
});