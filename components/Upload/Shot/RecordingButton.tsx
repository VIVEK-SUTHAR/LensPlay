import React, { RefObject } from "react";
import { View } from "react-native";
import { Camera } from "react-native-vision-camera";
import Logger from "utils/logger";

export default function RecordingButton({ ref }: { ref: RefObject<Camera> }) {
	async function startRecording() {
		ref?.current?.startRecording({
			onRecordingFinished: (video) => Logger.Count("video", video),
			onRecordingError: (error) => Logger.Error("error", error),
		});
	}

	async function stopRecording() {
		await ref?.current?.stopRecording();
	}

	return <View></View>;
}
