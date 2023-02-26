import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Share,
  Pressable,
  ImageBackground,
} from "react-native";
import VideoPlayer from "expo-video-player";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import { ResizeMode } from "expo-av";
import { Root } from "../../types/Lens/Feed";
import getIPFSLink from "../../utils/getIPFSLink";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useThemeStore } from "../../store/Store";
import { LikeButton, ShareButton } from "../VIdeo";
import MirrorIcon from "../svg/MirrorIcon";
import CollectIcon from "../svg/CollectIcon";
import { StatusBar } from "expo-status-bar";
import ShareIcon from "../svg/ShareIcon";
import CommentIcon from "../svg/CommentIcon";
import Avatar from "../UI/Avatar";
import StyledText from "../UI/StyledText";
import Heading from "../UI/Heading";

interface SingleByteProps {
  item: Root;
  index: number;
  currentIndex: number;
}

const SingleByte = ({ item, index, currentIndex }: SingleByteProps) => {
  const [likes, setLikes] = useState<number>(item.stats.totalUpvotes);
  const [mute, setMute] = useState<boolean>(false);
  const [isalreadyLiked, setisalreadyLiked] = useState<boolean>(
    item?.reaction === "UPVOTE" ? true : false
  );

  const theme = useThemeStore();

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const bottomTabBarHeight = useBottomTabBarHeight();
  const shareVideo = async () => {
    try {
      const result = await Share.share({
        message: `Let's watch ${item.metadata.name} on LensPlay,here's link,https://lensplay.xyz/watch/${item.id}`,
      });
    } catch (error) {
      console.log(error);
    }
  };
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
            <TouchableOpacity style={{ width: "auto", maxWidth: 250 }}>
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
            </TouchableOpacity>
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
          >
            <EvilIcons name="comment" size={25} color="white" />
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
          >
            <CollectIcon height={23} width={23} />
            <Text style={{ color: "white" }}>
              {item.stats.totalAmountOfCollects}
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
            <ShareIcon height={22} width={22} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default React.memo(SingleByte);
