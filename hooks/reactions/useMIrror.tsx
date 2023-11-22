import cache from "apollo/cache";
import {
	Mirror,
	MomokaMirrorRequest,
	OnchainMirrorRequest,
	Post,
	useBroadcastOnMomokaMutation,
	useBroadcastOnchainMutation,
	useCreateMomokaMirrorTypedDataMutation,
	useCreateOnchainMirrorTypedDataMutation,
	useMirrorOnMomokaMutation,
	useMirrorOnchainMutation,
} from "customTypes/generated";
import useProfileStore from "store/profileStore";
import Logger from "utils/logger";
import getSignature from "utils/getSignature";
import { useSignTypedData } from "wagmi";
import { LENSPLAY_SITE } from "constants/index";
import { useAuthStore } from "store/Store";

export default function useMirror() {
	const { currentProfile } = useProfileStore();
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

	const [broadcastOnMomoka] = useBroadcastOnMomokaMutation();
	const [broadcastOnchain] = useBroadcastOnchainMutation();

	const typedDataGenerator = async (generatedData: any, isMomokaPublication = false) => {
		const { id, typedData } = generatedData;
		const message = getSignature(typedData);

		const signature = await signTypedDataAsync(message);
		if (error) {
			Logger.Error("", error);
			return null;
		}
		Logger.Log("this is signature", signature);

		// if (currentProfile?.sponsor) {
		if (isMomokaPublication) {
			return await broadcastOnMomoka({
				variables: { request: { id, signature } },
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
						"origin": LENSPLAY_SITE,
					},
				},
			});
		}

		const { data } = await broadcastOnchain({
			variables: { request: { id, signature } },
			context: {
				headers: {
					"x-access-token": `Bearer ${accessToken}`,
					"origin": LENSPLAY_SITE,
				},
			},
		});
		// }
	};

	const [createOnchainMirrorTypedData] = useCreateOnchainMirrorTypedDataMutation({
		onCompleted: async ({ createOnchainMirrorTypedData }) => {
			await typedDataGenerator(createOnchainMirrorTypedData);
		},
	});

	// Momoka typed data generation
	const [createMomokaMirrorTypedData] = useCreateMomokaMirrorTypedDataMutation({
		onCompleted: async ({ createMomokaMirrorTypedData }) =>
			await typedDataGenerator(createMomokaMirrorTypedData, true),
	});

	// Onchain mutations
	const [mirrorOnchain] = useMirrorOnchainMutation();

	// Momoka mutations
	const [mirrorOnMomoka] = useMirrorOnMomokaMutation();

	const createOnMomka = async (request: MomokaMirrorRequest) => {
		const { data } = await mirrorOnMomoka({ variables: { request } });
		if (data?.mirrorOnMomoka?.__typename === "LensProfileManagerRelayError") {
			return await createMomokaMirrorTypedData({ variables: { request } });
		}
	};

	const createOnChain = async (request: OnchainMirrorRequest) => {
		const { data } = await mirrorOnchain({ variables: { request } });
		if (data?.mirrorOnchain.__typename === "LensProfileManagerRelayError") {
			return await createOnchainMirrorTypedData({
				variables: {
					request,
				},
			});
		}
	};

	const mirrorPublication = async (publication: Post | Mirror) => {
		try {
			updateCache(publication);
			if (publication.momoka?.proof) {
				if (currentProfile?.signless) {
					return await createOnMomka({
						mirrorOn: publication?.id,
					});
				}

				return await createMomokaMirrorTypedData({
					variables: {
						request: {
							mirrorOn: publication?.id,
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

			if (currentProfile?.signless) {
				return await createOnChain({
					mirrorOn: publication?.id,
				});
			}

			console.log("typed saadi che");

			return await createOnchainMirrorTypedData({
				variables: {
					request: {
						mirrorOn: publication?.id,
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
			Logger.Error("Error in mirroring publication", error);
		}
	};

	return { mirrorPublication };
}
