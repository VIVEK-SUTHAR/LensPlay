import React from "react";
import { dark_primary } from "../../../constants/Colors";
import { PUBLICATION } from "../../../constants/tracking";
import { useGuestStore } from "../../../store/GuestStore";
import {
  useAuthStore,
  useProfile,
  useReactionStore,
  useThemeStore,
  useToast,
} from "../../../store/Store";
import { ToastType } from "../../../types/Store";
import {
  ReactionTypes,
  useAddReactionMutation,
  useRemoveReactionMutation,
} from "../../../types/generated";
import TrackAction from "../../../utils/Track";
import Icon from "../../Icon";
import Button from "../../UI/Button";

type DisLikeButtonProps = {
  id: string;
  isalreadyDisLiked: boolean;
};

const DisLikeButton = ({ isalreadyDisLiked, id }: DisLikeButtonProps) => {
  const authStore = useAuthStore();
  const userStore = useProfile();
  const { isGuest } = useGuestStore();
  const { PRIMARY } = useThemeStore();
  const { videopageStats, setVideoPageStats } = useReactionStore();
  const { accessToken } = useAuthStore();
  const toast = useToast();

  const [addReaction] = useAddReactionMutation({
    onError: (error) => {
      toast.show("Something went wrong!", ToastType.ERROR, true);
    },
    onCompleted: (data) => {
      setVideoPageStats(
        false,
        true,
        videopageStats.isLiked
          ? videopageStats.likeCount - 1
          : videopageStats.likeCount
      );
    },
  });

  const [removeReaction] = useRemoveReactionMutation({
    onError: (error) => {
      toast.show("Something went wrong!", ToastType.ERROR, true);
    },
    onCompleted: (data) => {
      setVideoPageStats(false, false, videopageStats.likeCount);
    },
  });

  const onDislike = async () => {
    if (isGuest) {
      toast.show("Please Login", ToastType.ERROR, true);
      return;
    }
    if (!isalreadyDisLiked) {
      addReaction({
        variables: {
          request: {
            profileId: userStore.currentProfile?.id,
            reaction: ReactionTypes.Downvote,
            publicationId: id,
          },
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${accessToken}`,
          },
        },
      });
      TrackAction(PUBLICATION.DISLIKE);
    } else {
      removeReaction({
        variables: {
          request: {
            profileId: userStore.currentProfile?.id,
            reaction: ReactionTypes.Downvote,
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
