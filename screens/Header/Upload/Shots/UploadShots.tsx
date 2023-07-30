import Icon from "components/Icon";
import React from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { Camera, CameraDevice, useCameraDevices } from "react-native-vision-camera";
import Logger from "utils/logger";

export default function UploadShots() {
	const [isBackCamera, setisBackCamera] = React.useState<boolean>(false);
	const camera = React.useRef<Camera>(null);

	async function requestPermission() {
		const newCameraPermission = await Camera.requestCameraPermission();
		const newMicrophonePermission = await Camera.requestMicrophonePermission();
	}

	React.useEffect(() => {
		requestPermission();
	}, []);

	const devices = useCameraDevices();
	const device = devices.front;

	async function startRecording() {
		camera?.current?.startRecording({
			onRecordingFinished: (video) => Logger.Count("video", video),
			onRecordingError: (error) => console.error(error),
		});
	}

	async function stopRecording() {
		await camera?.current?.stopRecording();
	}

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
				<Pressable onPress={startRecording}>
					<Icon name="camera" size={48} />
				</Pressable>
				<Pressable onPress={stopRecording}>
					<Icon name="done" size={48} />
				</Pressable>
				<Pressable
					onPress={() => {
						setisBackCamera(!isBackCamera);
					}}
				>
					<Icon name="done" size={48} />
				</Pressable>
			</View>
		</>
	);
}
