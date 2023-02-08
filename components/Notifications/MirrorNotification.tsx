import { Pressable, Text, View } from "react-native";
import React from "react";
import NotificationCardProps from "./index.d";
import getDifference from "../../utils/getDifference";
import formatAddress from "../../utils/formatAddress";
import Avatar from "../UI/Avatar";
import { AntDesign } from "@expo/vector-icons";
import extractURLs from "../../utils/extractURL";
import StyledText from "../UI/StyledText";
import { STATIC_ASSET } from "../../constants";

const MirrorNotification = ({
  navigation,
  notification,
}: NotificationCardProps) => {
  return (
    <>
      <View
        style={{
          height: 35,
          width: 35,
          marginHorizontal: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign name="retweet" size={24} color={"#6bd841"} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Pressable
              onPress={() => {
                navigation.navigate("Channel", {
                  profileId: notification.profile?.id,
                });
              }}
            >
              <Avatar
                src={
                  notification?.profile?.picture?.original?.url || STATIC_ASSET
                }
                height={35}
                width={35}
              />
            </Pressable>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <StyledText
                title={
                  notification?.profile?.handle?.split(".")[0] ||
                  formatAddress(notification?.wallet?.address)
                }
                style={{ color: "white", fontWeight: "500" }}
              />
              <StyledText
                title={` mirrored your ${
                  notification?.publication?.__typename == "Post"
                    ? "post"
                    : notification?.publication?.__typename == "Comment"
                    ? "comment"
                    : "mirrored post"
                }`}
                style={{ color: "gray" }}
              />
              <StyledText
                title={getDifference(notification?.createdAt)}
                style={{ fontSize: 10, color: "gray" }}
              />
            </View>
            <View>
              <StyledText
                title={extractURLs(
                  notification?.publication?.metadata?.description
                )}
                style={{ color: "grey", fontSize: 12 }}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default MirrorNotification;
