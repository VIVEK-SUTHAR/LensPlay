import cache from "apollo/cache";
import {
	type PrimaryPublication,
	PublicationReactionType,
	useAddReactionMutation,
	useRemoveReactionMutation,
} from "customTypes/generated";
import { useAuthStore } from "store/Store";

import Logger from "utils/logger";

export default function useDisLike() {
	const { accessToken } = useAuthStore();

	const [addReaction] = useAddReactionMutation();
	const [removeReaction] = useRemoveReactionMutation();

	const updateCache = (
		type: PublicationReactionType.Downvote | null,
		publication: PrimaryPublication
	) => {
		try {
			cache.modify({
				id: cache.identify(publication as any),
				fields: {
					operations: (existingValue) => {
						if (type) {
							return { ...existingValue, downvote: true };
						}
						return { ...existingValue, downvote: false };
					},
					stats: (existingValue) => {
						return { ...existingValue, reactions: existingValue + 1 };
					},
				},
			});
		} catch (error) {
			Logger.Error("error", error);
		}
	};

	const addDisLike = async (publication: PrimaryPublication) => {
		updateCache(PublicationReactionType.Downvote, publication);
		void addReaction({
			variables: {
				request: {
					for: publication?.id,
					reaction: PublicationReactionType.Downvote,
				},
			},
			context: {
				headers: {
					"x-access-token": `Bearer ${accessToken}`,
				},
			},
		});
	};

	const removeDisLike = async (publication: PrimaryPublication) => {
		updateCache(null, publication);
		void removeReaction({
			variables: {
				request: {
					for: publication?.id,
					reaction: PublicationReactionType.Upvote,
				},
			},
			context: {
				headers: {
					"x-access-token": `Bearer ${accessToken}`,
				},
			},
		});
	};

	return { addDisLike, removeDisLike };
}
