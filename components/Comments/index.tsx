import { SafeAreaView, ScrollView, View } from "react-native";
import React from "react";
import { useComments } from "../../hooks/useFeed";
import Heading from "../UI/Heading";
import CommentSkeleton from "../UI/CommentSkeleton";
import CommentCard from "./CommentCard";
import { useReactionStore } from "../../store/Store";
import { Comment as IComment } from "../../types/generated";
import getRawurl from "../../utils/getRawUrl";
import formatHandle from "../../utils/formatHandle";

const Comment = ({
  publicationId,
  shots = false,
}: {
  publicationId: string;
  shots?: boolean;
}) => {
  const { reaction, comment, setComments } = useReactionStore();
  const { data: commentData, error, loading } = useComments(publicationId);

  if (error) return <NotFound />;

  if (shots) {
    if (loading) return <Loading />;
  } else {
    if (loading || !reaction) return <Loading />;
  }

  if (!commentData?.publications?.items.length) {
    if (!comment) {
      setComments(true);
    }
    return <NotFound />;
  }

  if (commentData) {
    if (!comment) {
      setComments(true);
    }
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            {commentData?.publications?.items.map((item: IComment) => {
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
      <ScrollView>
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
      </ScrollView>
    </SafeAreaView>
  );
};
