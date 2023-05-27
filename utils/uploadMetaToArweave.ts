/**
 *
 * @param commentText Content of Comment
 * @param handle lens handle of user with .lens
 * @returns id Arweave txn id
 */

async function uploadMetaDataToArweave(
	commentText: string,
	handle: string | undefined
): Promise<string | undefined> {
	try {
		const headersList = {
			"Accept": "*/*",
			"Content-Type": "application/json",
			"Authorization": "Bearer ENGINEERCANTAKEOVERWORLD",
		};

		const bodyContent = JSON.stringify({
			commentText,
			handle,
		});

		const response = await fetch("https://lensplay-api.vercel.app/api/upload/metadata", {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});
		if (response.ok) {
			const jsondata = await response.json();
			const contentUri = `https://arweave.net/${jsondata.id as string}`;
			return contentUri;
		}
	} catch (err) {
		if (err instanceof Error) {
			// throw new Error("Something went wromg", { cause: err });
		}
	}
}
export default uploadMetaDataToArweave;
