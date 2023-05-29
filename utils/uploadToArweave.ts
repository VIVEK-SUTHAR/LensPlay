/**
 *
 * @param commentText Content of Comment
 * @param handle lens handle of user with .lens
 * @returns id Arweave txn id
 */

import { PublicationMetadataV2Input } from "customTypes/generated";
import { ProfileMetaDataV1nput } from "customTypes/index";

async function uploadToArweave(metadata: PublicationMetadataV2Input | ProfileMetaDataV1nput) {
	try {
		const headersList = {
			"Accept": "*/*",
			"Content-Type": "application/json",
			"Authorization": "Bearer ENGINEERCANTAKEOVERWORLD",
		};

		const bodyContent = {
			metadata: metadata,
		};

		const response = await fetch(`https://lensplay-api.vercel.app/api/upload/postMetadata`, {
			method: "POST",
			body: JSON.stringify(bodyContent),
			headers: headersList,
		});
		if (response.ok) {
			const jsondata = await response.json();
			const content_hash = jsondata?.id;
			return content_hash;
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error("Something went wrong");
		}
	}
}
export default uploadToArweave;
