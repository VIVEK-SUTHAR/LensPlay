import React, { useState } from "react";
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
import Icon from "../../Icon";
import { useGuestStore } from "../../../store/GuestStore";
import { ToastType } from "../../../types/Store";
import TrackAction from "../../../utils/Track";
import { PUBLICATION, SHOT } from "../../../constants/tracking";
import {
  ReactionTypes,
  useAddReactionMutation,
  useRemoveReactionMutation,
} from "../../../types/generated";

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
  const userStore = useProfile();
  const { PRIMARY } = useThemeStore();
  const { isGuest } = useGuestStore();
  const { setVideoPageStats } = useReactionStore();
  const toast = useToast();
  const [isLiked, setIsLiked] = useState(isalreadyLiked);
  const [likeCount, setLikeCount] = useState(like);
  const { accessToken } = useAuthStore();

  const [addReaction] = useAddReactionMutation({
    onCompleted: () => {
      if (bytes) {
        setLikeCount(likeCount + 1);
        setIsLiked(true);
      } else {
        setVideoPageStats(true, false, like + 1);
      }
    },
    onError: (e) => {
      toast.show("Something went wrong while liking!", ToastType.ERROR, true);
      console.log(e);
    },
  });

  const [removeReaction] = useRemoveReactionMutation({
    onError: (e) => {
      toast.show(
        "Something went wrong while disliking!",
        ToastType.ERROR,
        true
      );
    },
    onCompleted: () => {
      if (bytes) {
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      } else {
        setVideoPageStats(false, false, like - 1);
      }
    },
  });

  const onLike = async () => {
    if (isGuest) {
      toast.show("Please Login", ToastType.ERROR, true);
      return;
    }
    if (!isalreadyLiked) {
      addReaction({
        variables: {
          request: {
            profileId: userStore.currentProfile?.id,
            reaction: ReactionTypes.Upvote,
            publicationId: id,
          },
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${accessToken}`,
          },
        },
      });
      TrackAction(bytes ? SHOT.SHOTS_LIKE : PUBLICATION.LIKE);
    } else {
      removeReaction({
        variables: {
          request: {
            profileId: userStore.currentProfile?.id,
            reaction: ReactionTypes.Upvote,
            publicationId: id,
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

  return (
    <Button
      title={formatInteraction(!bytes ? like : likeCount) || "0"}
      mx={4}
      px={16}
      width={"auto"}
      bg={bytes ? "transparent" : dark_primary}
      type={"filled"}
      borderRadius={8}
      textStyle={{
        fontSize: 14,
        fontWeight: "500",
        color: (bytes ? isLiked : isalreadyLiked) ? PRIMARY : "white",
        marginLeft: 4,
      }}
      borderColor={(bytes ? isLiked : isalreadyLiked) ? PRIMARY : "white"}
      onPress={onLike}
      bytes={bytes}
      icon={
        <Icon
          name="like"
          size={bytes ? 28 : 20}
          color={(bytes ? isLiked : isalreadyLiked) ? PRIMARY : "white"}
        />
      }
    />
  );
};

export default LikeButton;
