/**
 *
 * @param imageBlob Blob of Image
 * @returns CID of image
 */

import { IPFS_UPLOAD_API } from "../constants";

const API_TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQzQjZCNEYwMjIzQzNBYUJhYTNGY2FjNzc4QkYzZTcwMzk4MjZDMTEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzYyNjY2NjY2ODIsIm5hbWUiOiJMZW5zUGxheSJ9.yvvWPFyduWg6vQ1H1_TXTpMKlHTUcqnx4Int8vuMdec";

const uploadImageToIPFS = async (imageBlob: Blob | undefined): Promise<string> => {
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
export default uploadImageToIPFS;
