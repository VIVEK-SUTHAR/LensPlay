import Dislike from "assets/Icons/Dislike";
import Button from "components/UI/Button";
import { dark_primary } from "constants/Colors";
import { PUBLICATION } from "constants/tracking";
import { ToastType } from "customTypes/Store";
import useDisLike from "hooks/reactions/useDisLike";
import React from "react";
import { useGuestStore } from "store/GuestStore";
import { useLikeStore } from "store/ReactionStore";
import { useActivePublication, useThemeStore, useToast } from "store/Store";
import TrackAction from "utils/Track";

function DisLikeButton() {
	const { activePublication } = useActivePublication();
	const { isLiked, likeCount, isDisLiked, setLikeCount, setIsLiked, setIsDisLiked } =
		useLikeStore();
	const { isGuest } = useGuestStore();
	const { PRIMARY } = useThemeStore();
	const toast = useToast();
	const { addDisLike, removeDisLike } = useDisLike();

	const onDislike = async () => {
		if (isGuest) {
			toast.show("Please Login", ToastType.ERROR, true);
			return;
		}
		if (!isDisLiked) {
			if (isLiked) {
				setLikeCount(likeCount - 1);
				setIsLiked(false);
			}
			setIsDisLiked(true);
			addDisLike(activePublication!);
			void TrackAction(PUBLICATION.DISLIKE);
		} else {
			setIsDisLiked(false);
			removeDisLike(activePublication!);
		}
	};

	React.useEffect(() => {
		setIsDisLiked(activePublication?.reaction === "DOWNVOTE");
	}, []);

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
			borderColor={isDisLiked ? PRIMARY : "white"}
			icon={<Dislike height={18} width={18} color={isDisLiked ? PRIMARY : "white"} />}
		/>
	);
}

export default React.memo(DisLikeButton);
