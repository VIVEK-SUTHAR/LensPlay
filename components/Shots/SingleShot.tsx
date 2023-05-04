import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ResizeMode, Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import getIPFSLink from "../../utils/getIPFSLink";
import getRawurl from "../../utils/getRawUrl";
import { ShotsPublication } from "../Bytes/ByteCard";
import Icon from "../Icon";
import checkIfLivePeerAsset from "../../utils/video/isInLivePeer";
import createLivePeerAsset from "../../utils/video/createLivePeerAsset";
import { useNavigation } from "@react-navigation/native";

interface SingleByteProps {
  item: ShotsPublication;
  index: number;
  currentIndex: number;
}

function SingleShot({ item, index, currentIndex }: SingleByteProps) {
  const ref = React.useRef<Video>(null);
  const { height, width } = useWindowDimensions();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const [mute, setMute] = useState(false);
  const [videoURL, setVideoURL] = useState(
    getIPFSLink(item?.metadata?.media[0]?.original?.url)
  );

  const navigation = useNavigation();

  navigation.addListener("blur", (e) => {
    ref.current?.pauseAsync();
  });

  useEffect(() => {
    checkIfLivePeerAsset(videoURL).then((res) => {
      if (res) {
        setVideoURL(res);
        console.log(res, "hell");
      } else {
        createLivePeerAsset(videoURL);
      }
    });
  }, []);

  return (
    <View
      style={{
        width: width,
        height: height - bottomTabBarHeight,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={() => setMute(!mute)}
        style={{
          flex: 1,
          backgroundColor: "cyan",
        }}
      >
        <VideoPlayer
          defaultControlsVisible={false}
          videoProps={{
            ref: ref,
            source: {
              uri: videoURL,
            },
            onError(error) {
              // console.log(error);
            },
            shouldPlay: currentIndex === index ? true : false,
            resizeMode: ResizeMode.COVER,
            isMuted: mute,
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
        {/* <Player
          src={getIPFSLink(item?.metadata?.media[0]?.original?.url)}
          loop
          aspectRatio="9to16"
          objectFit="cover"
          autoUrlUpload={{
            fallback: true,
            ipfsGateway: "https://ipfs.io/ipfs",
          }}
          autoPlay={currentIndex === index ? true : false}
          children={<></>}
        /> */}
      </Pressable>
    </View>
  );
}

export default React.memo(SingleShot);
