import cache from "apollo/cache";
import { LENSPLAY_SITE } from "constants/index";
import { Profile, useProxyActionMutation } from "customTypes/generated";
import { useAuthStore } from "store/Store";
import Logger from "utils/logger";

export default function useSubscribe() {
	const { accessToken } = useAuthStore();

	const updateCache = (channel: Profile) => {
		try {
			cache.modify({
				id: cache.identify(channel as any),
				fields: {
					isFollowedByMe() {
						return true;
					},
				},
			});
		} catch (error) {
			Logger.Error("error", error);
		}
	};

	const [freeFollowViaDispatcher] = useProxyActionMutation({
		onCompleted: (data) => {},
		onError(error) {
			Logger.Error("failed  to subscribe ,", error);
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
				"origin": LENSPLAY_SITE,
			},
		},
	});

	const subscribeChannel = (channel: Profile) => {
		updateCache(channel);
		void freeFollowViaDispatcher({
			variables: {
				request: {
					follow: {
						freeFollow: {
							profileId: channel?.id,
						},
					},
				},
			},
		});
	};

	return { subscribeChannel };
}
