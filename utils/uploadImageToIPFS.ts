/**
 *
 * @param imageBlob Blob of Image
 * @returns CID of image
 */

import { IPFS_UPLOAD_API } from "constants/index";
import crashlytics from "@react-native-firebase/crashlytics";
import Logger from "./logger";

const API_TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQzQjZCNEYwMjIzQzNBYUJhYTNGY2FjNzc4QkYzZTcwMzk4MjZDMTEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzYyNjY2NjY2ODIsIm5hbWUiOiJMZW5zUGxheSJ9.yvvWPFyduWg6vQ1H1_TXTpMKlHTUcqnx4Int8vuMdec";
export const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQwOTEyQjg5NDQwY0I3MkE5MDMzYjRFQTk2MkFkMDk5NmZiQTUyM2MiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODkzMzIyMzE3MjcsIm5hbWUiOiJMZW5zUGxheSJ9._O3rE11FWdy0UyKBFKruTbkTQfpvE6CxNcU_kcdedsM";
const uploadImageToIPFS = async (imageBlob: Blob | undefined): Promise<string> => {
	try {
		const headersList = {
			Authorization: `Bearer ${TOKEN}`,
		};
		const filehash = await fetch(IPFS_UPLOAD_API, {
			method: "POST",
			headers: headersList,
			body: imageBlob,
		});
		const data = await filehash.json();
		Logger.Log('upload data', data);
		return data.cid;
	} catch (error) {
		if (error instanceof Error) {
			Logger.Log("Error in uploading image to ipfs:", error);
			crashlytics().log("Error in uploading image to ipfs:" + error.message);
		}
		throw new Error("Something went wrong");
	}
};
export default uploadImageToIPFS;
