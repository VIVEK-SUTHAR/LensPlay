import cache from "apollo/cache";
import {
	Mirror,
	Post,
	PrimaryPublication,
	useBroadcastOnMomokaMutation,
	useBroadcastOnchainMutation,
	useCreateMomokaMirrorTypedDataMutation,
	useCreateOnchainMirrorTypedDataMutation,
	useMirrorOnMomokaMutation,
	useMirrorOnchainMutation,
} from "customTypes/generated";
import Logger from "utils/logger";
import { useSignTypedData } from "wagmi";
import { useAuthStore, useProfile } from "store/Store";
import getSignature from "utils/getSignature";
import { LENSPLAY_SITE } from "constants/index";

/**
 *
 * Cases Possible for Mirror Publication
 *
 * Lens Manager Enabled and Momoka Publication: Send Momoka Mutation : ✅
 * Lens Manager Disabled and Momoka Publication: typed data approach,then broadcast on Momoka
 * Lens Manager Enabled and On Chain Publication: Send OnChain Mutation ✅
 * Lens Manager Disabled and On Chain Publication: Typed Data and Broadcast approach, Broadcast On Chain
 *
 */

export default function useMirror() {
	const { currentProfile } = useProfile();
	const { signTypedDataAsync, error } = useSignTypedData();
	const { accessToken } = useAuthStore();
	const context = {
		headers: {
			"x-access-token": `Bearer ${accessToken}`,
			"origin": LENSPLAY_SITE,
		},
	};
	const updateCache = (publication: Post | Mirror) => {
		try {
			cache.modify({
				id: cache.identify(publication as any),
				fields: {
					operations: (existingValue) => {
						return { ...existingValue, hasMirrored: true };
					},
					stats: (stats) => ({
						...stats,
						mirrors: stats.totalAmountOfMirrors + 1,
					}),
				},
			});
		} catch (error) {
			Logger.Error("error", error);
		}
	};

	const [onChainMirrorSignLess] = useMirrorOnchainMutation();
	const [momokaMirrorSignLess] = useMirrorOnMomokaMutation();
	const [getMomokaMirrorTypedData] = useCreateMomokaMirrorTypedDataMutation();
	const [getOnChainMirrorTypedData] = useCreateOnchainMirrorTypedDataMutation();

	//Broadcast Calls
	const [broadcastOnChain] = useBroadcastOnchainMutation();
	const [broadcastOnMomoka] = useBroadcastOnMomokaMutation();

	const getTypedData: any = async (publicationId: string, isMomoka = false) => {
		try {
			if (isMomoka) {
				const { data: momokaTypedData } = await getMomokaMirrorTypedData({
					variables: {
						request: {
							mirrorOn: publicationId,
						},
					},
					context,
				});
				return momokaTypedData?.createMomokaMirrorTypedData;
			} else {
				const { data: onChainTypedData } = await getOnChainMirrorTypedData({
					variables: {
						request: {
							mirrorOn: publicationId,
						},
					},
					context,
				});
				return onChainTypedData?.createOnchainMirrorTypedData;
			}
		} catch (error) {}
	};

	const mirrorPublication = async (publication: Post | Mirror) => {
		const isLensManagerEnabled = currentProfile?.signless;
		const isMomokaPublication = Boolean(publication?.momoka?.proof);
		Logger.Warn("Is Momoka Publication", isMomokaPublication);
		Logger.Warn("Is Lens Manager Added", isLensManagerEnabled);

		//Lens Manager Enabled and Momoka Publication: SignLess
		if (isMomokaPublication && isLensManagerEnabled) {
			Logger.Log("Sending On Momoka Mirror Signless");
			updateCache(publication);

			const { data } = await momokaMirrorSignLess({
				variables: {
					request: {
						mirrorOn: publication?.id,
					},
				},
				context,
			});
			return;
		}
		//Lens Manager Disabled and Momoka Publication: Typed data,BroadCast on Momoka
		if (!isLensManagerEnabled && isMomokaPublication) {
			const { id, typedData } = await getTypedData(publication?.id, isMomokaPublication);
			const formattedTypedData = getSignature(typedData);
			const signature = await signTypedDataAsync(formattedTypedData);
			updateCache(publication as any);
			const { data } = await broadcastOnMomoka({
				variables: { request: { id, signature } },
				context,
			});
			return;
		}
		//Lens Manager Enabled and On Chain Publication: SignLess
		if (isLensManagerEnabled && !isMomokaPublication) {
			Logger.Log("Sending On Chain Mirror Signless Approach");
			updateCache(publication as any);
			onChainMirrorSignLess({
				variables: {
					request: {
						mirrorOn: publication?.id,
					},
				},
				context: context,
			});
			return;
		}
		// Lens Manager Disabled and On Chain Publication
		if (!isLensManagerEnabled && !isMomokaPublication) {
			const { id, typedData } = await getTypedData(publication?.id, isMomokaPublication);
			const formattedTypedData = getSignature(typedData);
			const signature = await signTypedDataAsync(formattedTypedData);
			updateCache(publication as any);
			const { data } = await broadcastOnChain({
				variables: { request: { id, signature } },
				context,
			});
			return;
		}
	};

	return { mirrorPublication };
}
