import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useActivePublication } from "../store/Store";
import { Attribute, FeedItem, LensPublication, Root } from "../types/Lens/Feed";
import formatTime from "../utils/formatTime";
import getDifference from "../utils/getDifference";
import getIPFSLink from "../utils/getIPFSLink";
import Avatar from "./UI/Avatar";
import Heading from "./UI/Heading";
import StyledText from "./UI/StyledText";

type videoPageProp = {
  publication: Root;
  id: string;
  height?: number | string;
  width?: number | string;
};

const VideoCard = ({
  id,
  width = "auto",
  height = 200,
  publication,
}: videoPageProp) => {
  const [videoTime, setVideoTime] = React.useState<string>();
  const { setActivePublication } = useActivePublication();

  React.useEffect(() => {
    const time = publication?.metadata?.attributes.filter((item) => {
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
        borderRadius: 10,
        width: width,
      }}
    >
      <View style={{ height: height }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setActivePublication(publication);
            navigation.navigate("VideoPage");
          }}
        >
          <Image
            progressiveRenderingEnabled={true}
            source={{
              uri:
                getIPFSLink(publication?.metadata?.cover) ||
                "https://assets.lenstube.xyz/images/coverGradient.jpeg",
            }}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 10,
              resizeMode: "cover",
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
          setActivePublication(publication);
          navigation.navigate("Channel", {
            profileId: publication?.profile?.id,
            isFollowdByMe: publication?.profile?.isFollowedByMe,
            name: publication?.profile?.name || publication?.profile?.handle,
            ethAddress: publication?.profile?.ownedBy,
          });
        }}
      >
        <View
          style={{
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Avatar
            src={getIPFSLink(publication?.profile?.picture?.original?.url)}
            height={40}
            width={40}
          />
          <View style={{ flex: 0.95 }}>
            <Heading
              title={publication?.metadata?.name}
              style={{ fontSize: 16, fontWeight: "600", color: "white" }}
              numberOfLines={1}
            />
            <StyledText
              title={`By ${
                publication?.profile?.name || publication?.profile?.handle
              } ${getDifference(publication?.createdAt)}`}
              style={{ fontSize: 12, color: "gray" }}
              numberOfLines={1}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({});
