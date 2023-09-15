import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import cache from "apollo/cache";
import { LENSPLAY_SITE } from "constants/index";
import { PROFILE } from "constants/tracking";
import {
	CreateUnfollowTypedDataMutationResult,
	Profile,
	useBroadcastMutation,
	useCreateUnfollowTypedDataMutation,
} from "customTypes/generated";
import { useAuthStore } from "store/Store";
import TrackAction from "utils/Track";
import formatUnfollowTypedData from "utils/lens/formatUnfollowTypedData";
import Logger from "utils/logger";

export default function useUnsubscribe() {
	const { accessToken } = useAuthStore();
	const { address, provider } = useWalletConnectModal();

	// First req sign if user sign message successfully then unsubscribe channel
	// fun signUnsubscribeMessage - to req sign
	// fun unSubscribeChannel - to unsubscribe channel

	const updateCache = (profile: Profile) => {
		try {
			cache.modify({
				id: cache.identify(profile as any),
				fields: {
					isFollowedByMe() {
						return false;
					},
				},
			});
		} catch (error) {
			Logger.Error("error", error);
		}
	};

	const [getTypedData] = useCreateUnfollowTypedDataMutation({
		onError: (error) => {
			Logger.Error("Failed to get typeData", error);
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
				"origin": LENSPLAY_SITE,
			},
		},
	});

	const [sendUnFollowTxn] = useBroadcastMutation({
		onCompleted: () => {
			TrackAction(PROFILE.UNFOLLOW);
		},
		onError: (error) => {
			Logger.Error("Failed to Subscribe via Broadcast", error);
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
				"origin": LENSPLAY_SITE,
			},
		},
	});

	const unSubscribeChannel = async (profile: Profile, signature: any, id: any) => {
		updateCache(profile);
		void sendUnFollowTxn({
			variables: {
				request: {
					signature: signature,
					id: id,
				},
			},
		});
	};

	const signUnsubscribeMessage = async (profile: Profile) => {
		const data = await getTypedData({
			variables: {
				request: {
					profile: profile?.id,
				},
			},
		});
		const message = formatUnfollowTypedData(data as CreateUnfollowTypedDataMutationResult);
		const msgParams = [address, JSON.stringify(message)];
		const sign = await provider?.request({
			method: "eth_signTypedData",
			params: msgParams,
		});

		const id = data?.data?.createUnfollowTypedData?.id;

		if (sign && id) {
			return { sign, id };
		}

		return null;
	};

	return { signUnsubscribeMessage, unSubscribeChannel };
}
