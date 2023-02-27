import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import NotificationCardProps, { CollectedPublication } from "./index.d";
import getIPFSLink from "../../utils/getIPFSLink";
import formatAddress from "../../utils/formatAddress";
import getDifference from "../../utils/getDifference";
import Avatar from "../UI/Avatar";
import CollectIcon from "../svg/CollectIcon";
import StyledText from "../UI/StyledText";
import Icon from "../Icon";

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
        <Icon name="collect" color="coral" size={24} />
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <StyledText
                title={
                  notification?.wallet?.defaultProfile?.handle?.split(".")[0] ||
                  formatAddress(notification.wallet?.address)
                }
                style={{ color: "white", fontWeight: "500" }}
              />
              <StyledText
                title={" collected your post"}
                style={{ color: "gray" }}
              />
              <StyledText
                title={getDifference(notification?.createdAt)}
                style={{ fontSize: 10, color: "gray" }}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default CollectNotification;
