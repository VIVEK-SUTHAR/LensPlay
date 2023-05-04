import { Ionicons } from "@expo/vector-icons";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import VideoPlayer from "expo-video-player";
import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { freeCollectPublication } from "../../api";
import { SHOT } from "../../constants/tracking";
import { useAuthStore, useThemeStore, useToast } from "../../store/Store";
import { ToastType } from "../../types/Store";
import getIPFSLink from "../../utils/getIPFSLink";
import getRawurl from "../../utils/getRawUrl";
import TrackAction from "../../utils/Track";
import Sheet from "../Bottom";
import Icon from "../Icon";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import { LikeButton } from "../VIdeo";
import Constants from "expo-constants";
import { ShotsPublication } from "./ByteCard";
import { useGuestStore } from "../../store/GuestStore";
import { Player } from "@livepeer/react-native";

interface SingleByteProps {
  item: ShotsPublication;
  index: number;
  currentIndex: number;
}

const SingleByte = ({ item, index, currentIndex }: SingleByteProps) => {
  const [mute, setMute] = useState<boolean>(false);
  const [collected, setCollected] = useState<boolean>(item?.hasCollectedByMe);
  const [totalCollects, setTotalCollects] = useState<number>(
    item?.stats?.totalAmountOfCollects
  );

  const ref = React.useRef<Video>(null);
  const descriptionRef = useRef<BottomSheetMethods>(null);
  const collectSheetRef = useRef<BottomSheetMethods>(null);

  const bottomTabBarHeight = useBottomTabBarHeight();

  const navigation = useNavigation();
  const { PRIMARY } = useThemeStore();
  const { accessToken } = useAuthStore();
  const toast = useToast();

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const StatusBarHeight = Constants.statusBarHeight;
  const { isGuest } = useGuestStore();
  navigation.addListener("blur", (e) => {
    ref.current?.pauseAsync();
  });

  const onPress = useCallback((ref: React.RefObject<BottomSheetMethods>) => {
    ref?.current?.snapToIndex(0);
  }, []);

  const shareVideo = async () => {
    try {
      const result = await Share.share({
        message: `Let's watch ${item?.metadata?.name} on LensPlay,here's link,https://lensplay.xyz/watch/${item.id}`,
      });
    } catch (error) {
      // console.log(error);
    }
  };

  const collectPublication = React.useCallback(async () => {
    try {
      if (isGuest) {
        toast.show("Please Login", ToastType.ERROR, true);
        return;
      }
      const data = await freeCollectPublication(item?.id, accessToken);
      if (data) {
        toast.show("Collect Submitted", ToastType.SUCCESS, true);
        setCollected(true);
        setTotalCollects((prev) => prev + 1);
        TrackAction(SHOT.SHOTS_COLLECT);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.show(error.message, ToastType.ERROR, true);
      }
    } finally {
      collectSheetRef?.current?.close();
    }
  }, []);

  return (
    <>
      <View
        style={{
          width: windowWidth,
          height: windowHeight - bottomTabBarHeight - 2,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          // borderWidth: 2,
          // borderColor: 'red'
        }}
      >
        <StatusBar backgroundColor="transparent" />
        {/* <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setMute(!mute)}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
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
        </TouchableOpacity> */}
        <Player
          src={getIPFSLink(item?.metadata?.media[0]?.original?.url)}
          aspectRatio="9to16"
          autoUrlUpload={{
            fallback: true,
            ipfsGateway: "https://cloudflare-ipfs.com/",
          }}
          objectFit="cover"
          autoPlay={currentIndex === index ? true : false}
          children={<></>}
        />
        <View
          style={{
            position: "absolute",
            width: windowWidth,
            zIndex: 0,
            bottom: 0,
            padding: 10,
          }}
        >
          <View style={{ marginVertical: 10 }}>
            <View style={{ width: "auto", maxWidth: 250 }}>
              <Pressable
                onPress={() => {
                  onPress(descriptionRef);
                }}
              >
                <Heading
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                  numberOfLines={1}
                  title={item?.metadata?.name}
                />
                <StyledText
                  style={{
                    color: "gray",
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                  numberOfLines={2}
                  title={item?.metadata?.description}
                />
              </Pressable>
              <View
                style={{
                  width: "auto",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <Avatar
                  src={getRawurl(item?.profile?.picture)}
                  height={40}
                  width={40}
                />
                <View style={{ marginLeft: 8 }}>
                  <StyledText
                    style={{ color: "white", fontSize: 16, fontWeight: "500" }}
                    title={item?.profile?.name || item?.profile?.id}
                  />
                  <StyledText
                    style={{ color: "gray", fontSize: 12, fontWeight: "500" }}
                    title={item?.profile?.handle}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: bottomTabBarHeight,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LikeButton
            like={item?.stats?.totalUpvotes}
            id={item?.id}
            isalreadyLiked={item?.reaction === "UPVOTE"}
            bytes={true}
          />
          <TouchableOpacity
            style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={(e) => {
              e.preventDefault();
              navigation.navigate("ShotsComment", {
                publicationId: item?.id,
              });
            }}
          >
            <Icon name="comment" size={32} />
            <Text style={{ color: "white" }}>
              {item?.stats?.totalAmountOfComments}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={(e) => {
              e.preventDefault();
              collected
                ? toast.show(
                    "You have already collected this shot",
                    ToastType.ERROR,
                    true
                  )
                : onPress(collectSheetRef);
            }}
          >
            <Icon
              name="collect"
              color={collected ? PRIMARY : "white"}
              size={28}
            />
            <Text style={{ color: collected ? PRIMARY : "white" }}>
              {totalCollects}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 0,
            }}
            onPress={shareVideo}
          >
            <Icon name="share" size={28} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default React.memo(SingleByte);
