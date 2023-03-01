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
import LikeIcon from "../../svg/LikeIcon";
import { addLike } from "../../../api";
import Icon from "../../Icon";

type LikeButtonProps = {
  id: string;
  likes: number;
  isalreadyLiked: boolean;
  setisalreadyDisLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setLikes: React.Dispatch<React.SetStateAction<number>>;
  bytes?: boolean;
};

const LikeButton = ({
  likes,
  setLikes,
  isalreadyLiked,
  setisalreadyDisLiked,
  id,
  bytes = false,
}: LikeButtonProps) => {
  const authStore = useAuthStore();
  const userStore = useProfile();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { PRIMARY } = useThemeStore();
  const likedPublication = useReactionStore();
  const thumbdown = likedPublication.dislikedPublication;

  const onLike = async () => {
    if (!isalreadyLiked && !isLiked) {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
      setisalreadyDisLiked(false);
      addLike(
        authStore.accessToken,
        userStore.currentProfile?.id,
        id,
        "UPVOTE"
      ).then((res) => {
        if (res.addReaction === null) {
          console.log("liked successfully");
          likedPublication.addToReactedPublications(id, likes, thumbdown);
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
        color: isalreadyLiked ? PRIMARY : isLiked ? PRIMARY : "white",
        marginLeft: 4,
      }}
      borderColor={isalreadyLiked ? PRIMARY : isLiked ? PRIMARY : "white"}
      onPress={onLike}
      bytes={bytes}
      icon={
        <Icon
          name="like"
          size={bytes?28:20}
          color={isalreadyLiked || isLiked ? PRIMARY : "white"}
        />
      }
    />
  );
};

export default LikeButton;
