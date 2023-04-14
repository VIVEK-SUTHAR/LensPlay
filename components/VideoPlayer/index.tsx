import React from "react";
import { setStatusBarHidden } from "expo-status-bar";
import { ResizeMode } from "expo-av";
import { Dimensions, View } from "react-native";
import { primary } from "../../constants/Colors";
import * as ScreenOrientation from "expo-screen-orientation";
import VideoPlayer from "expo-video-player";
import getIPFSLink from "../../utils/getIPFSLink";
import StyledText from "../UI/StyledText";
import Icon from "../Icon";
import { useThemeStore } from "../../store/Store";

interface VideoPlayerProps {
  url: string;
  poster?: string;
  inFullscreen?: boolean;
  title: string;
  isMute: boolean;
  isSliderVisible?: boolean;
  loop?: boolean;
  setInFullscreen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMute: React.Dispatch<React.SetStateAction<boolean>>;
}

function Player({
  inFullscreen,
  poster,
  title,
  isSliderVisible = true,
  loop = false,
  url,
  isMute,
  setInFullscreen,
  setIsMute,
}: VideoPlayerProps) {
  const { PRIMARY } = useThemeStore();
  return (
    <VideoPlayer
      style={{
        width: inFullscreen
          ? Dimensions.get("screen").height
          : Dimensions.get("screen").width,
        height: inFullscreen ? Dimensions.get("screen").width * 0.95 : 280,
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
        play: <Icon name="play" size={48} color={PRIMARY} />,
        pause: <Icon name="pause" size={52} color={PRIMARY} />,
        replay: <Icon name="replay" color={PRIMARY} size={48} />,
      }}
      header={
        <View
          style={{
            marginTop: 30,
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
          />
        </View>
      }
      videoProps={{
        isLooping: loop,
        usePoster: true,
        posterSource: {
          uri: getIPFSLink(poster),
        },
        posterStyle: {
          height: "100%",
          width: "100%",
          resizeMode: "contain",
        },

        isMuted: isMute,
        shouldPlay: true,
        resizeMode: ResizeMode.CONTAIN,
        source: {
          uri: getIPFSLink(url),
        },
      }}
      fullscreen={{
        inFullscreen: inFullscreen,
        enterFullscreen: async () => {
          setStatusBarHidden(true, "fade");
          setInFullscreen ? setInFullscreen(!inFullscreen) : null;
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE
          );
        },
        exitFullscreen: async () => {
          setStatusBarHidden(false, "fade");
          setInFullscreen ? setInFullscreen(!inFullscreen) : null;
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP
          );        
        },
      }}
      mute={{
        enterMute: () => setIsMute(!isMute),
        exitMute: () => setIsMute(!isMute),
        isMute,
        visible: false,
      }}
    />
  );
}

export default Player;
