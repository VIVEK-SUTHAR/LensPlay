import React, { useState } from "react";
import Button from "../../UI/Button";
import { dark_primary } from "../../../constants/Colors";
import formatInteraction from "../../../utils/formatInteraction";
import {
  useAuthStore,
  useProfile,
  useReactionStore,
  useThemeStore,
} from "../../../store/Store";
import DisLikeIcon from "../../svg/DisLikeIcon";
import { removeLike, addLike } from "../../../api";
import { ToastAndroid } from "react-native";

type DisLikeButtonProps = {
  id: string;
  isalreadyLiked: boolean;
  isalreadyDisLiked: boolean;
  setisalreadyLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setisalreadyDisLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setLikes: React.Dispatch<React.SetStateAction<number>>;
};

const DisLikeButton = ({
  setLikes,
  isalreadyLiked,
  setisalreadyLiked,
  setisalreadyDisLiked,
  isalreadyDisLiked,
  id,
}: DisLikeButtonProps) => {
  const authStore = useAuthStore();
  const userStore = useProfile();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { PRIMARY } = useThemeStore();
  const likedPublication = useReactionStore();
  const thumbup = likedPublication.likedPublication;

  const onDislike = async () => {
    if (!isalreadyDisLiked) {
      if (isalreadyLiked || isLiked) {
        setLikes((prev) => prev - 1);
        setisalreadyLiked(false);
      }
      setisalreadyDisLiked(true);
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
        <DisLikeIcon
          height={20}
          width={20}
          filled={isalreadyDisLiked ? true : false}
        />
      }
    />
  );
};

export default DisLikeButton;
