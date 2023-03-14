import { client } from "../../apollo/client";
import {
  AuthChallengeResult,
  ChallengeDocument,
  ChallengeRequest,
} from "../../types/generated";

const generateChallenge = async (
  request: ChallengeRequest
): Promise<AuthChallengeResult | undefined> => {
  try {
    const result = await client.query({
      query: ChallengeDocument,
      variables: {
        request,
      },
    });

    return result.data.challenge;
  } catch (error) {
    if (error instanceof Error) {
      console.log("[Error]:Error in generating challenge text");
    }
  }
};

export default generateChallenge;
