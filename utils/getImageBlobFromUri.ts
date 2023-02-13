/**
 *
 * @param uri local uri of image
 * @returns blob of image
 */

const getImageBlobFromUri = async (uri: string) => {
	const response = await fetch(uri);
	const blob = await response.blob();
	return blob;
};
export default getImageBlobFromUri;
