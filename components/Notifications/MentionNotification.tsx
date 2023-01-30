import { Pressable, Text, View } from "react-native";
import React from "react";
import NotificationCardProps from "./index.d";
import getDifference from "../../utils/getDifference";
import formatAddress from "../../utils/formatAddress";
import Avatar from "../UI/Avatar";
import { Octicons } from "@expo/vector-icons";

const MentionNotification = ({
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
        <Octicons name="mention" size={24} color={"#6bd841"} />
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
                  notification?.mentionPublication?.profile?.picture?.original
                    ?.url
                }
                height={35}
                width={35}
              />
            </Pressable>
            <Text style={{ color: "gray", fontSize: 14 }}>
              <Text style={{ color: "white", fontWeight: "600" }}>
                {notification?.mentionPublication?.profile?.handle?.split(
                  "."
                )[0] || formatAddress(notification?.wallet?.address)}{" "}
              </Text>
              mentioned you in a{" "}
              {notification?.mentionPublication?.__typename === "Post"
                ? "post"
                : "comment"}
              <Text style={{ fontSize: 10, color: "gray" }}>
                {" "}
                {getDifference(notification?.createdAt)}
              </Text>
            </Text>
            <View>
              <Text style={{ color: "grey", fontSize: 12 }}>
                {notification?.mentionPublication?.metadata?.description}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default MentionNotification;
