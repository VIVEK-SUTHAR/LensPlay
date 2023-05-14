import React from "react";
import { Pressable, View } from "react-native";
import { NewCollectNotification } from "../../types/generated";
import formatAddress from "../../utils/formatAddress";
import getDifference from "../../utils/getDifference";
import getIPFSLink from "../../utils/getIPFSLink";
import Icon from "../Icon";
import Avatar from "../UI/Avatar";
import StyledText from "../UI/StyledText";
import getRawurl from "../../utils/getRawUrl";
import { useNavigation } from "@react-navigation/native";

type CollectNotificationProps = {
  notification: NewCollectNotification;
};

const CollectNotification: React.FC<CollectNotificationProps> = ({
  notification,
}) => {
  const navigation = useNavigation();
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
        <Pressable
          onPress={() => {
            navigation.navigate("Channel", {
              profileId: notification?.wallet?.defaultProfile?.id,
            });
          }}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Avatar
            src={getIPFSLink(
              getRawurl(notification?.wallet?.defaultProfile?.picture)
            )}
            height={35}
            width={35}
          />
          <StyledText
            title={getDifference(notification?.createdAt)}
            style={{ fontSize: 12, color: "gray" }}
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
