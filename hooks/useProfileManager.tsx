import {
	ChangeProfileManagerActionType,
	CreateChangeProfileManagersBroadcastItemResult,
	useBroadcastOnchainMutation,
	useCreateChangeProfileManagersTypedDataMutation,
} from "customTypes/generated";
import useProfileStore from "store/profileStore";
import Logger from "utils/logger";
import getSignature from "utils/getSignature";
import { useAccount, useSignTypedData } from "wagmi";
import { useAuthStore } from "store/Store";
import { LENSPLAY_SITE } from "constants/index";

export default function useProfileManager() {
	const { currentProfile } = useProfileStore();
	const { signTypedDataAsync, error } = useSignTypedData();
	const { accessToken } = useAuthStore();
	const [broadcast] = useBroadcastOnchainMutation();

	const [handleLensManager] = useCreateChangeProfileManagersTypedDataMutation();

	async function broadcastProfileManagerTx(id: string, signature: string) {
		try {
			if (!currentProfile?.sponsor) return;

			const { data } = await broadcast({
				variables: {
					request: {
						id: id,
						signature: signature,
					},
				},
			});

			return data;
		} catch (error) {
			Logger.Error("useProfileManager, handleLensManager()", error);
		}
	}

	async function signProfileManagerMessage(
		data: CreateChangeProfileManagersBroadcastItemResult
	) {
		try {
			Logger.Success("Lens API:Typed Data", data.typedData);

			const message = getSignature(data?.typedData);

			const sign = await signTypedDataAsync(message);

			if (error) return null;

			const id = data.id;

			if (sign && id) {
				return {
					sign,
					id,
				};
			}
			return null;
		} catch (error) {
			Logger.Error("useProfileManager, signProfileManagerMessage()", error);
		}
	}

	const addManager = async (address: string) => {
		try {
			const data = await handleLensManager({
				variables: {
					request: {
						changeManagers: [
							{
								address,
								action: ChangeProfileManagerActionType.Add,
							},
						],
					},
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
						origin: LENSPLAY_SITE,
					},
				},
			});

			return data.data?.createChangeProfileManagersTypedData;
		} catch (error) {
			Logger.Error("useProfileManager, addManager()", error);
		}
	};

	const removeManager = async (address: string) => {
		try {
			const data = await handleLensManager({
				variables: {
					request: {
						changeManagers: [
							{
								address,
								action: ChangeProfileManagerActionType.Remove,
							},
						],
					},
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
						origin: LENSPLAY_SITE,
					},
				},
			});
			return data.data?.createChangeProfileManagersTypedData;
		} catch (error) {
			Logger.Error("useProfileManager, removeManager()", error);
		}
	};

	return {
		addManager,
		removeManager,
		broadcastProfileManagerTx,
		signProfileManagerMessage,
	};
}
