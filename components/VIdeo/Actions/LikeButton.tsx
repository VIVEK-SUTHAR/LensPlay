import React, { useEffect, useState } from "react";
import Button from "../../UI/Button";
import { dark_primary } from "../../../constants/Colors";
import formatInteraction from "../../../utils/formatInteraction";
import {
  useAuthStore,
  useProfile,
  useReactionStore,
  useThemeStore,
  useToast,
} from "../../../store/Store";
import { addLike } from "../../../api";
import Icon from "../../Icon";
import { useGuestStore } from "../../../store/GuestStore";
import { ToastType } from "../../../types/Store";

type LikeButtonProps = {
  id: string;
  like: number;
  isalreadyLiked: boolean;
  bytes?: boolean;
};

const LikeButton = ({
  like,
  isalreadyLiked,
  id,
  bytes = false,
}: LikeButtonProps) => {
  const authStore = useAuthStore();
  const userStore = useProfile();
  const {PRIMARY} = useThemeStore();
  const { isGuest } = useGuestStore();
  const {setVideoPageStats} = useReactionStore();
  const toast = useToast();


  const onLike = async () => {
    if (isGuest) {
      toast.show("Please Login", ToastType.ERROR, true);
    }
    if (!isalreadyLiked && !isGuest) {
      const res = await addLike(
        authStore.accessToken,
        userStore.currentProfile?.id,
        id,
        "UPVOTE"
      );
      if (res?.addReaction === null) {
        setVideoPageStats(true, false, like+1);
      }
    }
  };
  return (
    <Button
      title={formatInteraction(like) || "0"}
      mx={4}
      px={16}
      width={"auto"}
      bg={bytes ? "transparent" : dark_primary}
      type={"filled"}
      borderRadius={8}
      textStyle={{
        fontSize: 14,
        fontWeight: "500",
        color: isalreadyLiked ? PRIMARY : "white",
        marginLeft: 4,
      }}
      borderColor={isalreadyLiked ? PRIMARY : "white"}
      onPress={onLike}
      bytes={bytes}
      icon={
        <Icon
          name="like"
          size={bytes ? 28 : 20}
          color={isalreadyLiked  ? PRIMARY : "white"}
        />
      }
    />
  );
};

export default LikeButton;
