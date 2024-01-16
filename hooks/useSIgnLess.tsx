import { LENSPLAY_SITE } from "constants/index";
import {
	useBroadcastOnchainMutation,
	useCreateChangeProfileManagersTypedDataMutation,
} from "customTypes/generated";
import { useAuthStore, useProfile } from "store/Store";
import getSignature from "utils/getSignature";
import Logger from "utils/logger";
import { useSignTypedData } from "wagmi";
// import { useSignTypedData } from "wagmi";

export default function useSignless() {
	const { accessToken } = useAuthStore();
	const { currentProfile } = useProfile();
	const { signTypedDataAsync, error } = useSignTypedData();

	const [broadcast] = useBroadcastOnchainMutation();
	const [handleLensManager] = useCreateChangeProfileManagersTypedDataMutation();

	async function handleSignless(isSignless: boolean) {
		Logger.Log("Approve SignLess", isSignless);
		const data = await handleLensManager({
			variables: {
				request: {
					approveSignless: isSignless,
				},
			},
			context: {
				headers: {
					"x-access-token": `Bearer ${accessToken}`,
					origin: LENSPLAY_SITE,
				},
			},
		});

		if (
			data?.data?.createChangeProfileManagersTypedData?.typedData &&
			currentProfile?.sponsor
		) {
			const message = getSignature(
				data?.data?.createChangeProfileManagersTypedData?.typedData
			);

			const signature = await signTypedDataAsync(message);
			Logger.Log("signature", signature);

			if (error) return null;

			const id = data?.data?.createChangeProfileManagersTypedData?.id;

			const { data: broadcastData, errors } = await broadcast({
				variables: {
					request: {
						id: id,
						signature: signature,
					},
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
						origin: LENSPLAY_SITE,
					},
				},
			});

			return broadcastData;
		}

		return null;
	}

	return { handleSignless };
}
