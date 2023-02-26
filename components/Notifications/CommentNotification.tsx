import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import formatAddress from "../../utils/formatAddress";
import NotificationCardProps from "./index.d";
import Avatar from "../UI/Avatar";
import getDifference from "../../utils/getDifference";
import getIPFSLink from "../../utils/getIPFSLink";
import CommentIcon from "../svg/CommentIcon";
import StyledText from "../UI/StyledText";
import Icon from "../Icon";

const CommentNotification: React.FC<NotificationCardProps> = ({
  navigation,
  notification,
}) => {
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
        <Icon name="comment" color="cyan" />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Pressable
              onPress={() => {
                navigation.navigate("Channel", {
                  profileId: notification?.profile?.id,
                });
              }}
            >
              <Avatar
                src={getIPFSLink(notification?.profile?.picture?.original?.url)}
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
                title={` commented on your ${
                  notification?.comment?.commentOn?.__typename === "Post"
                    ? "post"
                    : notification?.comment?.commentOn?.__typename === "Comment"
                    ? "comment"
                    : "mirror"
                }`}
                style={{ color: "gray" }}
              />
              <StyledText
                title={getDifference(notification?.createdAt)}
                style={{ fontSize: 10, color: "gray" }}
              />
            </View>
          </View>
        </View>
        <StyledText
          title={
            notification?.comment?.metadata?.description ||
            notification?.comment?.metadata?.content
          }
          style={{ fontSize: 10, color: "gray" }}
        />
      </View>
    </>
  );
};
export default CommentNotification;
