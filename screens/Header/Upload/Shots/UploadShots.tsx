import RecordingButton from "components/Upload/Shot/RecordingButton";
import React from "react";
import { ActivityIndicator, Linking, View } from "react-native";
import { Camera, CameraDevice, useCameraDevices } from "react-native-vision-camera";
import { useCreateShotStore } from "store/CreateShotStore";

export default function UploadShots() {
	const camera = React.useRef<Camera>(null);
	const { isBackCamera } = useCreateShotStore();
	const devices = useCameraDevices();
	const device = devices.back;

	async function requestPermission() {
		const hasCameraPermission = await Camera.getCameraPermissionStatus();
		const hasMicrophonePermission = await Camera.getMicrophonePermissionStatus();
		if (hasCameraPermission === "not-determined") {
			const newCameraPermission = await Camera.requestCameraPermission();
			if (newCameraPermission === "denied") {
				Linking.openSettings();
			}
		}
		if (hasMicrophonePermission === "not-determined") {
			const newMicrophonePermission = await Camera.requestMicrophonePermission();
			if (newMicrophonePermission === "denied") {
				Linking.openSettings();
			}
		}
	}

	React.useEffect(() => {
		requestPermission();
	}, []);

	if (device == null) return <ActivityIndicator />;
	return (
		<>
			<Camera
				ref={camera}
				style={{
					position: "absolute",
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
				}}
				device={isBackCamera ? (devices.back as CameraDevice) : (devices.front as CameraDevice)}
				isActive={true}
				video={true}
				enableZoomGesture={true}
			/>
			<View
				style={{
					position: "absolute",
					bottom: 48,
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					flexDirection: "row",
					gap: 32,
				}}
			>
				<RecordingButton ref={camera} />
			</View>
		</>
	);
}
