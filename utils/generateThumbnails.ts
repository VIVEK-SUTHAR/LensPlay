import * as VideoThumbnails from "expo-video-thumbnails";

const generateThumbnail = async (
	url: string,
	duration: number | null | undefined
): Promise<string[] | undefined> => {
	if (typeof duration !== "number") {
		return;
	}
	const videoThumbnails: string[] = [];
	const durations: number[] = [];
	const generateDurations = (): void => {
		for (let i = 1; i <= 5; i++) {
			const item = Math.floor(duration / i);
			durations.push(item);
		}
	};
	try {
		generateDurations();
		for await (const item of durations) {
			const { uri } = await VideoThumbnails.getThumbnailAsync(url, {
				time: item,
			});
			videoThumbnails.push(uri);
		}
		return videoThumbnails;
	} catch (e) {}
};
export default generateThumbnail;
