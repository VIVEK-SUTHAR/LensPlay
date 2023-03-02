import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Share,
  Pressable,
  ScrollView,
} from "react-native";
import VideoPlayer from "expo-video-player";
import { Ionicons } from "@expo/vector-icons";
import { ResizeMode } from "expo-av";
import { Root } from "../../types/Lens/Feed";
import getIPFSLink from "../../utils/getIPFSLink";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useAuthStore, useThemeStore, useToast } from "../../store/Store";
import { LikeButton } from "../VIdeo";
import { StatusBar } from "expo-status-bar";
import Avatar from "../UI/Avatar";
import StyledText from "../UI/StyledText";
import Heading from "../UI/Heading";
import RBSheet from "../UI/BottomSheet";
import Comment from "../Comments";
import Button from "../UI/Button";
import Icon from "../Icon";
import { useNavigation } from "@react-navigation/native";
import { freeCollectPublication } from "../../api";
import { ToastType } from "../../types/Store";
import { dark_primary } from "../../constants/Colors";

interface SingleByteProps {
  item: Root;
  index: number;
  currentIndex: number;
}

const SingleByte = ({ item, index, currentIndex }: SingleByteProps) => {
  const navigation = useNavigation();
  const toast = useToast();
  const { PRIMARY } = useThemeStore();

  const [likes, setLikes] = useState<number>(item.stats.totalUpvotes);
  const [mute, setMute] = useState<boolean>(false);
  const [isalreadyLiked, setisalreadyLiked] = useState<boolean>(
    item?.reaction === "UPVOTE" ? true : false
  );
  const descriptionRef = useRef(null);
  const collectSheetRef = useRef(null);
  const { accessToken } = useAuthStore();

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const bottomTabBarHeight = useBottomTabBarHeight();
  const [collected, setCollected] = useState<boolean>(item?.hasCollectedByMe);
  const [totalCollects, setTotalCollects] = useState(
    item.stats.totalAmountOfCollects
  );
  const shareVideo = async () => {
    try {
      const result = await Share.share({
        message: `Let's watch ${item.metadata.name} on LensPlay,here's link,https://lensplay.xyz/watch/${item.id}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const collectPublication = async () => {
    console.log(item.id);

    try {
      const data = await freeCollectPublication(item.id, accessToken);
      if (data) {
        toast.show("Collect Submitted", ToastType.SUCCESS, true);
        setCollected(true);
        setTotalCollects((prev) => prev + 1);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.show(error.message, ToastType.ERROR, true);
        collectSheetRef?.current?.close();
      }
    } finally {
      //
    }
  };

  return (
    <>
      <RBSheet
        ref={descriptionRef}
        height={Dimensions.get("window").height / 2}
      >
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
      </RBSheet>
      <RBSheet
        ref={collectSheetRef}
        height={Dimensions.get("window").height / 1.8}
      >
        <View
          style={{
            maxWidth: "100%",
            height: 300,
            marginTop: 32,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={{
              uri: getIPFSLink(item?.metadata?.cover),
            }}
            style={{
              height: 180,
              borderRadius: 8,
              width: Dimensions.get("screen").width - 48,
              resizeMode: "cover",
            }}
            progressiveRenderingEnabled={true}
          />
          <Button
            title={`Collect the Shot for free`}
            width={"90%"}
            py={12}
            textStyle={{ fontSize: 20, fontWeight: "700", textAlign: "center" }}
            onPress={collectPublication}
          />
        </View>
      </RBSheet>
      <View
        style={{
          width: windowWidth,
          height: windowHeight - 20,
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
          <VideoPlayer
            defaultControlsVisible={false}
            videoProps={{
              source: {
                uri: getIPFSLink(item.metadata.media[0]?.original?.url),
              },
              shouldPlay: currentIndex === index ? true : false,
              resizeMode: ResizeMode.CONTAIN,
              isMuted: mute,

              posterSource: {
                uri: getIPFSLink(item?.metadata.cover),
              },
              posterStyle: {
                resizeMode: ResizeMode.CONTAIN,
              },
            }}
            icon={{
              size: 48,
              play: <Icon name="play" size={48} />,
              pause: <Icon name="pause" size={52} />,
              replay: <Icon name="replay" size={48} />,
            }}
            autoHidePlayer={true}
          />
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
            zIndex: 1,
            bottom: 0,
            padding: 10,
          }}
        >
          <View style={{ marginVertical: 10 }}>
            <View style={{ width: "auto", maxWidth: 250 }}>
              <Pressable
                onPress={() => {
                  descriptionRef.current.open();
                }}
              >
                <Heading
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                  numberOfLines={1}
                  title={item.metadata.name}
                />
                <StyledText
                  style={{
                    color: "gray",
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                  numberOfLines={2}
                  title={item.metadata.description}
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
                  src={item.profile?.picture?.original?.url}
                  height={40}
                  width={40}
                />
                <View style={{ marginLeft: 8 }}>
                  <StyledText
                    style={{ color: "white", fontSize: 16, fontWeight: "500" }}
                    title={item.profile.name || item.profile.id}
                  />
                  <StyledText
                    style={{ color: "gray", fontSize: 12, fontWeight: "500" }}
                    title={item.profile.handle}
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
            likes={likes}
            id={item.id}
            setLikes={setLikes}
            isalreadyLiked={isalreadyLiked}
            setisalreadyDisLiked={() => {}}
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
                publicationId: item.id,
              });
            }}
          >
            <Icon name="comment" size={32} />
            <Text style={{ color: "white" }}>
              {item.stats.totalAmountOfComments}
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
                : collectSheetRef?.current?.open();
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
              zIndex: 15,
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
