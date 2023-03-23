import React from "react";
import { Pressable, View } from "react-native";
import formatAddress from "../../utils/formatAddress";
import getDifference from "../../utils/getDifference";
import getIPFSLink from "../../utils/getIPFSLink";
import Icon from "../Icon";
import Avatar from "../UI/Avatar";
import StyledText from "../UI/StyledText";
import NotificationCardProps from "./index.d";

const FollowNotification: React.FC<NotificationCardProps> = ({
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
        <Icon name="follow" size={30} color="#5C7CFA" />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Pressable
              onPress={() => {
                navigation.navigate("Channel", {
                  profileId: notification?.wallet?.defaultProfile?.id,
                  isFollowdByMe: notification?.isFollowedByMe,
                  name: notification?.profile?.name,
                  ethAddress: notification?.wallet?.address,
                  handle: notification?.profile?.handle,
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
                  formatAddress(notification?.wallet?.address)
                }
                style={{ color: "white", fontWeight: "500" }}
              />
              <StyledText title={" followed you"} style={{ color: "gray" }} />
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

export default  React.memo(FollowNotification);
