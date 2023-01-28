import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { primary } from "../constants/Colors";
import getDifference from "../utils/getDifference";
import Heading from "./UI/Heading";
import SubHeading from "./UI/SubHeading";
import extractURLs from "../utils/extractURL";
import { useNavigation } from "@react-navigation/native";
import Button from "./UI/Button";
import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import addLike from "../api/addReaction";
import { useAuthStore, useProfile } from "../store/Store";
import freeMirror from "../api/freeMirror";

type CommentCardProps = {
  avatar: string;
  username: string;
  commentText: string;
  commentTime: string;
  id: string;
  isFollowdByMe: boolean;
  name: string;
  stats: {};
  commentId: string;
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
}: CommentCardProps) => {
  const authStore = useAuthStore();
  const [isalreadyDisLiked, setisalreadyDisLiked] = useState(false);
  const navigation = useNavigation();
  const userStore = useProfile();

  const setLike = async () => {
    addLike(
      authStore.accessToken,
      userStore.currentProfile?.id,
      commentId,
      "UPVOTE"
    ).then((res) => {
      if (res.addReaction === null) {
        console.log("liked");
      }
    });
  };

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
            <SubHeading
              title={getDifference(commentTime)}
              style={{ fontSize: 10, color: "gray" }}
            />
          </View>
        </View>

        {/* <Hyperlink linkDefault={true} linkStyle={ { color: '#2980b9' } }> */}
        <Text
          style={{
            fontSize: 14,
            color: "white",
            fontWeight: "600",
            marginTop: 4,
          }}
        >
          {extractURLs(commentText)}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
            justifyContent: "space-around",
          }}
        >
          <Button
            title={stats?.totalUpvotes}
            onPress={() => {
              setisalreadyDisLiked((prev) => !prev);
              setLike();
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
                const data = await freeMirror(
                  authStore.accessToken,
                  userStore.currentProfile?.id,
                  commentId
                );
                console.log(data);
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
