import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import useStore from "../store/Store";
import getIPFSLink from "../utils/getIPFSLink";
import Avatar from "./UI/Avatar";
import Heading from "./UI/Heading";
import SubHeading from "./UI/SubHeading";

type videoPageProp = {
  navigation: any;
  title: string;
  banner: string;
  avatar: string;
  profileId: string;
  uploadedBy: string;
  playbackId: string;
  id: number;
  stats: {};
  date: string;
  reaction: string;
};

const VideoCard = ({
  id,
  navigation,
  banner,
  title,
  avatar,
  profileId,
  uploadedBy,
  playbackId,
  stats,
  date,
  reaction
}: videoPageProp) => {
  const store = useStore();
  const setCurrentIndex = store.setCurrentIndex;
  return (
    <View
      style={{
        margin: 10,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderRadius: 10,
      }}
    >
      <View style={{ height: 200 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setCurrentIndex(id);
            navigation.navigate("VideoPage", {
              title: title,
              id: id,
              uploadedBy: uploadedBy,
              playbackId: playbackId,
              profileId: profileId,
              avatar: avatar,
              banner: banner,
              stats: stats,
              reaction:reaction,
            });
          }}
        >
          <Image
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
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("Channel", {
            profileId: profileId,
          });
        }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ flex: 0.95 }}>
            <Heading
              title={title}
              style={{ fontSize: 16, fontWeight: "700", color: "white" }}
            />
            <SubHeading
              title={`By ${uploadedBy} on ${date}`}
              style={{ fontSize: 12, color: "gray" }}
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
