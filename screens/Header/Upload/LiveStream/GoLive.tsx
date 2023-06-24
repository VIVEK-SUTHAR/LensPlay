import CameraSwitch from "assets/Icons/CameraSwitch";
import FlashOFF from "assets/Icons/FlashOFF";
import FlashON from "assets/Icons/FlashON";
import Record from "assets/Icons/Record";
import BroadcastCameraView, { CameraView } from "components/LiveStream/BroadcastCameraView";
import { RootStackScreenProps } from "customTypes/navigation";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useLiveStreamStore from "store/LiveStreamStore";

export default function GoLive({ navigation }: RootStackScreenProps<"GoLive">) {
	const cameraView = React.useRef<CameraView>(null);
	const { streamKey, isFrontCamera, setIsFrontCamera, isFlashON, setIsFlashON } =
		useLiveStreamStore();

	React.useEffect(() => {
		if (streamKey) {
			cameraView.current?.start();
		}
	}, []);

	const stopStreaming = () => {
		cameraView.current?.stop();
		navigation.replace("Root");
	};

	const handleSwitchCamera = () => {
		setIsFrontCamera(!isFrontCamera);
		cameraView.current?.switchCamera();
	};

	const handleFlash = () => {
		setIsFlashON(!isFlashON);
		cameraView.current?.flashEnable(!isFlashON);
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
					onPress={handleFlash}
					activeOpacity={0.5}
				>
					{isFlashON ? <FlashOFF height={24} width={24} /> : <FlashON height={24} width={24} />}
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
