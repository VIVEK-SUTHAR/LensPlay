import { FlashList } from "@shopify/flash-list";
import CommentCard from "components/Comments/CommentCard";
import Skeleton from "components/common/Skeleton";
import CommentSkeleton from "components/UI/CommentSkeleton";
import Heading from "components/UI/Heading";
import { SOURCES } from "constants/index";
import {
	Comment as IComment,
	PublicationMainFocus,
	PublicationsQueryRequest,
	useCommentsQuery
} from "customTypes/generated";
import React from "react";
import { ActivityIndicator, Dimensions, SafeAreaView, View } from "react-native";
import { useAuthStore, useProfile, useThemeStore } from "store/Store";
import formatHandle from "utils/formatHandle";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";

interface CommentProps {
	publicationId: string;
	shots: boolean;
}

const keyExtractor = (item: IComment) => item?.id.toString();

const Comment: React.FC<CommentProps> = ({ publicationId, shots = false }) => {
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();
	const theme = useThemeStore();

	const QueryRequest: PublicationsQueryRequest = {
		commentsOf: publicationId,
		metadata: {
			mainContentFocus: [
				PublicationMainFocus.Video,
				PublicationMainFocus.Article,
				PublicationMainFocus.Embed,
				PublicationMainFocus.Link,
				PublicationMainFocus.TextOnly,
			],
		},
		limit: 5,
		sources: SOURCES,
	};

	const {
		data: commentData,
		error,
		loading,
		fetchMore,
	} = useCommentsQuery({
		variables: {
			request: QueryRequest,
			reactionRequest: {
				profileId: currentProfile?.id,
			},
		},
		initialFetchPolicy: "network-only",
		refetchWritePolicy: "merge",
		pollInterval: 100,
		context: {
			headers: {
				"x-access-token": `${!accessToken ? "" : `Bearer ${accessToken}`}`,
			},
		},
	});

	const pageInfo = commentData?.publications?.pageInfo;

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
				) : null}
			</>
		);
	};

	const MoreLoader = React.memo(_MoreLoader);

	const renderItem = ({ item }: { item: IComment }) => {
		return (
			<CommentCard
				key={item?.id}
				username={item?.profile?.handle}
				avatar={getRawurl(item?.profile?.picture)}
				commentText={item?.metadata?.content || item?.metadata?.description}
				commentTime={item?.createdAt}
				id={item?.profile?.id}
				isFollowdByMe={item?.profile?.isFollowedByMe}
				name={item?.profile?.name || formatHandle(item?.profile?.handle)}
				stats={item?.stats}
				commentId={item?.id}
				isAlreadyLiked={item?.reaction === "UPVOTE"}
				isMirrored={item?.mirrors?.length > 0}
				isDA = {item?.isDataAvailability}
			/>
		);
	};

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

	if (error) {
		return <NotFound />;
	}
	if (shots) {
		if (loading) return <Loading />;
	} else {
		if (loading) return <Loading />;
	}

	if (!commentData?.publications?.items.length) {
		return <NotFound />;
	}

	if (commentData) {
		const allComments = commentData?.publications?.items as IComment[];
		return (
			<View style={{flex:1 }}>
				<FlashList
					data={allComments as IComment[]}
					keyExtractor={keyExtractor}
					estimatedItemSize={115}
					removeClippedSubviews={true}
					onLoad={({ elapsedTimeInMs }) => {
						Logger.Warn(`Comment List List Loading time ${elapsedTimeInMs} ms`);
					}}
					ListFooterComponent={<MoreLoader />}
					onEndReachedThreshold={0.7}
					onEndReached={onEndCallBack}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		);
	}

	return null;
};

export default Comment;

const NotFound = () => {
	return (
		<SafeAreaView>
			<Heading
				title="Be the first one to comment"
				style={{
					color: "gray",
					fontSize: 16,
					textAlign: "center",
					fontWeight: "500",
					marginVertical: 16,
				}}
			/>
		</SafeAreaView>
	);
};

const Loading = () => {
	return (
		<SafeAreaView>
			<Skeleton number={10}>
				<CommentSkeleton />
			</Skeleton>
		</SafeAreaView>
	);
};
