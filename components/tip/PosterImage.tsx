import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet } from "react-native";
import { LayoutChangeEvent } from "react-native";
import Animated, {
	Extrapolation,
	SharedValue,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";

const posterSize = Dimensions.get("screen").height / 3;
const headerTop = 44 - 16;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const PosterImage = ({ scrollY }: { scrollY: SharedValue<number> }) => {
	const inset = useSafeAreaInsets();
	const layoutY = useSharedValue(0);
	const opacityAnim = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollY.value,
				[0, posterSize - (headerTop + inset.top) / 0.9],
				[1, 0],
				Extrapolation.CLAMP
			),
		};
	});
	const textAnim = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollY.value,
				[-posterSize / 8, 0, posterSize - (headerTop + inset.top) / 0.8],
				[0, 1, 0],
				Extrapolation.CLAMP
			),
			transform: [
				{
					scale: interpolate(
						scrollY.value,
						[-posterSize / 8, 0, (posterSize - (headerTop + inset.top)) / 2],
						[1.1, 1, 0.95],
						"clamp"
					),
				},
				{
					translateY: interpolate(
						scrollY.value,
						[layoutY.value - 1, layoutY.value, layoutY.value + 1],
						[0, 0, -1]
					),
				},
			],
		};
	});
	const scaleAnim = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: interpolate(scrollY.value, [-50, 0], [1.3, 1], {
						extrapolateLeft: "extend",
						extrapolateRight: "clamp",
					}),
				},
			],
		};
	});
	return (
		<Animated.View style={[styles.imageContainer, opacityAnim]}>
			<Animated.Image
				style={[styles.imageStyle, scaleAnim]}
				source={require("./src/assets/artist.jpeg")}
			/>
			<Animated.View
				onLayout={(event: LayoutChangeEvent) => {
					"worklet";
					layoutY.value = event.nativeEvent.layout.y;
				}}
				style={[
					{
						position: "absolute",
						bottom: 0,
						top: 0,
						length: 0,
						right: 0,
						justifyContent: "flex-end",
						alignItems: "center",
						paddingHorizontal: 12,
						zIndex: 2,
					},
					textAnim,
				]}
			>
				<Animated.Text
					numberOfLines={2}
					style={{ fontSize: 32, fontWeight: 8, color: "white", textAlign: "center" }}
				>
					John Krasinski
				</Animated.Text>
			</Animated.View>
			<AnimatedLinearGradient
				style={[{ position: "absolute" }, scaleAnim]}
				colors={[
					`rgba(0,0,0,${0})`,
					`rgba(0,0,0,${0.1})`,
					`rgba(0,0,0,${0.3})`,
					`rgba(0,0,0,${0.5})`,
					`rgba(0,0,0,${0.8})`,
					`rgba(0,0,0,${1})`,
				]}
			/>
		</Animated.View>
	);
};
const styles = StyleSheet.create({
    imageContainer: {
      height: Dimensions.get('screen').height / 2,
      width: Dimensions.get('screen').width,
      position: 'absolute',
    },
    imageStyle: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
    },
  });
  
export default PosterImage;
