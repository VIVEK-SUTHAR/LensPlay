import { ApolloCache, FetchResult } from "@apollo/client";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import cache from "apollo/cache";
import { LENSPLAY_SITE } from "constants/index";
import { PROFILE } from "constants/tracking";
import {
	CreateUnfollowTypedDataMutation,
	CreateUnfollowTypedDataMutationResult,
	Profile,
	useBroadcastMutation,
	useCreateUnfollowTypedDataMutation,
} from "customTypes/generated";
import React from "react";
import { useAuthStore } from "store/Store";
import TrackAction from "utils/Track";
import formatUnfollowTypedData from "utils/lens/formatUnfollowTypedData";
import Logger from "utils/logger";

export default function useUnsubscribe() {
	const { accessToken } = useAuthStore();
	const { address, provider } = useWalletConnectModal();
	const [signature, setSignature] = React.useState<unknown | null>(null);
	const [typeData, setTypeData] =
		React.useState<FetchResult<CreateUnfollowTypedDataMutation> | null>(null);

	// First req sign if user sign message successfully then unsubscribe channel
	// fun signUnsubscribeMessage - to req sign
	// fun unSubscribeChannel - to unsubscribe channel

	const updateCache = (cache: ApolloCache<any>, profile: Profile) => {
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

	const unSubscribeChannel = async (profile: Profile) => {
		updateCache(cache, profile);
		void sendUnFollowTxn({
			variables: {
				request: {
					signature: signature,
					id: typeData?.data?.createUnfollowTypedData?.id,
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
		if (sign) {
			setSignature(sign);
			setTypeData(data);
			return true;
		} else {
			return false;
		}
	};

	return { signUnsubscribeMessage, unSubscribeChannel };
}
