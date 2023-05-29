import { LIVEPEER_API_TOKEN, LIVEPEER_API_URL } from "constants/index";

async function getLivePeerURL(assetId: string) {
	try {
		const response = await fetch(`${LIVEPEER_API_URL}/asset/${assetId}`, {
			headers: {
				Authorization: `Bearer ${LIVEPEER_API_TOKEN}`,
			},
		});
		const jsonResponse = await response.json();
		return jsonResponse.playbackUrl;
	} catch (error) {}
}
export default getLivePeerURL;
