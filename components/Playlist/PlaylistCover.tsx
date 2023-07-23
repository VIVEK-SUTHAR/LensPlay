import Play from "assets/Icons/Play";
import Heading from "components/UI/Heading";
import { white } from "constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, LayoutChangeEvent, StyleSheet, View } from "react-native";
import Animated, {
	Extrapolation,
	SharedValue,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const posterSize = Dimensions.get("screen").height / 3;
const headerTop = 44 - 16;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function PlaylistCover({
	scrollY,
	coverLink,
	playlistTitle,
}: {
	scrollY: SharedValue<number>;
	coverLink: string;
	playlistTitle: string;
}) {
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
				<Animated.Image style={[styles.imageStyle, scaleAnim]} source={{ uri: coverLink }} />
				<Animated.View
					onLayout={(event: LayoutChangeEvent) => {
						"worklet";
						layoutY.value = event.nativeEvent.layout.y;
					}}
					style={[
						{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: -10,
							justifyContent: "space-between",
							alignItems: "flex-end",
							paddingHorizontal: 18,
							zIndex: 10,
							flexDirection: "row",
						},
						textAnim,
					]}
				>
					<Heading
						style={{
							fontSize: 36,
							color: white[700],
							fontWeight: "600",
						}}
						title={playlistTitle}
					/>
					<Play height={48} width={48} />
				</Animated.View>
				<AnimatedLinearGradient
					style={[
						{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
						},
						scaleAnim,
					]}
					colors={[
						`rgba(0,0,0,${0})`,
						`rgba(0,0,0,${0.2})`,
						`rgba(0,0,0,${0.4})`,
						`rgba(0,0,0,${0.6})`,
						`rgba(0,0,0,${0.8})`,
						`rgba(0,0,0,${1})`,
					]}
				/>
			</Animated.View>
	);
}

const styles = StyleSheet.create({
	imageContainer: {
		height: Dimensions.get("screen").height / 3,
		width: Dimensions.get("screen").width,
		position: "absolute",
	},
	imageStyle: {
		height: "100%",
		width: "100%",
		resizeMode: "cover",
	},
});
