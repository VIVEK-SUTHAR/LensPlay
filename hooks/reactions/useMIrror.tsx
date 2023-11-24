import cache from "apollo/cache";
import {
	Mirror,
	Post,
	PrimaryPublication,
	useCreateMomokaMirrorTypedDataMutation,
	useCreateOnchainMirrorTypedDataMutation,
	useMirrorOnMomokaMutation,
	useMirrorOnchainMutation,
} from "customTypes/generated";
import Logger from "utils/logger";
import { useSignTypedData } from "wagmi";
import { useAuthStore, useProfile } from "store/Store";
import getSignature from "utils/getSignature";

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

	const getTypedData = async (publicationId: string, isMomoka = false) => {
		try {
			if (isMomoka) {
				const { data: momokaTypedData } = await getMomokaMirrorTypedData({
					variables: {
						request: {
							mirrorOn: publicationId,
						},
					},
				});
				return momokaTypedData?.createMomokaMirrorTypedData;
			} else {
				const { data: onChainTypedData } = await getOnChainMirrorTypedData({
					variables: {
						request: {
							mirrorOn: publicationId,
						},
					},
				});
				return onChainTypedData?.createOnchainMirrorTypedData;
			}
		} catch (error) {}
	};

	const mirrorPublication = async (publication: PrimaryPublication) => {
		const isLensManagerEnabled = currentProfile?.signless;
		const isMomokaPublication = Boolean(publication?.momoka?.proof);
		Logger.Warn("Is Momoka Publication", isMomokaPublication);
		Logger.Warn("Is Lens Manager Added", isLensManagerEnabled);

		//Lens Manager Enabled and Momoka Publication: SignLess
		if (isMomokaPublication && isLensManagerEnabled) {
			Logger.Log("Sending On Momoka Mirror Signless");
			return;
			const { data } = await momokaMirrorSignLess({
				variables: {
					request: {
						mirrorOn: publication?.id,
					},
				},
			});
		}
		//Lens Manager Disabled and Momoka Publication: Typed data,BroadCast on Momoka
		if (!isLensManagerEnabled && isMomokaPublication) {
			const typedData = await getTypedData(publication?.id, isMomokaPublication);
			const formattedTypedData = getSignature(typedData?.typedData!);
		}
		//Lens Manager Enabled and On Chain Publication: SignLess
		if (isLensManagerEnabled && !isMomokaPublication) {
			Logger.Log("Sending On Chain Mirror Signless Approach");
			return;
			onChainMirrorSignLess({
				variables: {
					request: {
						mirrorOn: publication?.id,
					},
				},
			});
		}
		// Lens Manager Disabled and On Chain Publication
		if (!isLensManagerEnabled && !isMomokaPublication) {
		}
	};

	return { mirrorPublication };
}
