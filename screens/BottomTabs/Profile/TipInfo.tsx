import { LayoutChangeEvent, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Avatar from "components/UI/Avatar";
import Heading from "components/UI/Heading";
import Animated, {
	Extrapolation,
	SharedValue,
	event,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import Transaction from "components/tip/Transaction";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import TipHeader from "components/tip/TipHeader";

type Props = {};
const posterSize = Dimensions.get("screen").height / 3;
const headerTop = 44 - 16;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const TipInfo = () => {
	// const posterSize = Dimensions.get("screen").height / 2;

	const scrollY = useSharedValue<number>(0);
	const navigation = useNavigation();
	const inset = useSafeAreaInsets();

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			"worklet";
			scrollY.value = event.contentOffset.y;
		},
	});
	// const layoutY = useSharedValue(0);
	// const opacityAnim = useAnimatedStyle(() => {
	// 	return {
	// 		opacity: interpolate(
	// 			scrollY.value,
	// 			[
	// 				((posterSize - (headerTop + inset.top)) / 4) * 3,
	// 				posterSize - (headerTop + inset.top) + 1,
	// 			],
	// 			[0, 1]
	// 		),
	// 		transform: [
	// 			{
	// 				scale: interpolate(
	// 					scrollY.value,
	// 					[
	// 						((posterSize - (headerTop + inset.top)) / 4) * 3,
	// 						posterSize - (headerTop + inset.top) + 1,
	// 					],
	// 					[0.98, 1],
	// 					Extrapolation.CLAMP
	// 				),
	// 			},
	// 			{
	// 				translateY: interpolate(
	// 					scrollY.value,
	// 					[
	// 						((posterSize - (headerTop + inset.top)) / 4) * 3,
	// 						posterSize - (headerTop + inset.top) + 1,
	// 					],
	// 					[-10, 0],
	// 					Extrapolation.CLAMP
	// 				),
	// 			},
	// 		],
	// 		paddingTop: inset.top === 0 ? 8 : inset.top,
	// 	};
	// });

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
		>
			<TipHeader scrollY={scrollY} />
			<View style={{ flex: 1, flexDirection: "column" }}>
				<PosterImage scrollY={scrollY} />
				<ScrollView onScroll={scrollHandler} style={{ flex: 0.6, backgroundColor: "black" }}>
						<Transaction />
						<Transaction />
						<Transaction />
						<Transaction />
						<Transaction />
						<Transaction />
						<Transaction />
						<Transaction />
						<Transaction />
						<Transaction />
						<Transaction />
						<Transaction />
						<Transaction />
						<Transaction />
						<Transaction />
						<Transaction />
						<Transaction />
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default TipInfo;

type AnimationProps = {
	sv: any;
};

const PosterImage = ({ sv }: AnimationProps) => {
	const posterSize = Dimensions.get("screen").height / 2;
	const inset = useSafeAreaInsets();
	const layoutY = useSharedValue(0);
	const headerTop = Dimensions.get("screen").height / 20;
	const opacityAnim = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				sv.value,
				[0, posterSize - (headerTop + inset.top) / 0.9],
				[1, 0],
				Extrapolation.CLAMP
			),
		};
	});
	const textAnim = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				sv.value,
				[-posterSize / 8, 0, posterSize - (headerTop + inset.top) / 0.8],
				[0, 1, 0],
				Extrapolation.CLAMP
			),
			transform: [
				{
					scale: interpolate(
						sv.value,
						[-posterSize / 8, 0, (posterSize - (headerTop + inset.top)) / 2],
						[1.1, 1, 0.95],
						Extrapolation.CLAMP
					),
				},
				{
					translateY: interpolate(
						sv.value,
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
					scale: interpolate(sv.value, [-50, 0], [1.3, 1], {
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
				style={[scaleAnim, { height: 200, width: 200 }]}
				source={require("../../../assets/images/circle.webp")}
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
						left: 0,
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
					style={{
						fontSize: 44,
						fontWeight: 20,
						textAlign: "center",
						alignSelf: "center",
						color: "white",
					}}
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
	Linear: {
		position: "absolute",
	},
	imageContainer: {
		width: "100%",
		height: "100%",
	},
});
