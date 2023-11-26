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

	const [handleLensManager] = useCreateChangeProfileManagersTypedDataMutation({
		onError: (error, clientOptions) => {
			Logger.Success("me yaha", error, clientOptions);
		},
	});

	async function broadcastProfileManagerTx(id: string, signature: string) {
		try {
			if (!currentProfile?.sponsor) return "Nikal";

			console.log("Broadcasting Txns..");

			const { data } = await broadcast({
				variables: {
					request: {
						id: id,
						signature: signature,
					},
				},
			});
			Logger.Success("Data", data);
			return data;
		} catch (error) {
			Logger.Error("useProfileManager, handleLensManager()", error);
		}
	}

	async function signProfileManagerMessage(data: CreateChangeProfileManagersBroadcastItemResult) {
		try {
			Logger.Success("Lens API:Typed Data", data.typedData);

			const message = getSignature(data?.typedData);

			Logger.Success("Formatted Typed Data", message);
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
		} catch (error) {}
	}

	const addManager = async (address: string) => {
		console.log("In Add manager", address);

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
					"origin": LENSPLAY_SITE,
				},
			},
		});

		return data.data?.createChangeProfileManagersTypedData;
	};

	const removeManager = async (address: string) => {
		return await handleLensManager({
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
		});
	};

	return { addManager, removeManager, broadcastProfileManagerTx, signProfileManagerMessage };
}
