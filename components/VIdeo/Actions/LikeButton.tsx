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
  isalreadyLiked: string | null;
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
  const { isGuest } = useGuestStore();
  const toast = useToast();

  //variable to keep track of whether the publication is already liked or not
  const [isAlreadyLiked, setisAlreadyLiked] = useState<boolean>(
    isalreadyLiked === "UPVOTE" ? true : false
  );
  //variable to track whether the video is opened before or not
  let clicked = false;
  //variable to check locally whether the video is liked or not
  const [isLiked, setIsLiked] = useState<boolean>(false);
  //variable that keeps track of number of likes
  const [likes, setLikes] = useState<number>(like);
  const { PRIMARY } = useThemeStore();
  const likedPublication = useReactionStore();
  const thumbdown = likedPublication.dislikedPublication;
  const thumbup = likedPublication.likedPublication;

  //function to add the publication in thumbup array if it has been already liked
  const checkAlreadyLike = () => {
    if (isAlreadyLiked && !clicked) {
      likedPublication.addToReactedPublications(id, likes, thumbdown);
    }
  };

  //function to check if the publication is clicked before or not
  const checkClicked = () => {
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
    checkClicked();
  }, []);

  //this useEffect checks for any change in liked and disliked array and based on that changes the variables like, isLiked, isAlreadyLiked.
  useEffect(() => {
    thumbup.map((publication) => {
      //check first if the video is already liked and if it is then update the local variable liked
      if (isAlreadyLiked) {
        if (publication.id === id) {
          setIsLiked(true);
        }
      }
      //else if the video is not liked yet but exist in the like array then add the like count and set the local variable to true
      else if (!isLiked) {
        if (publication.id === id) {
          setLikes((prev) => prev + 1);
          setIsLiked(true);
        }
      }
    });
    thumbdown.map((publication) => {
      //if there is publication in dislike array and if the isLiked is true than set isLiked, isAlreadyLiked to true and decrement the likes variable.
      if (isLiked) {
        if (publication.id === id) {
          setIsLiked(false);
          setisAlreadyLiked(false);
          setLikes((prev) => prev - 1);
        }
      } else if (!isLiked && clicked && likes != 0) {
        if (publication.id === id) {
          setIsLiked(false);
          setisAlreadyLiked(false);
          setLikes((prev) => prev - 1);
        }
      }
      //else if the publication is in the disliked array then false all the variables
      else {
        if (publication.id === id) {
          setIsLiked(false);
          setisAlreadyLiked(false);
        }
      }
    });
  }, [thumbdown, thumbup]);

  useEffect(() => {
    checkAlreadyLike();
  }, []);

  const onLike = async () => {
    if (isGuest) {
      toast.show("Please Login", ToastType.ERROR, true);
    }
    if (!isAlreadyLiked && !isLiked && !isGuest) {
      addLike(
        authStore.accessToken,
        userStore.currentProfile?.id,
        id,
        "UPVOTE"
      ).then((res) => {
        if (res.addReaction === null) {
          if (!isLiked) {
            likedPublication.addToReactedPublications(id, likes, thumbdown);
          }
        }
      });
    }
  };

  return (
    <Button
      title={formatInteraction(likes) || "0"}
      mx={4}
      px={16}
      width={"auto"}
      bg={bytes ? "transparent" : dark_primary}
      type={"filled"}
      borderRadius={8}
      textStyle={{
        fontSize: 14,
        fontWeight: "500",
        color: isLiked ? PRIMARY : "white",
        marginLeft: 4,
      }}
      borderColor={isLiked || isalreadyLiked ? PRIMARY : "white"}
      onPress={onLike}
      bytes={bytes}
      icon={
        <Icon
          name="like"
          size={bytes ? 28 : 20}
          color={isLiked || isAlreadyLiked ? PRIMARY : "white"}
        />
      }
    />
  );
};

export default LikeButton;
