import { client } from "../../apollo/client";
import getProfileByAddress from "../../apollo/Queries/getProfileByAddress";
import {
  Profile,
  ProfileQueryRequest,
  ProfilesDocument,
  Scalars,
} from "../../types/generated";

const getProfiles = async (
  request: ProfileQueryRequest
): Promise<Profile | undefined> => {
  try {
    const result = await client.query({
      query: ProfilesDocument,
      variables: {
        request,
      },
      fetchPolicy: "network-only",
    });
    return result?.data?.profiles?.items[0];
  } catch (error) {
    console.log("[Error]:Error in getting created profile");
  }
};

export default getProfiles;
