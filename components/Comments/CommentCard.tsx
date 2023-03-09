import { Image, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import getDifference from "../../utils/getDifference";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { CommentStats } from "../../types/Lens/Feed";
import {
  useAuthStore,
  useProfile,
  useReactionStore,
  useToast,
} from "../../store/Store";
import { addLike, freeMirror } from "../../api";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import extractURLs from "../../utils/extractURL";
import Button from "../UI/Button";
import { dark_primary, primary } from "../../constants/Colors";
import Avatar from "../UI/Avatar";
import CollectIcon from "../svg/CollectIcon";
import MirrorIcon from "../svg/MirrorIcon";
import Icon from "../Icon";
import { CollectButton } from "../VIdeo";
import { useGuestStore } from "../../store/GuestStore";
import { ToastType } from "../../types/Store";

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
  const { isGuest } = useGuestStore();
  const toast = useToast();

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
              if (isGuest) {
                toast.show("Please Login", ToastType.ERROR, true);
                return;
              }
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
              <Icon
                name="like"
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
            icon={<Icon name="collect" size={20} />}
            onPress={() => {
              if (isGuest) {
                toast.show("Please Login", ToastType.ERROR, true);
                return;
              }
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
            icon={<Icon name="mirror" size={20} />}
            borderColor="#232323"
            onPress={async () => {
              if (isGuest) {
                toast.show("Please Login", ToastType.ERROR, true);
                return;
              }
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
            icon={<Icon name="report" size={20} />}
            borderColor="#232323"
            onPress={() => {
              navigation.navigate("ReportPublication", {
                publicationId: id,
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(CommentCard);
