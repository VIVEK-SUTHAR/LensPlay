import StorageKeys from "constants/Storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { client } from "apollo/client";
import getProfile from "apollo/Queries/getProfile";
import { Profile, Scalars } from "customTypes/generated";
import Logger from "utils/logger";

const getDefaultProfile = async (
	ethAddress: Scalars["EthereumAddress"]
): Promise<Profile | undefined> => {
	try {
		Logger.Log("get default me call aagay ab lens me jayega ");
		const result = await client.query({
			query: getProfile,
			variables: {
				ethAddress: ethAddress,
			},
		});
		Logger.Log("lens ma se mila ye", result);
		await AsyncStorage.setItem(StorageKeys.ProfileId, result?.data?.defaultProfile?.id);
		return result?.data?.defaultProfile;
	} catch (error) {
		Logger.Log("[Error in Get default profile]");
	}
};

export default getDefaultProfile;
