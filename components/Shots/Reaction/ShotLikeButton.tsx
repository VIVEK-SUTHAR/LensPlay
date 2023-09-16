import Like from "assets/Icons/Like";
import Button from "components/UI/Button";
import { SHOT } from "constants/tracking";
import { Mirror, Post } from "customTypes/generated";
import { ToastType } from "customTypes/Store";
import useLike from "hooks/reactions/useLike";
import React, { useState } from "react";
import { useGuestStore } from "store/GuestStore";
import { useThemeStore, useToast } from "store/Store";
import formatInteraction from "utils/formatInteraction";
import TrackAction from "utils/Track";

function ShotLikeButton({ publication }: { publication: Post | Mirror }) {
	const [isLiked, setIsLiked] = useState<boolean>(publication?.reaction === "UPVOTE");
	const [likeCount, setLikeCount] = useState<number>(publication?.stats.totalUpvotes);
	const toast = useToast();
	const { PRIMARY } = useThemeStore();
	const { isGuest } = useGuestStore();
	const { addLike, removeLike } = useLike();

	const onLike = async () => {
		if (isGuest) {
			toast.show("Please Login", ToastType.ERROR, true);
			return;
		}
		if (!isLiked) {
			setLikeCount(likeCount + 1);
			setIsLiked(true);
			addLike(publication!);
			void TrackAction(SHOT.SHOTS_LIKE);
		} else {
			setLikeCount(likeCount - 1);
			setIsLiked(false);
			removeLike(publication!);
		}
	};

	return (
		<Button
			title={formatInteraction(likeCount)}
			mx={4}
			px={16}
			width={"auto"}
			bg={"transparent"}
			type={"filled"}
			borderRadius={8}
			textStyle={{
				fontSize: 14,
				fontWeight: "500",
				color: isLiked ? PRIMARY : "white",
				marginLeft: 4,
			}}
			borderColor={isLiked ? PRIMARY : "white"}
			onPress={onLike}
			bytes={true}
			icon={<Like height={24} width={24} color={isLiked ? PRIMARY : "white"} />}
		/>
	);
}

export default ShotLikeButton;
