import { ApolloCache } from "@apollo/client";
import cache from "apollo/cache";
import { LENSPLAY_SITE } from "constants/index";
import { PUBLICATION } from "constants/tracking";
import {
	FeedItemRoot,
	Mirror,
	Post,
	useCreateDataAvailabilityMirrorViaDispatcherMutation,
	useCreateMirrorViaDispatcherMutation,
} from "customTypes/generated";
import { useAuthStore, useProfile } from "store/Store";
import TrackAction from "utils/Track";
import Logger from "utils/logger";

export default function useMirror() {
	const { accessToken } = useAuthStore();
	const { currentProfile } = useProfile();

	const updateCache = (cache: ApolloCache<any>, publication: Post | Mirror | FeedItemRoot) => {
		try {
			cache.modify({
				id: cache.identify(publication as any),
				fields: {
					mirrors: (mirrors) => [...mirrors, currentProfile?.id],
					stats: (stats) => ({
						...stats,
						totalAmountOfMirrors: stats.totalAmountOfMirrors + 1,
					}),
				},
			});
		} catch (error) {
			Logger.Error("error", error);
		}
	};

	const [createOnChainMirror] = useCreateMirrorViaDispatcherMutation({
		onCompleted: (data) => {
			Logger.Success("Mirrored", data);
		},
		onError: (err) => {
			Logger.Error("Error in Mirror", err);
		},
	});

	const [createDataAvaibalityMirror] = useCreateDataAvailabilityMirrorViaDispatcherMutation({
		onCompleted: (data) => {
			Logger.Success("DA Mirrored", data);
		},
		onError: (err) => {
			Logger.Error("Error in DA Mirror", err);
		},
	});

	const mirrorPublication = async (publication: Post | Mirror | FeedItemRoot) => {
		const isDAPublication = publication?.isDataAvailability;
		try {
			updateCache(cache, publication);
			if (isDAPublication) {
				await createDataAvaibalityMirror({
					variables: {
						request: {
							from: currentProfile?.id,
							mirror: publication?.id,
						},
					},
					context: {
						headers: {
							"x-access-token": `Bearer ${accessToken}`,
							"origin": LENSPLAY_SITE,
						},
					},
				});
			} else {
				await createOnChainMirror({
					variables: {
						request: {
							profileId: currentProfile?.id,
							publicationId: publication?.id,
						},
					},
					context: {
						headers: {
							"x-access-token": `Bearer ${accessToken}`,
							"origin": LENSPLAY_SITE,
						},
					},
				});
			}
			TrackAction(PUBLICATION.MIRROR);
		} catch (error) {
			Logger.Error("Error in mirroring publication", error);
		}
	};

	return { mirrorPublication };
}
