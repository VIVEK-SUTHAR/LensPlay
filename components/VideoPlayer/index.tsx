import Icon from "components/Icon";
import StyledText from "components/UI/StyledText";
import { primary, white } from "constants/Colors";
import { ResizeMode, Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { setStatusBarHidden } from "expo-status-bar";
import React, { MutableRefObject, useRef, useState } from "react";
import { Dimensions, Platform, View } from "react-native";
import { useThemeStore } from "store/Store";
import getIPFSLink from "utils/getIPFSLink";
import Logger from "utils/logger";
import Player from "./Player";

interface VideoPlayerProps {
	url: string;
	poster?: string;
	inFullscreen?: boolean;
	title: string;

	isSliderVisible?: boolean;
	loop?: boolean;
	setInFullscreen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function VideoPlayer({
	inFullscreen,
	poster,
	title,
	isSliderVisible = true,
	loop = false,
	url,
	setInFullscreen,
}: VideoPlayerProps) {
	const videoRef = useRef<Video>();
	const { PRIMARY } = useThemeStore();
	Logger.Log("IN FULLSCREEN", inFullscreen);
	const isAndroid = Platform.OS === "android";
	const [isMute, setisMute] = useState(false);
	return (
		<Player
			style={{
				width: inFullscreen ? Dimensions.get("screen").height : Dimensions.get("screen").width,
				height: inFullscreen ? Dimensions.get("screen").width * 0.96 : 250,
				videoBackgroundColor: "transparent",
				controlsBackgroundColor: "transparent",
			}}
			textStyle={{
				fontSize: 14,
				fontWeight: "600",
			}}
			activityIndicator={{
				size: "large",
				color: primary,
			}}
			slider={{
				visible: isSliderVisible,
				thumbTintColor: "white",
				maximumTrackTintColor: "white",
				minimumTrackTintColor: primary,
			}}
			icon={{
				size: 48,
				play: <Icon name="play" size={48} color={white[800]} />,
				pause: <Icon name="pause" size={52} color={white[800]} />,
				replay: <Icon name="replay" color={white[800]} size={48} />,
			}}
			header={
				<View
					style={{
						flexDirection: "row",
						width: "100%",
						justifyContent: "space-between",
					}}
				>
					<StyledText
						title={inFullscreen ? title : ""}
						style={{
							color: "white",
							paddingHorizontal: 20,
							fontSize: 18,
							fontWeight: "600",
							paddingVertical: 8,
						}}
						numberOfLines={1}
					/>
				</View>
			}
			videoProps={{
				ref: videoRef as MutableRefObject<Video>,
				isLooping: loop,
				usePoster: true,
				posterSource: {
					uri: getIPFSLink(poster),
				},
				posterStyle: {
					height: "100%",
					width: "100%",
					resizeMode: "cover",
				},
				isMuted: isMute,
				resizeMode: ResizeMode.CONTAIN,
				shouldPlay: true,
				source: {
					uri: url,
				},
			}}
			fullscreen={{
				inFullscreen: inFullscreen,
				enterFullscreen: async () => {
					setStatusBarHidden(true, "fade");
					setInFullscreen ? setInFullscreen(!inFullscreen) : null;
					await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
				},
				exitFullscreen: async () => {
					setStatusBarHidden(false, "fade");
					setInFullscreen ? setInFullscreen(!inFullscreen) : null;
					await ScreenOrientation.lockAsync(
						isAndroid
							? ScreenOrientation.OrientationLock.PORTRAIT
							: ScreenOrientation.OrientationLock.PORTRAIT_UP
					);
				},
			}}
			mute={{
				enterMute: () => setisMute((prev) => !prev),
				exitMute: () => setisMute((prev) => !prev),
				isMute,
				visible: true,
			}}
		/>
	);
}

export default React.memo(VideoPlayer);
