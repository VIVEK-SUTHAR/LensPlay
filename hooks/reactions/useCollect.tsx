import { ApolloCache } from "@apollo/client";
import cache from "apollo/cache";
import { LENSPLAY_SITE } from "constants/index";
import { PUBLICATION } from "constants/tracking";
import { FeedItemRoot, Mirror, Post, useProxyActionMutation } from "customTypes/generated";
import { useAuthStore } from "store/Store";
import TrackAction from "utils/Track";
import Logger from "utils/logger";

export default function useCollect() {
	const { accessToken } = useAuthStore();

	const updateCache = (cache: ApolloCache<any>, publication: Post | Mirror | FeedItemRoot) => {
		try {
			cache.modify({
				id: cache.identify(publication as any),
				fields: {
					hasCollectedByMe() {
						return true;
					},
					stats: (stats) => ({
						...stats,
						totalAmountOfCollects: stats.totalAmountOfCollects + 1,
					}),
				},
			});
		} catch (error) {
			Logger.Error("error in updating cache", error);
		}
	};

	const [createProxyAction] = useProxyActionMutation({
		onCompleted: (data) => {
			TrackAction(PUBLICATION.COLLECT_VIDEO);
		},
		onError: (error) => {},
	});

	const collectPublication = async (publication: Post | Mirror | FeedItemRoot) => {
		try {
			updateCache(cache, publication);
			await createProxyAction({
				variables: {
					request: {
						collect: {
							freeCollect: {
								publicationId: publication?.id,
							},
						},
					},
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
						"origin": LENSPLAY_SITE,
					},
				},
			});
		} catch (error) {
			Logger.Error("Error in collecting publication", error);
		}
	};

	return { collectPublication };
}
