import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useAuthStore, useProfile, useReactionStore } from "../../store/Store";
import {
  Comment as IComment,
  PublicationMainFocus,
  PublicationsQueryRequest,
  useCommentsQuery,
} from "../../types/generated";
import formatHandle from "../../utils/formatHandle";
import getRawurl from "../../utils/getRawUrl";
import Skeleton from "../common/Skeleton";
import CommentSkeleton from "../UI/CommentSkeleton";
import Heading from "../UI/Heading";
import CommentCard from "./CommentCard";

const Comment = ({
  publicationId,
  shots = false,
}: {
  publicationId: string;
  shots?: boolean;
}) => {
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();
  const { reaction, comment, setComments } = useReactionStore();

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
    limit: 50,
  };

  const { data: commentData, error, loading, refetch } = useCommentsQuery({
    variables: {
      request: QueryRequest,
      reactionRequest: {
        profileId: currentProfile?.id,
      },
    },
    initialFetchPolicy: "network-only",
    refetchWritePolicy: "merge",
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });

  if (error) return <NotFound />;

  if (shots) {
    if (loading) return <Loading />;
  } else {
    if (loading || !reaction) return <Loading />;
  }

  if (!commentData?.publications?.items?.length) {
    if (!comment) {
      setComments(true);
    }
    return <NotFound />;
  }

  if (commentData) {
    if (!comment) {
      setComments(true);
    }
    const allComments = commentData?.publications?.items as IComment[];
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            {allComments?.map((item: IComment) => {
              console.log(item.reaction);

              return (
                <CommentCard
                  key={item?.id}
                  username={item?.profile?.handle}
                  avatar={getRawurl(item?.profile?.picture)}
                  commentText={
                    item?.metadata?.content || item?.metadata?.description
                  }
                  commentTime={item?.createdAt}
                  id={item?.profile?.id}
                  isFollowdByMe={item?.profile?.isFollowedByMe}
                  name={
                    item?.profile?.name || formatHandle(item?.profile?.handle)
                  }
                  stats={item?.stats}
                  commentId={item?.id}
                  isAlreadyLiked={item?.reaction === "UPVOTE"}
                />
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return <></>;
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
      ></Heading>
    </SafeAreaView>
  );
};

const Loading = () => {
  return (
    <SafeAreaView>
      <Skeleton children={<CommentSkeleton />} number={10} />
    </SafeAreaView>
  );
};
