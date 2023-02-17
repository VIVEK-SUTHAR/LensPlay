import React, { useState } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import VideoPlayer from "expo-video-player";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { ResizeMode } from "expo-av";
import { Root } from "../../types/Lens/Feed";
import getIPFSLink from "../../utils/getIPFSLink";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useThemeStore } from "../../store/Store";
import { LikeButton } from "../VIdeo";

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
  const height = windowHeight - bottomTabBarHeight;
  

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
          videoProps={{
            source: { uri: getIPFSLink(item.metadata.media[0]?.original?.url) },
            shouldPlay: currentIndex === index ? true : false,
            resizeMode: ResizeMode.CONTAIN,
            isMuted: mute,
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
          <TouchableOpacity style={{ width: 180 }}>
            <Text
              style={{ color: "white", fontSize: 14, marginHorizontal: 10 }}
            >
              {item.metadata.name}
            </Text>
            <View
              style={{ width: 100, flexDirection: "row", alignItems: "center" }}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 100,
                  backgroundColor: "white",
                  margin: 10,
                }}
              >
                <Image
                  source={{
                    uri: getIPFSLink(item.profile?.picture?.original?.url),
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderRadius: 100,
                  }}
                />
              </View>
              <Text style={{ color: "white", fontSize: 16 }}>
                {item.profile.name || item.profile.handle}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: bottomTabBarHeight,
          right: 0,
        }}
      >
        <LikeButton
              likes={likes}
              id={item.id}
              setLikes={setLikes}
              isalreadyLiked={isalreadyLiked}
              setisalreadyDisLiked={()=>{}}
              bytes={true}
            />
        <TouchableOpacity
          style={{
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="retweet" style={{ color: "white", fontSize: 25 }} />
          <Text style={{ color: "white" }}>
            {item.stats.totalAmountOfMirrors}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Entypo
            name="folder-video"
            style={{ color: "white", fontSize: 25 }}
          />
          <Text style={{ color: "white" }}>
            {item.stats.totalAmountOfCollects}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Feather
            name="more-vertical"
            style={{ color: "white", fontSize: 25 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleByte;
