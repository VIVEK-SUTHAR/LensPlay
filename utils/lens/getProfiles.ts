import { client } from "apollo/client";
import { AllProfilesDocument, Profile, ProfileQueryRequest } from "customTypes/generated";
import Logger from "utils/logger";

const getProfiles = async (request: ProfileQueryRequest): Promise<Profile | undefined> => {
	try {
		const result = await client.query({
			query: AllProfilesDocument,
			variables: {
				request,
			},
			fetchPolicy: "network-only",
		});
		Logger.Success("Got the Profiles", result?.data?.profiles);
		return result?.data?.profiles?.items[0];
	} catch (error) {
		Logger.Error("Error in getting created profile", error);
	}
};

export default getProfiles;
