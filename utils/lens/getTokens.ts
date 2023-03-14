import { client } from "../../apollo/client";
import {
  AuthenticateDocument,
  AuthenticationResult,
  SignedAuthChallenge,
} from "../../types/generated";

const getTokens = async (
  request: SignedAuthChallenge
): Promise<AuthenticationResult | undefined> => {
  try {
    const result = await client.mutate({
      mutation: AuthenticateDocument,
      variables: {
        request,
      },
    });

    return result.data!.authenticate;
  } catch (error) {
    if (error instanceof Error) {
      console.log("[Error]:Error in authencitating ");
      throw new Error("[Error]:Error in authencitating ", {
        cause: error.message,
      });
    }
  }
};
export default getTokens;
