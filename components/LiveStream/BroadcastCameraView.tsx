import React, { forwardRef } from "react";
import { NodeCameraView } from "react-native-nodemediaclient";
import useLiveStreamStore from "store/LiveStreamStore";

interface Props {
	ingestURL: string;
}

export interface CameraView {
	switchCamera(): void;
	flashEnable(isEnabled: boolean): void;
	startPreview(): void;
	stopPreview(): void;
	start(): void;
	stop(): void;
}

const BroadcastCameraView = forwardRef<CameraView, Props>((props, ref) => {
	const { isFrontCamera } = useLiveStreamStore();

	return (
		<NodeCameraView
			style={{ flex: 1, width: "100%", height: "100%" }}
			ref={ref}
			outputUrl={props.ingestURL}
			camera={{ cameraId: isFrontCamera ? 1 : 0, cameraFrontMirror: true }}
			audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
			video={{
				preset: 12,
				bitrate: 400000,
				profile: 1,
				fps: 30,
				videoFrontMirror: false,
			}}
			autopreview={true}
			onStatus={(code: string, msg: string) => {
				console.log("onStatus=" + code + " msg=" + msg);
			}}
		/>
	);
});

export default BroadcastCameraView;
