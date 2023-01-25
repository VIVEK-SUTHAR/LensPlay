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
import getDifference from "../utils/getDifference";
import getIPFSLink from "../utils/getIPFSLink";
import Avatar from "./UI/Avatar";
import Heading from "./UI/Heading";
import SubHeading from "./UI/SubHeading";
import { LinearGradient } from "expo-linear-gradient";

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
  width: string | number;
  height: number;
  attributes: Attribute;
};

const NewVideoCard = ({
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
}: videoPageProp) => {
  const [videoTime, setVideoTime] = React.useState<Attribute[] | null>();
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
        backgroundColor: "black",
        borderRadius: 10,
        width: width,
        zIndex: 1,
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
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              resizeMode: "contain",
              zIndex: 8,
            }}
          />
        </TouchableWithoutFeedback>
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
          <Text style={{ color: "white", fontSize: 12 }}>{videoTime}</Text>
        </View>
      </View>

      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("Channel", {
            profileId: profileId,
            isFollowdByMe: isFollowdByMe,
            name: uploadedBy,
          });
        }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            shadowColor: "black",
            shadowOffset: {
              height: 45,
              width: 45,
            },
            shadowRadius: 1,
          }}
        >
          {/* <LinearGradient
            colors={["#000000", "transparent"]}
            end={{ x: 1, y: 1.1 }}
            start={{ x: 1, y: 0.3 }}
            locations={[0.1, 1]}
            style={{
              zIndex: 7,
              position: "absolute",
              top: -40,
              left: -8,
              width: 380,
              height: 110,
              //   borderWidth:2,
              //   borderBottomLeftRadius:160,
              //   borderBottomRightRadius:180,
              //   borderBottomEndRadius:140 ,
              //   borderBottomStartRadius:150,
              //   borderBottomLeftRadius:40
            }}
          > */}
          <View
            style={{
              // width: 150,
              // height: 50,
              // backgroundColor: "#E9E8E8",
              // shadowColor: "#00000",
              // shadowRadius: 40,
              // shadowOffset: { width: 20, height: 30 },
              zIndex: 5,
              // borderRadius: 80,
            }}
          />
          {/* </LinearGradient> */}
          <View style={{ flex: 0.95 }}>
            <Heading
              title={title}
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "white",
                zIndex: 9,
              }}
            />
            <SubHeading
              title={`By ${uploadedBy} on ${getDifference(date)}`}
              style={{ fontSize: 12, color: "gray", zIndex: 9 }}
            />
          </View>
          <Avatar src={getIPFSLink(avatar)} height={40} width={40} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default NewVideoCard;

const styles = StyleSheet.create({});
