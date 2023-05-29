import * as fs from "expo-file-system";

async function getFileSize(uri: string): Promise<number | undefined> {
	try {
		const fileInfo = await fs.getInfoAsync(uri, { size: true });
		const size = fileInfo.size;
		return size;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}
export default getFileSize;
