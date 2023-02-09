import { Image, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import getDifference from "../../utils/getDifference";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { CommentStats } from "../../types/Lens/Feed";
import { useAuthStore, useProfile, useReactionStore } from "../../store/Store";
import { addLike, freeMirror } from "../../api";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import extractURLs from "../../utils/extractURL";
import Button from "../UI/Button";
import { dark_primary, primary } from "../../constants/Colors";
import Avatar from "../UI/Avatar";

type CommentCardProps = {
  avatar: string;
  username: string;
  commentText: string;
  commentTime: string;
  id: string;
  isFollowdByMe: boolean | undefined;
  name: string | undefined;
  stats: CommentStats;
  commentId: string;
  isIndexing?: boolean;
};

const CommentCard = ({
  avatar,
  username,
  commentText,
  commentTime,
  id,
  isFollowdByMe,
  name,
  stats,
  commentId,
  isIndexing,
}: CommentCardProps) => {
  const authStore = useAuthStore();
  const reactions = useReactionStore();
  const [isalreadyDisLiked, setisalreadyDisLiked] = useState<Boolean>(false);
  const [likes, setLikes] = useState<string>(stats?.totalUpvotes);
  const navigation = useNavigation();
  const userStore = useProfile();
  const likedComments = reactions.likedComments;

  console.log(id, name);

  const setLike = async () => {
    if (isIndexing) return;
    if (!isalreadyDisLiked) {
      addLike(
        authStore.accessToken,
        userStore.currentProfile?.id,
        commentId,
        "UPVOTE"
      ).then((res) => {
        if (res.addReaction === null) {
          setLikes((prev) => prev + 1);
          reactions.addToLikedComments(commentId);
        }
      });
    }
  };

  useEffect(() => {
    likedComments.map((id) => {
      if (id.id === commentId) {
        setisalreadyDisLiked(true);
      }
    });
  }, [addLike]);

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "black",
        borderColor: dark_primary,
        borderBottomWidth: 1,
        paddingVertical: 8,
        marginVertical: 4,
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate("Channel", {
            profileId: id,
            isFollowdByMe: isFollowdByMe,
          });
        }}
        style={{
          marginRight: 8,
        }}
      >
        <Avatar src={avatar} height={40} width={40} />
      </Pressable>
      <View style={{ flex: 1 }}>
        <View>
          <Heading
            title={name || id}
            style={{ fontSize: 14, color: "white", fontWeight: "500" }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Heading
              title={`@${username}`}
              style={{ fontSize: 12, color: "gray", marginTop: 2 }}
            />
            <StyledText
              title={isIndexing ? "Indexing" : getDifference(commentTime)}
              style={{ fontSize: 10, color: "gray" }}
            />
          </View>
        </View>
        <StyledText
          style={{
            fontSize: 14,
            color: "white",
            fontWeight: "600",
            marginTop: 4,
          }}
          title={extractURLs(commentText)}
        ></StyledText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
            justifyContent: "space-between",
          }}
        >
          <Button
            title={likes}
            onPress={() => {
              setLike();
              setisalreadyDisLiked(true);
            }}
            width={"auto"}
            bg="transparent"
            type={"filled"}
            textStyle={{
              color: "white",
              fontSize: 14,
              fontWeight: "500",
              marginLeft: 4,
              paddingEnd: 16,
            }}
            icon={
              <AntDesign
                name={isalreadyDisLiked ? "like1" : "like2"}
                size={16}
                color={isalreadyDisLiked ? primary : "white"}
              />
            }
          />

          <Button
            title={stats?.totalAmountOfCollects}
            py={4}
            width={"auto"}
            type={"filled"}
            px={16}
            bg="transparent"
            textStyle={{
              color: "white",
              fontSize: 14,
              fontWeight: "500",
              marginLeft: 4,
            }}
            icon={<Entypo name="folder-video" size={16} color={"white"} />}
            onPress={() => {
              // setIsmodalopen(true);
            }}
          />
          <Button
            title={stats?.totalAmountOfMirrors}
            py={4}
            width={"auto"}
            type={"filled"}
            px={16}
            bg="transparent"
            textStyle={{
              color: "white",
              fontSize: 14,
              fontWeight: "500",
              marginLeft: 4,
            }}
            icon={<AntDesign name="retweet" size={16} color="white" />}
            borderColor="#232323"
            onPress={async () => {
              try {
                if (isIndexing) return;
                await freeMirror(
                  authStore.accessToken,
                  userStore.currentProfile?.id,
                  commentId
                );
              } catch (error) {
                console.log(error);
              }
            }}
          />
          <Button
            title={""}
            py={4}
            width={"auto"}
            type={"filled"}
            px={16}
            bg="transparent"
            textStyle={{
              color: "white",
              fontSize: 14,
              fontWeight: "500",
              marginLeft: 4,
            }}
            icon={<MaterialIcons name="report" size={16} color="white" />}
            borderColor="#232323"
            onPress={() => {
              // setIsmodalopen(true);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CommentCard;
