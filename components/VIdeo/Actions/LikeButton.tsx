import Icon from "components/Icon";
import Button from "components/UI/Button";
import { dark_primary } from "constants/Colors";
import { PUBLICATION, SHOT } from "constants/tracking";
import {
  ReactionTypes,
  useAddReactionMutation,
  useRemoveReactionMutation
} from "customTypes/generated";
import { ToastType } from "customTypes/Store";
import React, { useState } from "react";
import { useGuestStore } from "store/GuestStore";
import { useAuthStore, useProfile, useReactionStore, useThemeStore, useToast } from "store/Store";
import formatInteraction from "utils/formatInteraction";
import Logger from "utils/logger";
import TrackAction from "utils/Track";

type LikeButtonProps = {
	id: string;
	like: number;
	isalreadyLiked: boolean;
	bytes?: boolean;
};

const LikeButton: React.FC<LikeButtonProps> = ({ like, isalreadyLiked, id, bytes = false }) => {

	const [isLiked, setIsLiked] = useState(isalreadyLiked);
  const [likeCount, setLikeCount] = useState(like);
  
	const userStore = useProfile();
  const toast = useToast();
  
	const { PRIMARY } = useThemeStore();
	const { isGuest } = useGuestStore();
	const { setVideoPageStats } = useReactionStore();
	const { accessToken } = useAuthStore();

	const [addReaction] = useAddReactionMutation({
		onCompleted: () => {},
		onError: (error) => {
			if (bytes) {
				setLikeCount(likeCount - 1);
				setIsLiked(false);
			} else {
				setVideoPageStats(false, false, like - 1);
			}
			Logger.Error("Failed to add Like In Like Button", error);
			toast.show("Something went wrong!", ToastType.ERROR, true);
		},
	});

	const [removeReaction] = useRemoveReactionMutation({
		onCompleted: () => {},
		onError: (error) => {
			if (bytes) {
				setLikeCount(likeCount + 1);
				setIsLiked(true);
			} else {
				setVideoPageStats(true, false, like + 1);
			}
			Logger.Error("Failed to remove Like In Like Button", error);
			toast.show("Something went wrong!", ToastType.ERROR, true);
		},
	});

	const onLike = async () => {
		if (isGuest) {
			toast.show("Please Login", ToastType.ERROR, true);
			return;
		}
		if (!isalreadyLiked) {
			if (bytes) {
				setLikeCount(likeCount + 1);
				setIsLiked(true);
			} else {
				setVideoPageStats(true, false, like + 1);
			}
			void addReaction({
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
			void TrackAction(bytes ? SHOT.SHOTS_LIKE : PUBLICATION.LIKE);
		} else {
			if (bytes) {
				setLikeCount(likeCount - 1);
				setIsLiked(false);
			} else {
				setVideoPageStats(false, false, like - 1);
			}
			void removeReaction({
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
