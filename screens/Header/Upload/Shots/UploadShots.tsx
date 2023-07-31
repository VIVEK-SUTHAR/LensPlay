import RecordingButton from "components/Upload/Shot/RecordingButton";
import ShotControllers from "components/Upload/Shot/ShotControllers";
import ZoomController from "components/Upload/Shot/ZoomController";
import React from "react";
import { ActivityIndicator, Dimensions, Linking, StyleSheet, View } from "react-native";
import Reanimated, { useAnimatedProps, useSharedValue } from "react-native-reanimated";

import { Camera, CameraDevice, CameraProps, useCameraDevices } from "react-native-vision-camera";
import { useCreateShotStore } from "store/CreateShotStore";

const AnimatedCamera = Reanimated.createAnimatedComponent(Camera);

Reanimated.addWhitelistedNativeProps({
	zoom: true,
});

const { height } = Dimensions.get("window");

export default function UploadShots() {
	const camera = React.useRef<Camera>(null);
	const { isBackCamera, isFlashOn, isMute } = useCreateShotStore();
	const devices = useCameraDevices();
	const device = devices?.back;
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

	const zoom = useSharedValue(0);

	const animatedProps = useAnimatedProps<Partial<CameraProps>>(
		() => ({ zoom: zoom.value }),
		[zoom]
	);

	if (device == null) return <ActivityIndicator />;

	return (
		<>
			<AnimatedCamera
				ref={camera}
				style={StyleSheet.absoluteFill}
				device={isBackCamera ? (devices.back as CameraDevice) : (devices.front as CameraDevice)}
				isActive={true}
				video={true}
				audio={isMute ? false : true}
				torch={isFlashOn ? "on" : "off"}
				animatedProps={animatedProps}
			/>
			<ZoomController zoomValue={zoom} maxZoomValue={device.maxZoom} />
			<View style={styles.recordBtnContainer}>
				<RecordingButton ref={camera} />
			</View>
			<View style={styles.videoControllersContainer}>
				<ShotControllers />
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	recordBtnContainer: {
		position: "absolute",
		bottom: 48,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	videoControllersContainer: {
		position: "absolute",
		top: height / 10,
		right: 16,
		justifyContent: "center",
		alignItems: "center",
	},
});
