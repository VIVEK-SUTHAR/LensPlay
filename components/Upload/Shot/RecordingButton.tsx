import React from "react";
import { Pressable, View } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useCreateShotStore } from "store/CreateShotStore";

const RecordingButton = React.forwardRef((props, ref) => {
	const { setIsRecording, isRecording } = useCreateShotStore();
	const animatedStyles = useAnimatedStyle(() => {
		if (isRecording) {
			return {
				width: withTiming("80%"),
				height: withTiming("80%"),
				borderRadius: withTiming(8),
			};
		} else {
			return {
				width: withTiming("100%"),
				height: withTiming("100%"),
				borderRadius: withTiming(100),
			};
		}
	}, [isRecording]);

	// async function startRecording() {
	// 	ref?.current?.startRecording({
	// 		onRecordingFinished: (video) => Logger.Count("video", video),
	// 		onRecordingError: (error) => Logger.Error("error", error),
	// 	});
	// }

	// async function stopRecording() {
	// 	await ref?.current?.stopRecording();
	// }

	return (
		<Pressable
			onPress={() => {
				setIsRecording(!isRecording);
			}}
		>
			<View
				style={{
					height: 72,
					width: 72,
					borderWidth: 4,
					borderColor: "white",
					borderRadius: 100,
					padding: 8,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Animated.View
					style={[
						{
							backgroundColor: "red",
						},
						animatedStyles,
					]}
				/>
			</View>
		</Pressable>
	);
});

export default RecordingButton;
