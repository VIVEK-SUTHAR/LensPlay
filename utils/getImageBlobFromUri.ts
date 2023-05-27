/**
 *
 * @param uri local uri of image
 * @returns blob of image
 */

const getImageBlobFromUri = async (uri: string): Promise<Blob | undefined> => {
	try {
		const response = await fetch(uri);
		const blob = await response.blob();
		return blob;
	} catch (error) {
		if (error instanceof Error) {
			// console.log(error);
		}
	}
};
export default getImageBlobFromUri;
