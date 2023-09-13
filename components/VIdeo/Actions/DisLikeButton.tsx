import { ApolloCache } from "@apollo/client";
import Icon from "components/Icon";
import Button from "components/UI/Button";
import { dark_primary } from "constants/Colors";
import { PUBLICATION } from "constants/tracking";
import {
	ReactionTypes,
	useAddReactionMutation,
	useRemoveReactionMutation,
} from "customTypes/generated";
import { ToastType } from "customTypes/Store";
import React from "react";
import { useGuestStore } from "store/GuestStore";
import {
	useActivePublication,
	useAuthStore,
	useProfile,
	useReactionStore,
	useThemeStore,
	useToast,
} from "store/Store";
import Logger from "utils/logger";
import TrackAction from "utils/Track";

type DisLikeButtonProps = {
	id: string;
	isalreadyDisLiked: boolean;
};

const DisLikeButton: React.FC<DisLikeButtonProps> = ({ isalreadyDisLiked, id }) => {
	const userStore = useProfile();
	const { isGuest } = useGuestStore();
	const { PRIMARY } = useThemeStore();
	const { videopageStats, setVideoPageStats } = useReactionStore();
	const { accessToken } = useAuthStore();
	const toast = useToast();
	const { activePublication } = useActivePublication();

	const updateCache = (cache: ApolloCache<any>, type: ReactionTypes.Downvote | null) => {
		try {
			cache.modify({
				id: cache.identify(activePublication as any),
				fields: {
					reaction() {
						if (type) {
							return ReactionTypes.Downvote;
						} else {
							return null;
						}
					},
				},
			});
		} catch (error) {
			Logger.Error("error", error);
		}
	};

	const [addReaction] = useAddReactionMutation({
		onError: (error) => {
			setVideoPageStats(
				false,
				false,
				videopageStats.isLiked ? videopageStats.likeCount + 1 : videopageStats.likeCount
			);
			toast.show("Something went wrong!", ToastType.ERROR, true);
			Logger.Error("Failed to add like in Dislike", error);
		},
		onCompleted: (data) => {},
		update: (cache) => updateCache(cache, ReactionTypes.Downvote),
	});

	const [removeReaction] = useRemoveReactionMutation({
		onError: (error) => {
			Logger.Error("Failed to Remove Like in DisLike", error);
			setVideoPageStats(false, false, videopageStats.likeCount);
			toast.show("Something went wrong!", ToastType.ERROR, true);
		},
		onCompleted: (data) => {},
		update: (cache) => updateCache(cache, null),
	});

	const onDislike = async () => {
		if (isGuest) {
			toast.show("Please Login", ToastType.ERROR, true);
			return;
		}
		if (!isalreadyDisLiked) {
			setVideoPageStats(
				false,
				true,
				videopageStats.isLiked ? videopageStats.likeCount - 1 : videopageStats.likeCount
			);
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
			void TrackAction(PUBLICATION.DISLIKE);
		} else {
			setVideoPageStats(false, false, videopageStats.likeCount);
			void removeReaction({
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
			icon={<Icon name="dislike" size={20} color={isalreadyDisLiked ? PRIMARY : "white"} />}
		/>
	);
};

export default React.memo(DisLikeButton);
