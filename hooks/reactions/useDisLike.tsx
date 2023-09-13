import { ApolloCache } from "@apollo/client";
import cache from "apollo/cache";
import {
	FeedItemRoot,
	Mirror,
	Post,
	ReactionTypes,
	useAddReactionMutation,
	useRemoveReactionMutation,
} from "customTypes/generated";
import { useAuthStore, useProfile } from "store/Store";
import Logger from "utils/logger";

export default function useDisLike() {
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();

	const [addReaction] = useAddReactionMutation();
	const [removeReaction] = useRemoveReactionMutation();

	const updateCache = (
		cache: ApolloCache<any>,
		type: ReactionTypes.Downvote | null,
		publication: Post | Mirror | FeedItemRoot
	) => {
		try {
			cache.modify({
				id: cache.identify(publication as any),
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

	const addDisLike = async (publication: Post | Mirror | FeedItemRoot) => {
		updateCache(cache, ReactionTypes.Downvote, publication);
		void addReaction({
			variables: {
				request: {
					profileId: currentProfile?.id,
					reaction: ReactionTypes.Downvote,
					publicationId: publication?.id,
				},
			},
			context: {
				headers: {
					"x-access-token": `Bearer ${accessToken}`,
				},
			},
		});
	};

	const removeDisLike = async (publication: Post | Mirror | FeedItemRoot) => {
		updateCache(cache, null, publication);
		void removeReaction({
			variables: {
				request: {
					profileId: currentProfile?.id,
					reaction: ReactionTypes.Downvote,
					publicationId: publication?.id,
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
