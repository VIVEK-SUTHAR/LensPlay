import getFileName from "./video/getFileName";
import getFileMimeType from "./video/getFileType";

describe("getFileType util", () => {
	const video_path =
		"file:///data/user/0/com.lensplayxyz.lensplay/cache/ImagePicker/ccf47c79-d346-4a51-b50f-fff3d6f8152d.mp4";
	test("video mime type should be mp4", () => {
		const video_output = "mp4";
		const test_result = getFileMimeType(video_path);
		expect(test_result).toBe(video_output);
		const image_path =
			"file:///data/user/0/com.lensplayxyz.lensplay/cache/VideoThumbnails/24158787-b55c-4e2d-916c-53c58b00d846.jpg";
		const image_output = "jpg";
		const test_image_result = getFileMimeType(image_path);
		expect(test_image_result).toBe(image_output);
	});
});

describe("getFilename util", () => {
	const path =
		"file:///data/user/0/com.lensplayxyz.lensplay/cache/ImagePicker/ccf47c79-d346-4a51-b50f-fff3d6f8152d.mp4";
	test("video filename should be ccf47c79-d346-4a51-b50f-fff3d6f8152d", () => {
		const output = "ccf47c79-d346-4a51-b50f-fff3d6f8152d";
		const test_result = getFileName(path);
		expect(test_result).toBe(output);
	});
});
