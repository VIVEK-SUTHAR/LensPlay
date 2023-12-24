import { white } from "constants/Colors";
import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { LoginSwiper } from "screens/Auth/LetsGetIn";

const Paginator = ({ data, scrollX }: { data: LoginSwiper[]; scrollX: Animated.Value }) => {
	const width = Dimensions.get("screen").width;
	return (
		<View style={{ flexDirection: "row", alignItems: "center" }}>
			{data.map((_: any, i: number) => {
				const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
				const dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [48, 48, 48],
					extrapolate: "clamp",
				});
				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.3, 1, 0.3],
					extrapolate: "clamp",
				});
				return (
					<Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={i.toString()} />
				);
			})}
		</View>
	);
};

export default Paginator;

const styles = StyleSheet.create({
	dot: {
		height: 3,
		borderRadius: 10,
		backgroundColor: white[400],
		marginHorizontal: 5,
	},
});
