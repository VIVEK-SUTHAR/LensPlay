/* eslint-disable no-undef */
import getFileName from './video/getFileName';
import getFileMimeType from './video/getFileType';

describe('getFileType util', () => {
	const videoPath =
		'file:///data/user/0/com.lensplayxyz.lensplay/cache/ImagePicker/ccf47c79-d346-4a51-b50f-fff3d6f8152d.mp4';
	test('video mime type should be mp4', () => {
		const videoOutput = 'mp4';
		const testResult = getFileMimeType(videoPath);
		expect(testResult).toBe(videoOutput);
		const imagePath =
			'file:///data/user/0/com.lensplayxyz.lensplay/cache/VideoThumbnails/24158787-b55c-4e2d-916c-53c58b00d846.jpg';
		const imageOutput = 'jpg';
		const testImageResult = getFileMimeType(imagePath);
		expect(testImageResult).toBe(imageOutput);
	});
});

describe('getFilename util', () => {
	const path =
		'file:///data/user/0/com.lensplayxyz.lensplay/cache/ImagePicker/ccf47c79-d346-4a51-b50f-fff3d6f8152d.mp4';
	test('video filename should be ccf47c79-d346-4a51-b50f-fff3d6f8152d', () => {
		const output = 'ccf47c79-d346-4a51-b50f-fff3d6f8152d';
		const tesResult = getFileName(path);
		expect(tesResult).toBe(output);
	});
});
