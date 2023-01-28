import React from "react";
import { setStatusBarHidden } from "expo-status-bar";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { ResizeMode } from "expo-av";
import { Dimensions, Text, View } from "react-native";
import { primary } from "../../constants/Colors";
import * as ScreenOrientation from "expo-screen-orientation";
import VideoPlayer from "expo-video-player";
import getIPFSLink from "../../utils/getIPFSLink";

interface VideoPlayerProps {
  url: string;
  poster?: string;
  inFullscreen?: boolean;
  title: string;
  isMute: boolean;
  setInFullscreen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMute: React.Dispatch<React.SetStateAction<boolean>>;
}

function Player({
  inFullscreen,
  poster,
  title,
  url,
  isMute,
  setInFullscreen,
  setIsMute,
}: VideoPlayerProps) {
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
        visible: true,
        thumbTintColor: "white",
        maximumTrackTintColor: "white",
        minimumTrackTintColor: primary,
      }}
      icon={{
        size: 48,
        play: <AntDesign name="play" color={primary} size={36} />,
        pause: <AntDesign name="pause" color={primary} size={36} />,
        replay: (
          <MaterialCommunityIcons name="replay" size={48} color={primary} />
        ),
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
          <Text
            style={{
              color: "white",
              paddingHorizontal: 20,
              fontSize: 18,
              fontWeight: "600",
              paddingVertical: 8,
            }}
          >
            {inFullscreen ? title : ""}
          </Text>
          {/* <Feather
            name="settings"
            size={26}
            color={"white"}
            style={{ alignSelf: "flex-end", marginHorizontal: 8 }}
          /> */}
        </View>
      }
      videoProps={{
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
            ScreenOrientation.OrientationLock.PORTRAIT
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
