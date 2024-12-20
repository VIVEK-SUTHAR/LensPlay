import Icon from "components/Icon";
import Button from "components/UI/Button";
import { dark_primary } from "constants/Colors";
import { PUBLICATION, SHOT } from "constants/tracking";
import { PrimaryPublication } from "customTypes/generated";
import useLike from "hooks/reactions/useLike";
import React, { useState } from "react";
import { useGuestStore } from "store/GuestStore";
import { useActivePublication, useReactionStore, useThemeStore, useToast } from "store/Store";
import formatInteraction from "utils/formatInteraction";
import Logger from "utils/logger";
import TrackAction from "utils/Track";

type LikeButtonProps = {
	id: string;
	like: number;
	isalreadyLiked: boolean;
	bytes?: boolean;
	shotPublication?: PrimaryPublication;
};

const LikeButton: React.FC<LikeButtonProps> = ({
	like,
	isalreadyLiked,
	id,
	bytes = false,
	shotPublication,
}) => {
	const [isLiked, setIsLiked] = useState(isalreadyLiked);
	const [likeCount, setLikeCount] = useState(like);

	const toast = useToast();
	const { PRIMARY } = useThemeStore();
	const { isGuest } = useGuestStore();
	const { setVideoPageStats } = useReactionStore();

	const { activePublication } = useActivePublication();
	const { addLike, removeLike } = useLike();

	const onLike = async () => {
		if (isGuest) {
			toast.error("Please Login to like");
			return;
		}
		if (!isLiked) {
			if (bytes) {
				Logger.Log("This is bytes and this is not already liked", isalreadyLiked);
				setLikeCount(likeCount + 1);
				// setIsAlreadyLiked!(true);
				setIsLiked(true);
			} else {
				setVideoPageStats(true, false, like + 1);
			}
			addLike(bytes ? shotPublication! : activePublication!);
			void TrackAction(bytes ? SHOT.SHOTS_LIKE : PUBLICATION.LIKE);
		} else {
			if (bytes) {
				Logger.Log("This is bytes and this is already liked", isalreadyLiked);

				setLikeCount(likeCount - 1);
				setIsLiked(false);
			} else {
				setVideoPageStats(false, false, like - 1);
			}
			removeLike(bytes ? shotPublication! : activePublication!);
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

export default React.memo(LikeButton);
