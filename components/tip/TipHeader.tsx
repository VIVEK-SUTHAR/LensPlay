import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { black, white } from 'constants/Colors';
import { Pressable } from 'react-native';
import Icon from 'components/Icon';
import Heading from 'components/UI/Heading';

type Props = {}

const posterSize = Dimensions.get("screen").height / 3;
const headerTop = 44 - 16;

const TipHeader = ({ scrollY}: { scrollY: SharedValue<number>}) => {
    const navigation=useNavigation();
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
          marginHorizontal:16
				}}
        onPress={()=>{
          navigation.goBack();
        }}
			>
				<Icon name="arrowLeft" size={24} />
			</Pressable>
			{/* <Heading
				style={{
					color: white[700],
					fontSize: 24,
					fontWeight: "500",
				}}
				title={playlistTitle}
			/> */}
		</Animated.View>
	);

}

export default TipHeader

const styles = StyleSheet.create({})