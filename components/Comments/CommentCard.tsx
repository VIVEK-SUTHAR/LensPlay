import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { dark_primary, primary } from "../../constants/Colors";
import { useGuestStore } from "../../store/GuestStore";
import { useAuthStore, useProfile, useToast } from "../../store/Store";
import {
  PublicationStats,
  ReactionTypes,
  useAddReactionMutation,
  useRemoveReactionMutation,
} from "../../types/generated";
import { ToastType } from "../../types/Store";
import extractURLs from "../../utils/extractURL";
import getDifference from "../../utils/getDifference";
import Icon from "../Icon";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";

type CommentCardProps = {
  avatar: string;
  username: string;
  commentText: string;
  commentTime: string;
  id: string;
  isFollowdByMe: boolean | undefined;
  name: string | undefined;
  stats: PublicationStats;
  commentId: string;
  isIndexing?: boolean;
  isAlreadyLiked: boolean;
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
  isAlreadyLiked,
}: CommentCardProps) => {
  const { accessToken } = useAuthStore();
  const [Liked, setLiked] = useState<boolean>(isAlreadyLiked);
  const [likes, setLikes] = useState<number>(stats?.totalUpvotes);
  const navigation = useNavigation();
  const userStore = useProfile();

  const { isGuest } = useGuestStore();
  const toast = useToast();

  console.log(isAlreadyLiked);

  const [addReaction] = useAddReactionMutation({
    onError: () => {
      toast.show("Something went wrong!", ToastType.ERROR, true);
    },
    onCompleted: () => {
      setLiked(true);
      setLikes((prev) => prev + 1);
    },
  });

  const [removeReaction] = useRemoveReactionMutation({
    onError: () => {
      toast.show("Something went wrong!", ToastType.ERROR, true);
    },
    onCompleted: () => {
      setLiked(false);
      setLikes((prev) => prev - 1);
    },
  });

  const setLike = async () => {
    if (isIndexing) return;
    if (!Liked) {
      addReaction({
        variables: {
          request: {
            profileId: userStore.currentProfile?.id,
            reaction: ReactionTypes.Upvote,
            publicationId: commentId,
          },
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${accessToken}`,
          },
        },
      });
    } else {
      removeReaction({
        variables: {
          request: {
            profileId: userStore.currentProfile?.id,
            reaction: ReactionTypes.Upvote,
            publicationId: commentId,
          },
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${accessToken}`,
          },
        },
      });
    }
  };

  const collectRef = useRef<BottomSheetMethods>(null);
  const mirrorRef = useRef<BottomSheetMethods>(null);

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
              setLiked((prev) => !prev);
            }}
            width={"auto"}
            bg="transparent"
            type={"filled"}
            textStyle={{
              color: Liked ? primary : "white",
              fontSize: 14,
              fontWeight: "500",
              marginLeft: 4,
              paddingEnd: 16,
            }}
            icon={
              <Icon name="like" size={16} color={Liked ? primary : "white"} />
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
              collectRef?.current?.snapToIndex(0);
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
              mirrorRef?.current?.snapToIndex(0);
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
