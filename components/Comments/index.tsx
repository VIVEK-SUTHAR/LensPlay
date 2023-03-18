import { SafeAreaView, ScrollView, View } from "react-native";
import React from "react";
import { useComments } from "../../hooks/useFeed";
import Heading from "../UI/Heading";
import AnimatedLottieView from "lottie-react-native";
import CommentSkeleton from "../UI/CommentSkeleton";
import CommentCard from "./CommentCard";
import { useReactionStore } from "../../store/Store";
import { Comment as IComment} from "../../types/generated";


const Comment = ({ publicationId }: { publicationId: string }) => {
  const {reaction, comment, collect, setComments} = useReactionStore();
  const { data: commentData, error, loading } = useComments(publicationId);
  
  

  if (error) return <NotFound />;

  if (loading && !reaction && !comment && !collect) return <Loading />;

  if (!commentData?.publications?.items.length) return <NotFound />;

  if (commentData) {
    if(!comment){      
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
                  avatar={item?.profile?.picture?.original?.url}
                  commentText={
                    item?.metadata?.content || item?.metadata?.description
                  }
                  commentTime={item?.createdAt}
                  id={item?.profile?.id}
                  isFollowdByMe={item?.profile?.isFollowedByMe}
                  name={item?.profile?.name}
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
  return <View></View>;
};

export default Comment;

const NotFound = () => {
  return (
    <SafeAreaView>
      <View style={{ maxHeight: 200 }}>
        <AnimatedLottieView
          autoPlay
          style={{
            height: "90%",
            alignSelf: "center",
            width: "100%",
          }}
          source={require("../../assets/nocomments.json")}
        />
        <Heading
          title="There are no comments yet"
          style={{
            color: "white",
            fontSize: 20,
            textAlign: "center",
            fontWeight: "600",
          }}
        ></Heading>
      </View>
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
