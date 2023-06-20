import StyledText from "components/UI/StyledText";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
	useAnimatedProps,
	useSharedValue,
	withRepeat,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { useThemeStore, useToast } from "store/Store";
import { useUploadStore } from "store/UploadStore";
type UploadIndicatorProps = {
	radius?: number;
	strokeWidth?: number;
	progress: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const UploadIndicator = () => {
	const [p, setP] = useState(0);
	useEffect(() => {
		const clear = setInterval(() => {
			setP((p) => p + 0.1);
		}, 500);
		return () => {
			clearInterval(clear);
		};
	}, []);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "black",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularIndicator progress={p} />
			<UploadStatus />
		</View>
	);
};

export default UploadIndicator;

export const CircularIndicator = ({
	progress,
	radius = 100,
	strokeWidth = 25,
}: UploadIndicatorProps) => {
	const theme = useThemeStore();

	const innerRadius = radius - strokeWidth / 2;
	const circumference = 2 * Math.PI * innerRadius;

	const fill = useSharedValue(0);

	useEffect(() => {
		fill.value = withSpring(progress, {
			mass: 1,
			overshootClamping: true,
			stiffness: 1,
			damping: 2,
		});
	}, [progress]);

	const rotation = useSharedValue(0);

	useEffect(() => {
		rotation.value = withRepeat(
			withTiming(360, {
				duration: 2000,
			}),
			-1,
			true
		);
	}, []);

	const animatedProps = useAnimatedProps(() => ({
		strokeDasharray: [circumference * 0.25, circumference * 0.25],
		strokeDashoffset: (rotation.value * (Math.PI * innerRadius)) / 180,
	}));

	return (
		<View
			style={{
				width: radius * 2,
				height: radius * 2,
				alignSelf: "center",
			}}
		>
			<Svg>
				<Circle
					r={innerRadius}
					cx={radius}
					cy={radius}
					stroke={theme.PRIMARY}
					strokeWidth={strokeWidth}
					opacity={0.2}
				/>
				<AnimatedCircle
					animatedProps={animatedProps}
					r={innerRadius}
					cx={radius}
					cy={radius}
					stroke={theme.PRIMARY}
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					originX={radius}
					originY={radius}
				/>
			</Svg>
		</View>
	);
};

const UploadStatus = () => {
	const uploadStore = useUploadStore();
	const isUploading = uploadStore.uploadingStatus === "UPLOADING";
	const isProcessing = uploadStore.uploadingStatus === "PROCCESSING";
	const toast = useToast();
	useEffect(() => {
		uploadStore.setUploadingStatus("PROCCESSING");

		setTimeout(() => {
			uploadStore.setUploadingStatus("UPLOADING");
		}, 5000);
		setTimeout(() => {
			toast.success("Video Uploaded !");
			uploadStore.setUploadingStatus(null);
		}, 10000);
	}, []);

	return (
		<>
			{isProcessing ? (
				<StyledText
					title="Uploading COver Image and Video.... "
					style={{
						color: "white",
						fontWeight: "600",
						fontSize: 18,
					}}
				/>
			) : null}
			{isUploading ? (
				<StyledText
					title="Posting to Lens..."
					style={{
						fontSize: 20,
						marginVertical: 8,
						color: "white",
						fontWeight: "600",
					}}
				/>
			) : null}
		</>
	);
};

const styles = StyleSheet.create({});
