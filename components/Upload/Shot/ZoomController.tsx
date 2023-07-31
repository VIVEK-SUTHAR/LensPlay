import Slider from "@react-native-community/slider";
import { white } from "constants/Colors";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";

type Props = {
	zoomValue: SharedValue<number>;
	maxZoomValue?: number;
};

const { height, width } = Dimensions.get("window");

const ZoomController = ({ maxZoomValue = 16, zoomValue }: Props) => {
	const onZoomSliderValueChange = React.useCallback((currentValue: number) => {
		zoomValue.value = currentValue;
	}, []);

	return (
		<View style={styles.zoomControlContainer}>
			<Slider
				style={styles.slider}
				thumbTintColor={white[700]}
				onValueChange={onZoomSliderValueChange}
				minimumValue={1}
				maximumValue={maxZoomValue}
				minimumTrackTintColor={white[600]}
				maximumTrackTintColor={white[600]}
			/>
		</View>
	);
};

export default ZoomController;

const styles = StyleSheet.create({
	zoomControlContainer: {
		position: "absolute",
		left: width * 0.02,
		top: 45,
		height: height / 1.2,
		justifyContent: "center",
		width: 45,
		alignItems: "center",
	},
	slider: {
		flex: 1,
		paddingHorizontal: 10,
		zIndex: 10,
		width: width,
		transform: [
			{
				rotate: "-90deg",
			},
		],
	},
});
