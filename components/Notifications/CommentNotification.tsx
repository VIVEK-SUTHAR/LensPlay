import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import formatAddress from "../../utils/formatAddress";
import NotificationCardProps from "./index.d";
import Avatar from "../UI/Avatar";
import getDifference from "../../utils/getDifference";
import getIPFSLink from "../../utils/getIPFSLink";

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
        <EvilIcons name="comment" size={28} color={"#1d9bf0"} />
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
                src={getIPFSLink(notification.profile?.picture.original.url)}
                height={35}
                width={35}
              />
            </Pressable>
            <Text style={{ color: "gray", fontSize: 14 }}>
              <Text style={{ color: "white", fontWeight: "600" }}>
                {notification?.profile?.handle?.split(".")[0] ||
                  formatAddress(notification?.wallet?.address)}{" "}
              </Text>
              commented on your{" "}
              {notification?.comment?.commentOn?.__typename === "Post"
                ? "post"
                : notification?.comment?.commentOn?.__typename === "Comment"
                ? "comment"
                : "mirror"}
              <Text style={{ fontSize: 10, color: "gray" }}>
                {" "}
                {getDifference(notification?.createdAt)}
              </Text>
            </Text>
            <View>
              <Text style={{ color: "grey", fontSize: 12 }}>
                {notification?.comment?.metadata?.description}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
export default CommentNotification;
