import { client } from "../../apollo/client";
import { AuthenticationResult, Scalars } from "../../types/generated";
import refreshCurrentToken from "../../apollo/mutations/refreshCurrentToken";

const getAccessFromRefresh = async (
  refreshToken: Scalars["Jwt"]
): Promise<AuthenticationResult | undefined> => {
  try {
    const newTokens = await client.mutate({
      mutation: refreshCurrentToken,
      variables: {
        rtoken: refreshToken,
      },
    });
    return newTokens?.data?.refresh;
  } catch (error) {
    if (error instanceof Error) {
      console.log("[Error]:Error in refreshing new tokens ");
      // throw new Error(
      //   "[Error]:Error in refreshing new tokens using refresh token ",
      //   {
      //     cause: error.message,
      //   }
      // );
    }
  }
};

export default getAccessFromRefresh;
