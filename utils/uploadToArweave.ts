/**
 *
 * @param commentText Content of Comment
 * @param handle lens handle of user with .lens
 * @returns id Arweave txn id
 */

import { type ProfileMetaDataV1nput } from "../types";
import { type PublicationMetadataV2Input } from "../types/generated";

async function uploadToArweave(
	metadata: PublicationMetadataV2Input | ProfileMetaDataV1nput
): Promise<any> {
	try {
		const headersList = {
			"Accept": "*/*",
			"Content-Type": "application/json",
			"Authorization": "Bearer ENGINEERCANTAKEOVERWORLD",
		};

		const bodyContent = {
			metadata,
		};

		const response = await fetch("https://lensplay-api.vercel.app/api/upload/postMetadata", {
			method: "POST",
			body: JSON.stringify(bodyContent),
			headers: headersList,
		});
		if (response.ok) {
			const jsondata = await response.json();
			const contentHash = jsondata?.id;
			return contentHash;
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error("Something went wrong");
		}
	}
}
export default uploadToArweave;
