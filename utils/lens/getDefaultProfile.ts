import { client } from "../../apollo/client";
import getProfile from "../../apollo/Queries/getProfile";
import { Profile, Scalars } from "../../types/generated";

const getDefaultProfile = async (
  ethAddress: Scalars["EthereumAddress"]
): Promise<Profile | undefined> => {
  try {
    const result = await client.query({
      query: getProfile,
      variables: {
        ethAddress: ethAddress,
      },
    });

    return result?.data?.defaultProfile;
  } catch (error) {
    console.log("[Error]:Error in getting default profile");
    // throw new Error("[Error]:Error in getting default profile", {
    //   cause: error,
    // });
  }
};

export default getDefaultProfile;
