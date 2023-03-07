/**
 *
 * @param commentText Content of Comment
 * @param handle lens handle of user with .lens
 * @returns id Arweave txn id
 */

import { BUNDLR_UPLOAD_API } from "../constants";

async function uploadMetaDataToArweave(commentText: string, handle: string | undefined) {
	try {
		const headersList = {
			"Accept": "*/*",
			"Content-Type": "application/json",
		};

		const bodyContent = JSON.stringify({
			commentText: commentText,
			handle: handle,
		});

		const response = await fetch(`${BUNDLR_UPLOAD_API}/metadata`, {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});
		if (response.ok) {
			const jsondata = await response.json();
			const content_uri = `https://arweave.net/${jsondata.id}`;
			return content_uri;
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error("Something went wromg", { cause: err });
		}
	}
}
export default uploadMetaDataToArweave;
