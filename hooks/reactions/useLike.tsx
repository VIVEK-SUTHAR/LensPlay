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

export default function useLike() {
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();

	const [addReaction] = useAddReactionMutation();
	const [removeReaction] = useRemoveReactionMutation();

	const updateCache = (
		type: ReactionTypes.Upvote | null,
		publication: Post | Mirror | FeedItemRoot
	) => {
		try {
			cache.modify({
				id: cache.identify(publication as any),
				fields: {
					reaction() {
						if (type) {
							return ReactionTypes.Upvote;
						} else {
							return null;
						}
					},
					stats: (stats) => ({
						...stats,
						totalUpvotes:
							type === ReactionTypes.Upvote ? stats.totalUpvotes + 1 : stats.totalUpvotes - 1,
					}),
				},
			});
		} catch (error) {
			Logger.Error("error", error);
		}
	};

	const addLike = async (publication: Post | Mirror | FeedItemRoot) => {
		updateCache(ReactionTypes.Upvote, publication);
		void addReaction({
			variables: {
				request: {
					profileId: currentProfile?.id,
					reaction: ReactionTypes.Upvote,
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

	const removeLike = async (publication: Post | Mirror | FeedItemRoot) => {
		updateCache(null, publication);
		void removeReaction({
			variables: {
				request: {
					profileId: currentProfile?.id,
					reaction: ReactionTypes.Upvote,
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

	return { addLike, removeLike };
}
