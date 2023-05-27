import { LIVEPEER_API_TOKEN, LIVEPEER_API_URL } from "./../../constants/index";
async function checkIfLivePeerAsset(ipfsOrArweaveHash: string): Promise<any> {
	try {
		const livepeerResponse = await fetch(
			`${LIVEPEER_API_URL}/asset?sourceUrl=${ipfsOrArweaveHash}&phase=ready`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${LIVEPEER_API_TOKEN}`,
				},
			}
		);
		if (livepeerResponse.ok) {
			const jsonData = await livepeerResponse.json();
			return jsonData[0].playbackUrl;
		}
	} catch (error) {}
}
export default checkIfLivePeerAsset;
