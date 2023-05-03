import React from "react";
import { View, useWindowDimensions } from "react-native";
import { ShotsPublication } from "../Bytes/ByteCard";
import Icon from "../Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import VideoPlayer from "expo-video-player";
import getIPFSLink from "../../utils/getIPFSLink";
import { ResizeMode, Video } from "expo-av";
import getRawurl from "../../utils/getRawUrl";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Player } from "@livepeer/react-native";

interface SingleByteProps {
  item: ShotsPublication;
  index: number;
  currentIndex: number;
}

export default function SingleShot({
  item,
  index,
  currentIndex,
}: SingleByteProps) {
  const ref = React.useRef<Video>(null);
  const { height, width } = useWindowDimensions();
  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <View
      style={{
        width: width,
        height: height - bottomTabBarHeight,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        //   onPress={() => setMute(!mute)}
        style={{
          flex: 1,
        }}
      >
        <VideoPlayer
          defaultControlsVisible={false}
          videoProps={{
            ref: ref,
            source: {
              uri: getIPFSLink(item?.metadata?.media[0]?.original?.url),
            },
            onError(error) {
              // console.log(error);
            },
            shouldPlay: currentIndex === index ? true : false,
            resizeMode: ResizeMode.COVER,
            //   isMuted: mute,
            posterSource: {
              uri: getIPFSLink(getRawurl(item?.metadata?.cover)),
            },
            isLooping: true,
            posterStyle: {
              resizeMode: ResizeMode.COVER,
            },
          }}
          slider={{
            visible: false,
          }}
          fullscreen={{
            visible: false,
          }}
          mute={{
            visible: false,
          }}
          timeVisible={false}
          icon={{
            size: 48,
            play: <Icon name="play" size={48} />,
            pause: <Icon name="pause" size={52} />,
            replay: <Icon name="replay" size={48} />,
          }}
          autoHidePlayer={true}
        />
      </TouchableOpacity>
    </View>
  );
}
