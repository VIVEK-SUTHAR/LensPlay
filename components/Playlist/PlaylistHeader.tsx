import { useNavigation } from "@react-navigation/native";
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

const posterSize = Dimensions.get("screen").height / 3;
const headerTop = 44 - 16;

export default function PlaylistHeader({
	scrollY,
	playlistTitle,
}: {
	scrollY: SharedValue<number>;
	playlistTitle: string;
}) {
	const navigation = useNavigation();
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
		<View style={{ position: "relative" }}>
			<Animated.View
				style={[
					{
						position: "absolute",
						width: "100%",
						paddingVertical: 16,
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "center",
						backgroundColor: black[700],
						zIndex: 1,
					},
					opacityAnim,
				]}
			>
				<Pressable
					style={{
						width: 40,
						height: 40,
						borderRadius: 50,
						backgroundColor: "rgba(255,255,255,0.1)",
						justifyContent: "center",
						alignItems: "center",
						marginHorizontal: 16,
					}}
					onPress={() => {
						navigation.goBack();
					}}
				>
					<Icon name="arrowLeft" size={24} />
				</Pressable>
				<Heading
					style={{
						color: white[700],
						fontSize: 24,
						fontWeight: "500",
					}}
					title={playlistTitle}
				/>
			</Animated.View>
		</View>
	);
}
