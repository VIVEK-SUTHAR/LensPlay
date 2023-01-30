import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import NotificationCardProps, { CollectedPublication } from "./index.d";
import { dark_secondary } from "../../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import getIPFSLink from "../../utils/getIPFSLink";
import formatAddress from "../../utils/formatAddress";
import getDifference from "../../utils/getDifference";
import Avatar from "../UI/Avatar";

const CollectNotification: React.FC<NotificationCardProps> = ({
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
        <Entypo name="folder-video" size={24} color={"coral"} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Pressable
              onPress={() => {
                navigation.navigate("Channel", {
                  profileId: notification?.wallet?.defaultProfile?.id,
                });
              }}
            >
              <Avatar
                src={getIPFSLink(
                  notification?.wallet?.defaultProfile?.picture?.original?.url
                )}
                height={35}
                width={35}
              />
            </Pressable>
            <Text style={{ color: "gray", fontSize: 14 }}>
              <Text style={{ color: "white", fontWeight: "500" }}>
                {notification?.wallet?.defaultProfile?.handle?.split(".")[0] ||
                  formatAddress(notification.wallet?.address)}{" "}
              </Text>
              collected your post
              <Text style={{ fontSize: 10, color: "gray" }}>
                {" "}
                {getDifference(notification?.createdAt)}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default CollectNotification;
