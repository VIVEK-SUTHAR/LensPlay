import cache from "apollo/cache";
import {
	type PrimaryPublication,
	PublicationReactionType,
	useAddReactionMutation,
	useRemoveReactionMutation,
} from "customTypes/generated";
import { useAuthStore } from "store/Store";
import Logger from "utils/logger";

export default function useLike() {
	const { accessToken } = useAuthStore();

	const [addReaction] = useAddReactionMutation();
	const [removeReaction] = useRemoveReactionMutation();

	const updateCache = (value: boolean, publication: PrimaryPublication) => {
		try {
			cache.modify({
				id: cache.identify(publication as any),
				fields: {
					operations: (existingValue) => {
						return { ...existingValue, upvote: value, downvote: !value };
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

	const addLike = async (publication: PrimaryPublication) => {
		updateCache(true, publication);
		void addReaction({
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
			onCompleted: (data, clientOptions) => {
				Logger.Log("Liked Publication", data);
			},
			onError: (error) => {
				Logger.Log('Yeh error hai', error);
			}
		});
	};

	const removeLike = async (publication: PrimaryPublication) => {
		updateCache(false, publication);
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
			onError: (error) => {
				Logger.Log('Yeh error hai', error);
			}
		});
	};

	return { addLike, removeLike };
}
