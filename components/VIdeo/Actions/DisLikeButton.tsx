import React from "react";
import Button from "../../UI/Button";
import { dark_primary } from "../../../constants/Colors";
import {
  useAuthStore,
  useProfile,
  useReactionStore,
  useThemeStore,
  useToast,
} from "../../../store/Store";
import { removeLike, addLike } from "../../../api";
import { ToastAndroid } from "react-native";
import Icon from "../../Icon";
import { useGuestStore } from "../../../store/GuestStore";
import { ToastType } from "../../../types/Store";

type DisLikeButtonProps = {
  id: string;
  isalreadyDisLiked: boolean;
};

const DisLikeButton = ({ isalreadyDisLiked, id }: DisLikeButtonProps) => {
  const authStore = useAuthStore();
  const userStore = useProfile();
  const { isGuest } = useGuestStore();
  const toast = useToast();
  const { PRIMARY } = useThemeStore();
  const { videopageStats, setVideoPageStats } = useReactionStore();

  const onDislike = async () => {
    if (isGuest) {
      toast.show("Please Login", ToastType.ERROR, true);
      return;
    }
    if (!isalreadyDisLiked && !isGuest) {
      const data = await addLike(
        authStore.accessToken,
        userStore.currentProfile?.id,
        id,
        "DOWNVOTE"
      );
      const res = await removeLike(
        authStore.accessToken,
        userStore.currentProfile?.id,
        id
      );
      if (res?.removeReaction === null) {
        setVideoPageStats(false, true, videopageStats.likeCount - 1);
      }
    }
  };

  return (
    <Button
      title=""
      onPress={onDislike}
      mx={4}
      px={16}
      width={"auto"}
      bg={dark_primary}
      type={"filled"}
      borderRadius={8}
      textStyle={{
        fontSize: 14,
        fontWeight: "500",
        color: "white",
      }}
      borderColor={isalreadyDisLiked ? PRIMARY : "white"}
      icon={
        <Icon
          name="dislike"
          size={20}
          color={isalreadyDisLiked ? PRIMARY : "white"}
        />
      }
    />
  );
};

export default DisLikeButton;
