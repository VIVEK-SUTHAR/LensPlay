import { Ionicons } from "@expo/vector-icons";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import VideoPlayer from "expo-video-player";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
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
import createLivePeerAsset from "../../utils/video/createLivePeerAsset";
import checkIfLivePeerAsset from "../../utils/video/isInLivePeer";
import Sheet from "../Bottom";
import Icon from "../Icon";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import { LikeButton } from "../VIdeo";
import { ShotsPublication } from "./ByteCard";

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
  const [plabackUrl, setPlabackUrl] = useState("");

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
        collectSheetRef?.current?.close();
      }
    } finally {
      //
    }
  }, []);

  const LENS_MEDIA_URL = item?.metadata?.media[0]?.original?.url;

  useEffect(() => {
    checkIfLivePeerAsset(LENS_MEDIA_URL).then((res) => {
      if (res) {
        console.log(res);

        setPlabackUrl(res);
      } else {
        createLivePeerAsset(LENS_MEDIA_URL);
        setPlabackUrl(getIPFSLink(LENS_MEDIA_URL));
      }
    });
  }, []);

  return (
    <>
      <View
        style={{
          width: windowWidth,
          height: windowHeight - bottomTabBarHeight,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar backgroundColor="transparent" />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setMute(!mute)}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        >
          {plabackUrl ? (
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
                shouldPlay: currentIndex === index,
                resizeMode: ResizeMode.CONTAIN,
                isMuted: mute,
                posterSource: {
                  uri: getIPFSLink(getRawurl(item?.metadata?.cover)),
                },
                isLooping: true,
                posterStyle: {
                  resizeMode: ResizeMode.CONTAIN,
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
          ) : (
            <View
              style={{
                height: windowHeight,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator color={PRIMARY} size="large" />
            </View>
          )}
        </TouchableOpacity>
        <Ionicons
          name="volume-mute"
          style={{
            fontSize: mute ? 20 : 0,
            color: "white",
            position: "absolute",
            backgroundColor: "rgba(52,52,52,0.6)",
            borderRadius: 100,
            padding: mute ? 20 : 0,
          }}
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
      <Sheet
        ref={collectSheetRef}
        index={-1}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: "#1d1d1d",
        }}
        snapPoints={["50%"]}
        children={
          <View style={{ paddingHorizontal: 8 }}>
            <ScrollView
              style={{
                padding: 8,
                zIndex: 1,
                borderColor: "red",
                borderWidth: 0,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  height: Dimensions.get("screen").height / 3,
                }}
              >
                <Image
                  source={{
                    uri: getIPFSLink(getRawurl(item?.metadata?.cover)),
                  }}
                  style={{
                    height: 180,
                    borderRadius: 8,
                    resizeMode: "cover",
                  }}
                  progressiveRenderingEnabled={true}
                />
                <Button
                  title={`Collect the Shot for free`}
                  // width={"90%"}
                  mx={12}
                  py={12}
                  textStyle={{
                    fontSize: 20,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                  onPress={collectPublication}
                />
              </View>
            </ScrollView>
          </View>
        }
      />
      <Sheet
        ref={descriptionRef}
        index={-1}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: "#1d1d1d",
        }}
        snapPoints={["50%"]}
        children={
          <View style={{ paddingHorizontal: 8 }}>
            <ScrollView style={{ padding: 8 }}>
              <Heading
                title={item?.metadata?.name}
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "white",
                }}
              />
              <StyledText
                title={
                  item?.metadata?.description ||
                  item?.metadata?.content ||
                  "No description provided by creator"
                }
                style={{
                  color: "white",
                }}
              />
            </ScrollView>
          </View>
        }
      />
    </>
  );
};

export default React.memo(SingleByte);
