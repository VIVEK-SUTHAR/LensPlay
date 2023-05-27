import { LIVEPEER_API_TOKEN, LIVEPEER_API_URL } from "./../../constants/index";
async function createLivePeerAsset(fileUrl: string): Promise<any> {
	try {
		const livepeerResponse = await fetch(`${LIVEPEER_API_URL}/asset/import`, {
			method: "POST",
			body: JSON.stringify({
				url: fileUrl,
				name: fileUrl,
			}),
			headers: {
				"Authorization": `Bearer ${LIVEPEER_API_TOKEN}`,
				"Content-Type": "application/json",
			},
		});
		if (livepeerResponse.ok) {
			const jsonData = await livepeerResponse.json();
			return jsonData.asset.playbackId;
		}
	} catch (error) {
		console.log(error);
	}
}
export default createLivePeerAsset;
