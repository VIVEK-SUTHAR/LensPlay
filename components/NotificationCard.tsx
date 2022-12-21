import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React, { FC } from "react";
import { Image, Text, TextStyle, View } from "react-native";
import { dark_primary, dark_secondary, primary } from "../constants/Colors";
import formatAddress from "../utils/formatAddress";
import convertDate from "../utils/formateDate";
import getIPFSLink from "../utils/getIPFSLink";

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
  console.log(notification);
  const getNotificationIcon = () => {
    switch (type) {
      case "NewReactionNotification":
        return <AntDesign name="heart" size={26} color={primary} />;
      case "NewFollowerNotification":
        return <AntDesign name="adduser" size={26} color={primary} />;
      case "NewCollectNotification":
        return (
          <MaterialIcons name="video-collection" size={26} color={primary} />
        );
      case "NewMirrorNotification":
        return <AntDesign name="retweet" size={26} color={primary} />;
    }
  };

  const getNotificationContent = () => {
    switch (type) {
      case "NewFollowerNotification":
        return (
          <View>
            <View style={{ height: 35, width: 35 }}>
              <Image
                source={{
                  uri: getIPFSLink(
                    notification?.wallet?.defaultProfile?.picture?.original?.url
                  ),
                }}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 50,
                  resizeMode: "contain",
                }}
              />
            </View>
            <Text style={{ color: "white", fontSize: 14 }}>
              {notification?.wallet?.defaultProfile?.handle ||
                formatAddress(notification?.wallet?.address)}{" "}
              followed you
              <Text style={{ fontSize: 10, color: "gray" }}>
                {" "}
                &middot; {convertDate(notification?.createdAt)}
              </Text>
            </Text>
          </View>
        );
      case "NewCollectNotification":
        return (
          <View>
            <View style={{ height: 35, width: 35 }}>
              <Image
                source={{
                  uri: getIPFSLink(
                    notification?.wallet?.defaultProfile?.picture?.original?.url
                  ),
                }}
                style={{ height: "100%", width: "100%", borderRadius: 500 }}
              />
            </View>
            <Text style={{ color: "white", fontSize: 14 }}>
              {notification?.wallet?.defaultProfile?.handle ||
                formatAddress(notification?.wallet?.address)}{" "}
              collected your post
              <Text style={{ fontSize: 10, color: "gray" }}>
                {" "}
                &middot; {convertDate(notification?.createdAt)}
              </Text>
            </Text>
          </View>
        );
      case "NewMirrorNotification":
        return (
          <View>
            <View style={{ height: 35, width: 35 }}>
              <Image
                source={{
                  uri: getIPFSLink(
                    notification?.profile?.picture?.original?.url
                  ),
                }}
                style={{ height: "100%", width: "100%", borderRadius: 500 }}
              />
            </View>
            <Text style={{ color: "white", fontSize: 14 }}>
              {notification?.profile?.handle ||
                formatAddress(notification?.wallet?.address)}{" "}
              mirrored your post
              <Text style={{ fontSize: 10, color: "gray" }}>
                {" "}
                &middot; {convertDate(notification?.createdAt)}
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
            <View style={{ height: 35, width: 35 }}>
              <Image
                source={{
                  uri: getIPFSLink(
                    notification?.profile?.picture?.original?.url
                  ),
                }}
                style={{ height: "100%", width: "100%", borderRadius: 500 }}
              />
            </View>
            <Text style={{ color: "white", fontSize: 14 }}>
              {notification?.profile?.handle ||
                formatAddress(notification?.wallet?.address)}{" "}
              liked your{" "}
              {notification?.publication?.__typename == "Post"
                ? "post"
                : notification?.publication?.__typename == "Comment"
                ? "comment"
                : "mirror"}
              <Text style={{ fontSize: 10, color: "gray" }}>
                {" "}
                &middot; {convertDate(notification?.createdAt)}
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
