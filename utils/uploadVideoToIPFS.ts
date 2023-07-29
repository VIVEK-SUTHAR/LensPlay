/**
 *
 * @param imageBlob Blob of Image
 * @returns CID of image
 */

import { IPFS_UPLOAD_API } from "constants/index";

const API_TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGY2RmYyMWNDMDcyNTEzOGY1YjMyMzhhRjk5NWI2RGVDNDdFNDZGMTUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODA1MjUzMjMxMDAsIm5hbWUiOiJ2aWRlb3Rlc3QifQ.xqaXALtnSPPPe4fo4gwN8IsD3lzwiTwLL0lQfjNE1jQ";

const uploadVideoToIPFS = async (imageBlob: Blob | undefined): Promise<string> => {
	try {
		const headersList = {
			Authorization: `Bearer ${API_TOKEN}`,
		};
		const filehash = await fetch(IPFS_UPLOAD_API, {
			method: "POST",
			headers: headersList,
			body: imageBlob,
		});
		const data = await filehash.json();
		return data.cid;
	} catch (error) {
		throw new Error("Something went wrong");
	}
};
export default uploadVideoToIPFS;
