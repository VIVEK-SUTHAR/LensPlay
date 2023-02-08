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
import { primary } from "../../constants/Colors";

type CommentCardProps = {
  avatar: string | undefined;
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
      key={commentId}
      style={{
        flexDirection: "row",
        backgroundColor: "black",
        borderColor: "#232323",
        borderWidth: 1,
        padding: 8,
        marginVertical: 4,
        borderRadius: 8,
      }}
    >
      <View style={{ height: 40, width: 40, marginRight: 8 }}>
        <Pressable
          onPress={() => {
            navigation.navigate("Channel", {
              profileId: id,
              isFollowdByMe: isFollowdByMe,
            });
          }}
        >
          <Image
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 50,
              resizeMode: "contain",
            }}
            source={{
              uri: `https://ipfs.io/ipfs/${avatar?.split("//")[1]}`,
            }}
          />
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <View>
          <Heading
            title={name}
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
              title={isIndexing ? "Indexing..." : getDifference(commentTime)}
              style={{ fontSize: 10, color: "gray" }}
            />
          </View>
        </View>

        {/* <Hyperlink linkDefault={true} linkStyle={ { color: '#2980b9' } }> */}
        <StyledText
          style={{
            fontSize: 14,
            color: "white",
            fontWeight: "600",
            marginTop: 4,
          }}
         title={extractURLs(commentText)}
        >
        </StyledText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
            justifyContent: "space-around",
          }}
        >
          <Button
            title={likes}
            onPress={() => {
              setLike();
              setisalreadyDisLiked(true);
            }}
            px={12}
            py={4}
            width={"auto"}
            type={"outline"}
            textStyle={{
              fontSize: 14,
              marginHorizontal: 2,
              fontWeight: "500",
              color: "white",

              // marginLeft: 4,
            }}
            // borderColor={isalreadyDisLiked ? primary : "white"}
            borderColor="#232323"
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
            mx={8}
            px={12}
            py={4}
            width={"auto"}
            type={"outline"}
            icon={<Entypo name="folder-video" size={16} color={"white"} />}
            borderColor="#232323"
            onPress={() => {
              // setIsmodalopen(true);
            }}
            textStyle={{ color: "white", marginHorizontal: 2 }}
          />
          <Button
            title={stats?.totalAmountOfMirrors}
            // mx={4}
            px={12}
            py={4}
            width={"auto"}
            type={"outline"}
            icon={<AntDesign name="retweet" size={16} color="white" />}
            borderColor="#232323"
            onPress={async () => {
              try {
                if (isIndexing) return;

                const data = await freeMirror(
                  authStore.accessToken,
                  userStore.currentProfile?.id,
                  commentId
                );
              } catch (error) {
                console.log(error);
              }
            }}
            textStyle={{ color: "white", marginHorizontal: 2 }}
          />
          <Button
            title={""}
            // mx={4}
            px={12}
            py={4}
            width={"auto"}
            type={"outline"}
            icon={<MaterialIcons name="report" size={16} color="white" />}
            borderColor="#232323"
            onPress={() => {
              // setIsmodalopen(true);
            }}
            textStyle={{ color: "white" }}
          />
        </View>
      </View>
    </View>
  );
};

export default CommentCard;
