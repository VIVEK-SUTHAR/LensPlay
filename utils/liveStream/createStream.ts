import { LIVEPEER_API_TOKEN, LIVEPEER_API_URL } from "constants/index";

async function createStream(title: string, address: string, recordStream: boolean) {
	try {
		const livepeerResponse = await fetch(`${LIVEPEER_API_URL}/stream`, {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${LIVEPEER_API_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: title,
				creatorId: address,
				record: recordStream,
			}),
		});
		if (livepeerResponse.ok) {
			const jsonData = await livepeerResponse.json();
			return jsonData;
		}
	} catch (error) {
		console.log(error);
	}
}
export default createStream;
