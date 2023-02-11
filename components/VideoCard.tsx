import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Attribute } from "../types/Lens/Feed";
import formatTime from "../utils/formatTime";
import getDifference from "../utils/getDifference";
import getIPFSLink from "../utils/getIPFSLink";
import Avatar from "./UI/Avatar";
import Heading from "./UI/Heading";
import StyledText from "./UI/StyledText";

type videoPageProp = {
  title: string;
  banner: string;
  avatar: string;
  profileId: string;
  uploadedBy: string;
  playbackId: string;
  id: string;
  stats: {};
  date: string | Date;
  reaction: string | null;
  isFollowdByMe?: boolean;
  description: string;
  width?: string | number;
  height?: number;
  attributes: Attribute | Attribute[];
  ethAddress?: string;
};

const VideoCard = ({
  id,
  banner,
  title,
  avatar,
  profileId,
  uploadedBy,
  playbackId,
  stats,
  date,
  reaction,
  isFollowdByMe,
  description,
  width = "auto",
  height = 200,
  attributes,
  ethAddress,
}: videoPageProp) => {
  const [videoTime, setVideoTime] = React.useState<string>();

  React.useEffect(() => {
    const time = attributes?.filter((item) => {
      if (item?.traitType === "durationInSeconds") {
        setVideoTime(item?.value);
      }
    });
  }, []);
  const navigation = useNavigation();
  return (
    <View
      style={{
        margin: 10,
        backgroundColor: "#111111",
        borderRadius: 10,
        width: width,
      }}
    >
      <View style={{ height: height }}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("VideoPage", {
              title: title,
              id: id,
              uploadedBy: uploadedBy,
              playbackId: playbackId,
              profileId: profileId,
              avatar: avatar,
              banner: banner,
              stats: stats,
              reaction: reaction,
              isFollowdByMe: isFollowdByMe,
              description: description,
            });
          }}
        >
          <Image
            progressiveRenderingEnabled={true}
            source={{
              uri:
                getIPFSLink(banner) ||
                "https://assets.lenstube.xyz/images/coverGradient.jpeg",
            }}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 10,
              resizeMode: "contain",
            }}
          />
        </TouchableWithoutFeedback>
        {videoTime?.length ? (
          <View
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              width: "auto",
              paddingHorizontal: 4,
              paddingVertical: 2,
              height: "auto",
              backgroundColor: "rgba(0,0,0,0.9)",
              borderRadius: 4,
            }}
          >
            <StyledText
              title={formatTime(videoTime)}
              style={{ color: "white", fontSize: 12 }}
            ></StyledText>
          </View>
        ) : (
          <></>
        )}
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("Channel", {
            profileId: profileId,
            isFollowdByMe: isFollowdByMe,
            name: uploadedBy,
            ethAddress: ethAddress,
          });
        }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 0.95 }}>
            <Heading
              title={title}
              style={{ fontSize: 16, fontWeight: "600", color: "white" }}
              numberOfLines={1}
            />
            <StyledText
              title={`By ${uploadedBy} on ${getDifference(date)}`}
              style={{ fontSize: 12, color: "gray" }}
              numberOfLines={1}
            />
          </View>
          <Avatar src={getIPFSLink(avatar)} height={40} width={40} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({});
