import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Share,
} from "react-native";
import VideoPlayer from "expo-video-player";
import { Ionicons } from "@expo/vector-icons";
import { ResizeMode } from "expo-av";
import { Root } from "../../types/Lens/Feed";
import getIPFSLink from "../../utils/getIPFSLink";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useThemeStore } from "../../store/Store";
import { LikeButton, ShareButton } from "../VIdeo";
import { StatusBar } from "expo-status-bar";
import ShareIcon from "../svg/ShareIcon";
import CommentIcon from "../svg/CommentIcon";
import Avatar from "../UI/Avatar";
import StyledText from "../UI/StyledText";
import Heading from "../UI/Heading";
import RBSheet from "../UI/BottomSheet";
import Comment from "../Comments";
import Button from "../UI/Button";
import Icon from "../Icon";

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
  const commentSheetRef = useRef(null);
  const collectSheetRef = useRef(null);

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
      <RBSheet
        ref={commentSheetRef}
        height={Dimensions.get("window").height / 1.8}
      >
        <StyledText
          title="Comments"
          style={{
            color: "white",
            alignSelf: "flex-start",
            marginLeft: Dimensions.get("window").width * 0.06,
            fontSize: 16,
            fontWeight: "500",
          }}
        />
        <Comment publicationId={item.id} />
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
            // onPress={collectPublication}
          />
        </View>
      </RBSheet>
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
            onPress={(e) => {
              e.preventDefault();
              commentSheetRef?.current?.open();
            }}
          >
            <Icon name="comment" />
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
              collectSheetRef?.current?.open();
            }}
          >
            <Icon name="collect" />

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
            <Icon name="share" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default React.memo(SingleByte);
