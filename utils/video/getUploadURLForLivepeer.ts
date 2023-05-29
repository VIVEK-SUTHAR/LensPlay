import { LIVEPEER_API_TOKEN, LIVEPEER_API_URL } from "constants/index";
import { v4 as uuidV4 } from "uuid";
interface UploadToLivePeerResult {
	assetId: string;
	tusEndpoint: string;
}
/**
 *
 * @returns UploadToLivePeerResult,which contains `assetId:uniqueId of asset in livepeer` and `tusEndpoint:a url to use for tus-upload`
 */
async function getUploadURLForLivePeer(): Promise<UploadToLivePeerResult> {
	try {
		const bodyContent = JSON.stringify({ name: uuidV4() });

		const headersList = {
			"Authorization": `Bearer ${LIVEPEER_API_TOKEN}`,
			"Content-Type": "application/json",
		};

		const requestUploadURL = await fetch(`${LIVEPEER_API_URL}/asset/request-upload`, {
			method: "POST",
			headers: headersList,
			body: bodyContent,
		});
		if (!requestUploadURL.ok) {
			throw new Error("Somethingwent wrong.");
		}
		const jsonResponse = await requestUploadURL.json();
		const tusEndpoint = jsonResponse?.tusEndpoint;
		const assetId = jsonResponse?.asset?.id;
		return {
			assetId,
			tusEndpoint,
		};
	} catch (error) {
		throw new Error("Please try again");
	}
}
export default getUploadURLForLivePeer;
