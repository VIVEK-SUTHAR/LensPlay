import React from "react";
import { Pressable, View } from "react-native";
import { NewCollectNotification } from "../../types/generated";
import formatAddress from "../../utils/formatAddress";
import getDifference from "../../utils/getDifference";
import getIPFSLink from "../../utils/getIPFSLink";
import Icon from "../Icon";
import Avatar from "../UI/Avatar";
import StyledText from "../UI/StyledText";

type CollectNotificationProps = {
  navigation: any;
  notification: NewCollectNotification;
};

const CollectNotification: React.FC<CollectNotificationProps> = ({
  navigation,
  notification,
}) => {
  let PROFILE_PIC_URI = "";
  if (
    notification?.wallet?.defaultProfile?.picture?.__typename === "MediaSet"
  ) {
    PROFILE_PIC_URI =
      notification?.wallet?.defaultProfile?.picture?.original?.url;
  }
  if (
    notification?.wallet?.defaultProfile?.picture?.__typename === "NftImage"
  ) {
    PROFILE_PIC_URI = notification?.wallet?.defaultProfile?.picture?.uri;
  }
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
                src={getIPFSLink(PROFILE_PIC_URI)}
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
        <StyledText
          title={
            notification?.collectedPublication?.metadata?.content ||
            notification?.collectedPublication?.metadata?.description
          }
          numberOfLines={2}
          style={{ fontSize: 10, color: "gray" }}
        />
      </View>
    </>
  );
};

export default CollectNotification;
