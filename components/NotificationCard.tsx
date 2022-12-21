import {
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import React, { FC } from "react";
import { Image, Text, View } from "react-native";
import { dark_secondary } from "../constants/Colors";
import formatAddress from "../utils/formatAddress";
import getDifference from "../utils/getDifference";
import getIPFSLink from "../utils/getIPFSLink";
import Avatar from "./UI/Avatar";

interface NotificationsProps {
  title: string;
  subtitle: string;
  type: string;
  notification: any;
}

const NotificationCard: FC<NotificationsProps> = ({
  title,
  subtitle,
  notification,
  type,
  ...rest
}) => {
  const getNotificationIcon = () => {
    switch (type) {
      case "NewReactionNotification":
        return <AntDesign name="heart" size={24} color={"#E60073"} />;
      case "NewFollowerNotification":
        return <AntDesign name="adduser" size={24} color={"#9a76e0"} />;
      case "NewCollectNotification":
        return <Entypo name="folder-video" size={24} color={"coral"} />;
      case "NewMirrorNotification":
        return <AntDesign name="retweet" size={24} color={"#6bd841"} />;
    }
  };

  const getNotificationContent = () => {
    switch (type) {
      case "NewFollowerNotification":
        return (
          <View>
            <Avatar src={getIPFSLink(
                    notification?.wallet?.defaultProfile?.picture?.original?.url
                  )} height={35} width={35}/>
            <Text style={{ color: "gray", fontSize: 14 }}>
              <Text style={{ color: "white", fontWeight: "500" }}>
                {notification?.wallet?.defaultProfile?.handle ||
                  formatAddress(notification?.wallet?.address)}{" "}
              </Text>
              followed you
              <Text style={{ fontSize: 10, color: "gray" }}>
                {" "}
                {getDifference(notification?.createdAt)}
              </Text>
            </Text>
          </View>
        );
      case "NewCollectNotification":
        return (
          <View>
            <Avatar src={getIPFSLink(
                    notification?.wallet?.defaultProfile?.picture?.original?.url
                  )} height={35} width={35}/>
            <Text style={{ color: "gray", fontSize: 14 }}>
              <Text style={{ color: "white", fontWeight: "500" }}>
                {notification?.wallet?.defaultProfile?.handle ||
                  formatAddress(notification?.wallet?.address)}{" "}
              </Text>
              collected your post
              <Text style={{ fontSize: 10, color: "gray" }}>
                {" "}
                {getDifference(notification?.createdAt)}
              </Text>
            </Text>
          </View>
        );
      case "NewMirrorNotification":
        return (
          <View>
            <Avatar src={getIPFSLink(
                    notification?.wallet?.defaultProfile?.picture?.original?.url
                  )} height={35} width={35}/>
            <Text style={{ color: "gray", fontSize: 14 }}>
              <Text style={{ color: "white", fontWeight: "600" }}>
                {notification?.profile?.handle?.split(".")[0] ||
                  formatAddress(notification?.wallet?.address)}{" "}
              </Text>
              mirrored your post
              <Text style={{ fontSize: 10, color: "gray" }}>
                {" "}
                {getDifference(notification?.createdAt)}
              </Text>
            </Text>
            <View>
              <Text style={{ color: "grey", fontSize: 12 }}>
                {notification?.publication?.metadata?.description}
              </Text>
            </View>
          </View>
        );
      case "NewReactionNotification":
        return (
          <View>
            <Avatar src={getIPFSLink(
                    notification?.wallet?.defaultProfile?.picture?.original?.url
                  )} height={35} width={35}/>
            <Text style={{ color: "gray", fontSize: 14 }}>
              <Text style={{ color: "white", fontWeight: "600" }}>
                {notification?.profile?.handle ||
                  formatAddress(notification?.wallet?.address)}{" "}
              </Text>
              liked your{" "}
              {notification?.publication?.__typename == "Post"
                ? "post"
                : notification?.publication?.__typename == "Comment"
                ? "comment"
                : "mirror"}
              <Text style={{ fontSize: 10, color: "gray" }}>
                {" "}
                {getDifference(notification?.createdAt)}
              </Text>
            </Text>
            <View>
              <Text style={{ color: "grey", fontSize: 12 }}>
                {notification?.publication?.metadata?.description}
              </Text>
            </View>
          </View>
        );
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: dark_secondary,
        padding: 8,
        marginVertical: 4,
        marginHorizontal: 8,
        // borderBottomColor: "gray",
        // borderBottomWidth:1,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          height: 35,
          width: 35,
          marginHorizontal: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {getNotificationIcon()}
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {getNotificationContent()}
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;
