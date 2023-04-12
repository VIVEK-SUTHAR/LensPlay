import { LIVEPEER_API_TOKEN } from "./../../constants/index";
import { LIVEPEER_API_URL } from "../../constants";

async function getLivePeerURL(assetId: string) {
  try {
    const response = await fetch(`${LIVEPEER_API_URL}/asset/${assetId}`, {
      headers: {
        Authorization: `Bearer ${LIVEPEER_API_TOKEN}`,
      },
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);

    return jsonResponse.playbackUrl;
  } catch (error) {}
}
export default getLivePeerURL