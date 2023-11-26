import Icon from "components/Icon";
import Button from "components/UI/Button";
import { dark_primary } from "constants/Colors";
import { PUBLICATION } from "constants/tracking";
import useDisLike from "hooks/reactions/useDisLike";
import React from "react";
import { useGuestStore } from "store/GuestStore";
import { useActivePublication, useReactionStore, useThemeStore, useToast } from "store/Store";
import TrackAction from "utils/Track";

type DisLikeButtonProps = {
	id: string;
	isalreadyDisLiked: boolean;
};

const DisLikeButton: React.FC<DisLikeButtonProps> = ({ isalreadyDisLiked, id }) => {
	const { isGuest } = useGuestStore();
	const { PRIMARY } = useThemeStore();
	const { videopageStats, setVideoPageStats } = useReactionStore();
	const toast = useToast();
	const { activePublication } = useActivePublication();

	const { addDisLike, removeDisLike } = useDisLike();

	const onDislike = async () => {
		if (isGuest) {
			toast.error("Please Login");
			return;
		}
		if (!isalreadyDisLiked) {
			setVideoPageStats(
				false,
				true,
				videopageStats.isLiked ? videopageStats.likeCount - 1 : videopageStats.likeCount
			);
			void addDisLike(activePublication);
			void TrackAction(PUBLICATION.DISLIKE);
		} else {
			setVideoPageStats(false, false, videopageStats.likeCount);
			void removeDisLike(activePublication);
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
			icon={<Icon name="dislike" size={20} color={isalreadyDisLiked ? PRIMARY : "white"} />}
		/>
	);
};

export default React.memo(DisLikeButton);
