import { client } from "apollo/client";
import { Profile, ProfilesDocument, ProfilesQueryVariables, Scalars } from "customTypes/generated";
import Logger from "utils/logger";

const getProfiles = async (address: Scalars["EvmAddress"]): Promise<Profile | undefined> => {
	try {
		const result = await client.query({
			query: ProfilesDocument,
			variables: {
				request: {
					where: {
						ownedBy: [address],
					},
				},
			},
			fetchPolicy: "network-only",
		});
		Logger.Success("Got the Profiles", result?.data?.profiles?.items[0]);
		return result?.data?.profiles?.items[0];
		// return result?.data?.items[0];
	} catch (error) {
		Logger.Error("Error in getting created profile", error);
	}
};

export default getProfiles;
