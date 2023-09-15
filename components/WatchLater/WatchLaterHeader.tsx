import { useNavigation } from "@react-navigation/native";
import ArrowLeft from "assets/Icons/ArrowLeft";
import Icon from "components/Icon";
import Heading from "components/UI/Heading";
import { black, white } from "constants/Colors";
import React from "react";
import { Dimensions, Pressable, View } from "react-native";
import Animated, {
	Extrapolation,
	SharedValue,
	interpolate,
	useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WatchLaterHeader({
	playlistTitle,
	scrollY,
}: {
	playlistTitle: string;
	scrollY: SharedValue<number>;
}) {
	const navigation = useNavigation();
	const StatusBar = useSafeAreaInsets();
	const posterSize = Dimensions.get("screen").height / 3;
	const headerTop = 44 - 16;
	const inset = useSafeAreaInsets();
	const opacityAnim = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollY.value,
				[
					((posterSize - (headerTop + inset.top)) / 4) * 3,
					posterSize - (headerTop + inset.top) + 1,
				],
				[0, 1]
			),
			transform: [
				{
					scale: interpolate(
						scrollY.value,
						[
							((posterSize - (headerTop + inset.top)) / 4) * 3,
							posterSize - (headerTop + inset.top) + 1,
						],
						[0.98, 1],
						Extrapolation.CLAMP
					),
				},
				{
					translateY: interpolate(
						scrollY.value,
						[
							((posterSize - (headerTop + inset.top)) / 4) * 3,
							posterSize - (headerTop + inset.top) + 1,
						],
						[-10, 0],
						Extrapolation.CLAMP
					),
				},
			],
			paddingTop: inset.top === 0 ? 8 : inset.top,
		};
	});
	return (
		<Animated.View
			style={[
				{
					position: "absolute",
					width: "100%",
					flexDirection: "row",
					paddingVertical: 16,
					justifyContent: "flex-start",
					alignItems: "center",
					backgroundColor: black[800],
					zIndex: 1,
				},
				opacityAnim,
			]}
		>
			<Pressable
				style={{
					width: 30,
					height: 30,
					justifyContent: "center",
					alignItems: "center",
					marginHorizontal: 8,
				}}
				onPress={() => {
					navigation.goBack();
				}}
			>
				<ArrowLeft width={16} height={16} />
			</Pressable>
			<Heading
				style={{
					color: white[700],
					fontSize: 20,
					fontWeight: "500",
				}}
				title={playlistTitle}
			/>
		</Animated.View>
	);
}
