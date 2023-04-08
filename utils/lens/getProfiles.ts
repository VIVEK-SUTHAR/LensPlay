import { client } from "../../apollo/client";
import getProfileByAddress from "../../apollo/Queries/getProfileByAddress";
import { Profile, Scalars } from "../../types/generated";

const getProfiles = async (
  ethAddress: Scalars["EthereumAddress"]
): Promise<Profile | undefined> => {
  try {
    const result = await client.query({
      query: getProfileByAddress,
      variables: {
        ethAddress: ethAddress,
      },
    });
    console.log(result?.data?.profiles?.items,'idhaer');
    

    return result?.data?.profiles?.items[0];
  } catch (error) {
    console.log("[Error]:Error in getting created profile");
    // throw new Error("[Error]:Error in getting default profile", {
    //   cause: error,
    // });
  }
};

export default getProfiles;
