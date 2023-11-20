import {
	ChangeProfileManagerActionType,
	useBroadcastOnchainMutation,
	useCreateChangeProfileManagersTypedDataMutation,
} from "customTypes/generated";
import useProfileStore from "store/profileStore";
import Logger from "utils/logger";
import getSignature from "utils/getSignature";
import { useSignTypedData } from "wagmi";

export default function useProfileManager() {
	const { currentProfile } = useProfileStore();
	const { signTypedDataAsync, error } = useSignTypedData();

	const [broadcast] = useBroadcastOnchainMutation();

	const [handleLensManager] = useCreateChangeProfileManagersTypedDataMutation({
		onCompleted: async ({ createChangeProfileManagersTypedData }) => {
			const { id, typedData } = createChangeProfileManagersTypedData;
			try {
				if (currentProfile?.sponsor) {
          console.log("ge");
          
					const message = getSignature(typedData);
					const signature = await signTypedDataAsync(message);

					if (error) return null;
          console.log(signature);
          return
          
					const { data } = await broadcast({
						variables: {
							request: {
								id: id,
								signature: signature,
							},
						},
					});

					return data;
				}
			} catch (error) {
				Logger.Error("useProfileManager, handleLensManager()", error);
			}
		},
	});

	const addManager = async (address: string) => {
    console.log(address);
    
		return await handleLensManager({
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
		});
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

	return { addManager, removeManager };
}
