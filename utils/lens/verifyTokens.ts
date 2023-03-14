import { client } from "../../apollo/client";
import verifyToken from "../../apollo/Queries/verifyToken";
import { Scalars } from "../../types/generated";

const verifyTokens = async (accessToken: Scalars["Jwt"]): Promise<boolean> => {
  try {
    const result = await client.query({
      query: verifyToken,
      variables: {
        token: accessToken,
      },
    });
    return result.data.verify;
  } catch (error) {
    console.log("[Error]:Error in verify Tokens");
    throw new Error("[Error]:Error in verifing tokens", {
      cause: error,
    });
  }
};

export default verifyTokens;
