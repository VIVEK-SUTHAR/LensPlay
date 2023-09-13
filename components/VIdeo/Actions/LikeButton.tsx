import Icon from "components/Icon";
import Button from "components/UI/Button";
import { dark_primary } from "constants/Colors";
import { SHOT } from "constants/tracking";
import { ToastType } from "customTypes/Store";
import useLike from "hooks/reactions/useLike";
import React from "react";
import { useGuestStore } from "store/GuestStore";
import { useLikeStore } from "store/ReactionStore";
import { useActivePublication, useThemeStore, useToast } from "store/Store";
import formatInteraction from "utils/formatInteraction";
import TrackAction from "utils/Track";

function LikeButton() {
	const { activePublication } = useActivePublication();
	const { isLiked, likeCount, isDisLiked, setLikeCount, setIsLiked, setIsDisLiked } =
		useLikeStore();
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
			if (isDisLiked) {
				setIsDisLiked(false);
			}
			setLikeCount(likeCount + 1);
			setIsLiked(true);
			await addLike(activePublication!);
			void TrackAction(SHOT.SHOTS_LIKE);
		} else {
			setLikeCount(likeCount - 1);
			setIsLiked(false);
			await removeLike(activePublication!);
		}
	};

	return (
		<Button
			title={formatInteraction(likeCount)}
			mx={4}
			px={16}
			width={"auto"}
			bg={dark_primary}
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
			bytes={false}
			icon={<Icon name="like" size={20} color={isLiked ? PRIMARY : "white"} />}
		/>
	);
}

export default React.memo(LikeButton);
