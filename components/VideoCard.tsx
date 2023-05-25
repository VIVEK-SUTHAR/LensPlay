import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import * as React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useActivePublication } from "../store/Store";
import { FeedItemRoot, Mirror, Post } from "../types/generated";
import formatTime from "../utils/formatTime";
import getDifference from "../utils/getDifference";
import getIPFSLink from "../utils/getIPFSLink";
import getImageProxyURL from "../utils/getImageProxyURL";
import getPlaceHolderImage from "../utils/getPlaceHolder";
import getRawurl from "../utils/getRawUrl";
import getVideoDuration from "../utils/getVideoDuration";
import Avatar from "./UI/Avatar";
import Heading from "./UI/Heading";
import StyledText from "./UI/StyledText";

type VideoCardProp = {
  publication: FeedItemRoot | Mirror | Post;
  id: string;
  height?: number | string;
  width?: number | string;
};

const VideoCard: React.FC<VideoCardProp> = ({
  width = "auto",
  height = 200,
  publication,
}) => {
  const { setActivePublication } = useActivePublication();

  const navigation = useNavigation();

  let playBackurl = React.useMemo(
    () => publication?.metadata?.media[0]?.original?.url,
    []
  );
  const navigateToVideoPage = React.useCallback(() => {
    navigation.navigate("VideoPage", {
    });
    setActivePublication(publication);
  }, []);

  const navigateToUserChannel = React.useCallback(() => {
    navigation.navigate("Channel", {
      profileId: publication?.profile?.id,
      isFollowdByMe: publication?.profile?.isFollowedByMe,
      name: publication?.profile?.name || publication?.profile?.handle,
      ethAddress: publication?.profile?.ownedBy,
    });
  }, []);

  const coverImage = React.useMemo(
    () =>
      getImageProxyURL({
        formattedLink: getIPFSLink(getRawurl(publication?.metadata?.cover)),
      }),
    []
  );

  return (
    <View style={[styles.videoCardContainer, { width: width }]}>
      <View style={{ height: height }}>
        <TouchableWithoutFeedback onPress={navigateToVideoPage}>
          <Image
            placeholder={getPlaceHolderImage()}
            contentFit="cover"
            transition={500}
            source={{
              uri: coverImage,
            }}
            style={styles.coverImage}
          />
        </TouchableWithoutFeedback>
        {getVideoDuration(publication.metadata) && (
          <View style={styles.videoDurationBox}>
            <StyledText
              title={formatTime(getVideoDuration(publication.metadata))}
              style={{ color: "white", fontSize: 12 }}
            ></StyledText>
          </View>
        )}
      </View>
      <TouchableWithoutFeedback onPress={navigateToUserChannel}>
        <View style={styles.videoTitleContainer}>
          <Avatar
            src={getRawurl(publication?.profile?.picture)}
            height={40}
            width={40}
          />
          <View style={styles.videoTitle}>
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

export default React.memo(VideoCard);

const styles = StyleSheet.create({
  videoCardContainer: {
    margin: 10,
    borderRadius: 10,
  },
  coverImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  videoDurationBox: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: "auto",
    paddingHorizontal: 4,
    paddingVertical: 2,
    height: "auto",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 4,
  },
  videoTitleContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  videoTitle: {
    flex: 0.95,
  },
});
