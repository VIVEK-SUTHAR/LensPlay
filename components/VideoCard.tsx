import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import * as React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { useActivePublication } from "../store/Store";
import {
  FeedItemRoot,
  Maybe,
  MetadataAttributeOutput,
  Mirror,
  Post
} from "../types/generated";
import formatTime from "../utils/formatTime";
import getDifference from "../utils/getDifference";
import getImageProxyURL from "../utils/getImageProxyURL";
import getIPFSLink from "../utils/getIPFSLink";
import getPlaceHolderImage from "../utils/getPlaceHolder";
import getRawurl from "../utils/getRawUrl";
import Avatar from "./UI/Avatar";
import Heading from "./UI/Heading";
import StyledText from "./UI/StyledText";

type videoPageProp = {
  publication: FeedItemRoot | Mirror | Post;
  id: string;
  height?: number | string;
  width?: number | string;
};

const VideoCard = ({
  width = "auto",
  height = 200,
  publication,
}: videoPageProp) => {
  const [videoTime, setVideoTime] = React.useState<Maybe<string> | undefined>();
  const { setActivePublication } = useActivePublication();
  const navigation = useNavigation();
  let playBackurl = publication?.metadata?.media[0]?.original?.url;
  React.useEffect(() => {
    publication?.metadata?.attributes?.filter(
      (item: MetadataAttributeOutput) => {
        if (item?.traitType === "durationInSeconds") {
          setVideoTime(item?.value);
        }
      }
    );
  }, []);
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
            navigation.navigate("VideoPage", {
              playBackurl: playBackurl,
            });
          }}
        >
          <Image
            placeholder={getPlaceHolderImage()}
            contentFit="cover"
            transition={500}
            source={{
              uri: getImageProxyURL({
                formattedLink: getIPFSLink(
                  getRawurl(publication?.metadata?.cover)
                ),
              }),
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
              backgroundColor: "rgba(0,0,0,0.6)",
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
            src={getRawurl(publication?.profile?.picture)}
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

export default React.memo(VideoCard);
