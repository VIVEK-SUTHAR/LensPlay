import React, { useEffect, useState } from "react";
import Button from "../../UI/Button";
import { dark_primary, primary } from "../../../constants/Colors";
import formatInteraction from "../../../utils/formatInteraction";
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
  isalreadyDisLiked: string | null;
};

const DisLikeButton = ({ isalreadyDisLiked, id }: DisLikeButtonProps) => {
  const authStore = useAuthStore();
  const userStore = useProfile();
  const [isAlreadyDisliked, setIsAlreadyDisliked] = useState<boolean>(
    isalreadyDisLiked === "DOWNVOTE" ? true : false
  );
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const { isGuest } = useGuestStore();
  const toast = useToast();
  // const [clicked, setClicked] = useState<Boolean>(false);
  var clicked = false;
  const { PRIMARY } = useThemeStore();
  const likedPublication = useReactionStore();
  const thumbup = likedPublication.likedPublication;
  const thumbdown = likedPublication.dislikedPublication;

  const checkAlreadyDislike = () => {
    if (isAlreadyDisliked && !clicked) {
      likedPublication.addToDislikedPublications(id, thumbup);
    }
  };

  const checkFirstClick = () => {
    thumbdown.map((publication) => {
      if (publication.id === id) {
        clicked = true;
      }
    });
    thumbup.map((publication) => {
      if (publication.id === id) {
        clicked = true;
      }
    });
  };

  useEffect(() => {
    checkFirstClick();
  }, []);
  useEffect(() => {
    checkAlreadyDislike();
  }, []);

  useEffect(() => {
    thumbdown.map((publication) => {
      if (publication.id === id) {
        setIsDisliked(true);
        clicked = true;
      }
    });
    thumbup.map((publication) => {
      if (publication.id === id) {
        setIsDisliked(false);
        setIsAlreadyDisliked(false);
        clicked = true;
      }
    });
  }, [thumbup, thumbdown]);

  const onDislike = async () => {
    if (isGuest) {
      toast.show("Please Login", ToastType.ERROR, true);
      return;
    }
    if (!isDisliked && !isGuest) {
      addLike(
        authStore.accessToken,
        userStore.currentProfile?.id,
        id,
        "DOWNVOTE"
      ).then((res) => {
        if (res) {
          if (res.addReaction === null) {
            likedPublication.addToDislikedPublications(id, thumbup);
          }
        }
      });
      removeLike(authStore.accessToken, userStore.currentProfile?.id, id)
        .then((res) => {})
        .catch((error) => {
          if (error instanceof Error) {
            ToastAndroid.show("Can't react to post", ToastAndroid.SHORT);
          }
        });
    }
    setIsDisliked(true);
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
      borderColor={isDisliked || isAlreadyDisliked ? PRIMARY : "white"}
      icon={
        <Icon
          name="dislike"
          size={20}
          color={isDisliked || isAlreadyDisliked ? PRIMARY : "white"}
        />
      }
    />
  );
};

export default DisLikeButton;
