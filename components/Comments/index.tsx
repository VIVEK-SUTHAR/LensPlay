import { FlashList } from "@shopify/flash-list";
import CommentCard from "components/Comments/CommentCard";
import Skeleton from "components/common/Skeleton";
import CommentSkeleton from "components/UI/CommentSkeleton";
import Heading from "components/UI/Heading";
import { SOURCES } from "constants/index";
import {
	CommentRankingFilterType,
	HandleInfo,
	Comment as IComment,
	PublicationsRequest,
	usePublicationsQuery,
} from "customTypes/generated";
import React from "react";
import { ActivityIndicator, Dimensions, LayoutAnimation, SafeAreaView, View } from "react-native";
import { useAuthStore, useProfile, useThemeStore } from "store/Store";
import formatHandle from "utils/formatHandle";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";
// import CommentInput from "./CommentInput";

interface CommentProps {
	publicationId: string;
	shots: boolean;
}

const keyExtractor = (item: IComment) => item?.id.toString();

const Comment: React.FC<CommentProps> = ({ publicationId, shots = false }) => {
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();
	const theme = useThemeStore();

	const QueryRequest: PublicationsRequest = {
		where: {
			commentOn: {
				id: publicationId,
				ranking: {
					filter: CommentRankingFilterType.All,
				},
			},
		},
	};

	const {
		data: commentData,
		error,
		loading,
		fetchMore,
	} = usePublicationsQuery({
		variables: {
			request: QueryRequest,
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
				username={item?.by?.handle?.fullHandle}
				avatar={getRawurl(item?.by?.metadata?.picture)}
				commentText={item?.metadata?.content ?? ""}
				commentTime={item?.createdAt}
				id={item?.by?.id}
				isFollowdByMe={item?.by?.operations?.isFollowedByMe?.value}
				name={item?.by?.metadata?.displayName || formatHandle(item?.by?.handle as HandleInfo)}
				stats={item?.stats}
				commentId={item?.id}
				isAlreadyLiked={item?.operations?.hasReacted}
				isMirrored={item?.operations?.hasMirrored}
				isDA={item?.momoka?.proof ? true : false}
				address={item?.by?.ownedBy?.address}
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

	if (loading) return <Loading />;

	if (!commentData?.publications?.items.length) {
		return <NotFound />;
	}

	if (commentData) {
		const allComments = commentData?.publications?.items as IComment[];
		return (
			<View style={{ flex: 1, minHeight: 4 }}>
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
					contentContainerStyle={{
						paddingHorizontal: 16,
						paddingBottom: 148,
					}}
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
