import CameraSwitch from "assets/Icons/CameraSwitch";
import Mic from "assets/Icons/Mic";
import Mute from "assets/Icons/Mute";
import Record from "assets/Icons/Record";
import BroadcastCameraView, { CameraView } from "components/LiveStream/BroadcastCameraView";
import { RootStackScreenProps } from "customTypes/navigation";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { PermissionsAndroid, Pressable, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useLiveStreamStore from "store/LiveStreamStore";

export default function GoLive({ navigation }: RootStackScreenProps<"GoLive">) {
	const cameraView = React.useRef<CameraView>(null);
	const { streamKey, isMute, setIsMute, isFrontCamera, setIsFrontCamera } = useLiveStreamStore();
	const requestCameraPermission = async () => {
		try {
			const granted = await PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.CAMERA,
				PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
			]);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("You can use the camera");
			} else {
				console.log("Camera permission denied");
			}
		} catch (err) {
			console.warn(err);
		}
	};

	React.useEffect(() => {
		requestCameraPermission();
		cameraView.current?.start();
	}, []);

	const stopStreaming = () => {
		cameraView.current?.stop();
		navigation.replace("Root");
	};

	const handleSwitchCamera = () => {
		setIsFrontCamera(!isFrontCamera);
	};

	const handleMute = () => {
		setIsMute(!isMute);
	};

	return (
		<View
			style={{
				flex: 1,
				position: "relative",
			}}
		>
			<BroadcastCameraView
				ref={cameraView}
				ingestURL={`rtmp://rtmp.livepeer.com/live/${streamKey}`}
			/>
			<LinearGradient
				colors={["transparent", "rgba(0,0,0,0.6)"]}
				style={{
					position: "absolute",
					bottom: 0,
					height: 150,
					width: "100%",
					flexDirection: "row",
					justifyContent: "space-around",
					alignItems: "center",
				}}
			>
				<TouchableOpacity
					style={{
						padding: 12,
						backgroundColor: "white",
						borderRadius: 100,
					}}
					onPress={handleMute}
					activeOpacity={0.5}
				>
					{isMute ? <Mute height={24} width={24} /> : <Mic height={24} width={24} />}
				</TouchableOpacity>
				<TouchableOpacity onPress={stopStreaming} activeOpacity={0.5}>
					<Record height={80} width={80} />
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						padding: 12,
						backgroundColor: "white",
						borderRadius: 100,
					}}
					onPress={handleSwitchCamera}
					activeOpacity={0.5}
				>
					<CameraSwitch height={24} width={24} />
				</TouchableOpacity>
			</LinearGradient>
		</View>
	);
}
