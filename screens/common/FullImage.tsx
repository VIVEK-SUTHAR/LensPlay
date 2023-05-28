import Constants from "expo-constants";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
	Animated,
	ColorValue,
	PanResponder,
	Pressable,
	SafeAreaView,
	StyleSheet,
	View,
} from "react-native";
import Icon from "../../components/Icon";
import { RootStackScreenProps } from "../../types/navigation/types";
import getIPFSLink from "../../utils/getIPFSLink";
import getPlaceHolderImage from "../../utils/getPlaceHolder";
import { useBgColorStore } from "../../store/BgColorStore";
import Logger from "../../utils/logger";
import getImageProxyURL from "../../utils/getImageProxyURL";
const StatusBarHeight = Constants.statusBarHeight;

const FullImage = ({ navigation, route }: RootStackScreenProps<"FullImage">) => {
	const isAvatar = route.params.source === "avatar";
	const [bgColor, setBgColor] = useState<ColorValue>("rgba(0,0,0,1)");
	const { cover, avatar } = useBgColorStore();

	const goBack = () => navigation.goBack();

	const pan = React.useRef(new Animated.ValueXY()).current;

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderStart: React.useCallback(() => {
			setBgColor("rgba(0,0,0,0.4)");
		}, []),
		onPanResponderMove: Animated.event(
			[
				null,
				{
					dx: pan.x,
					dy: pan.y,
				},
			],
			{ useNativeDriver: false }
		),
		onPanResponderEnd: React.useCallback(() => {
			setBgColor("rgba(0,0,0,1)");
		}, []),
		onPanResponderRelease: React.useCallback((e: { nativeEvent: { pageY: number } }) => {
			if (e.nativeEvent.pageY > 505 || e.nativeEvent.pageY < 330) {
				goBack();
			}
			Animated.spring(pan, {
				toValue: { x: 0, y: 0 },
				useNativeDriver: false,
			}).start();
		}, []),
	});

	return (
		<SafeAreaView
			style={[
				styles.container,
				{
					backgroundColor: isAvatar ? (avatar as string) : (cover as string) || "black",
				},
			]}
		>
			<StatusBar backgroundColor="transparent" style="auto" />
			<View style={styles.headerStyle}>
				<Pressable onPress={goBack}>
					<Icon name="arrowLeft" />
				</Pressable>
			</View>
			<Animated.View {...panResponder.panHandlers} style={[pan.getLayout(), styles.imageContainer]}>
				<Image
					placeholder={getPlaceHolderImage(true)}
					contentFit="contain"
					source={{
						uri: getImageProxyURL({
							formattedLink: getIPFSLink(route.params.url),
						}),
					}}
					style={isAvatar ? styles.avatarStyle : styles.imageStyle}
				/>
			</Animated.View>
		</SafeAreaView>
	);
};

export default React.memo(FullImage);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		justifyContent: "center",
		alignItems: "center",
	},
	headerStyle: {
		position: "absolute",
		top: StatusBarHeight,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		zIndex: 1,
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	imageContainer: {
		width: "100%",
		height: 300,
	},
	imageStyle: {
		height: "100%",
		width: "100%",
	},
	avatarStyle: {
		height: "100%",
		width: "90%",
		alignSelf: "center",
		resizeMode: "cover",
		borderRadius: 8,
	},
});
