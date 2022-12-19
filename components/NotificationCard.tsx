import { AntDesign, Feather } from "@expo/vector-icons";
import React, { FC } from "react";
import { Text, TextStyle, View } from "react-native";
import { dark_secondary, primary } from "../constants/Colors";

interface NotificationsProps {
  title: string;
  subtitle: string;
  type: string;
}

const NotificationCard: FC<NotificationsProps> = ({
  title,
  subtitle,
  type,
  ...rest
}) => {
  console.log(type);

  const getNotificationIcon = (EnumType: string) => {
    let iconName = "";
    switch (type) {
      case "NewReactionNotification":
        iconName = "heart";
        break;
      case "NewFollowerNotification":
        iconName = "adduser";
        break;
      case "NewCollectNotification":
        iconName = "addfile";
        break;
      case "NewMirrorNotification":
        iconName = "retweet";
        break;
    }
    return iconName;
  };

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: dark_secondary,
        padding: 8,
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius: 8,
      }}
    >
      <View style={{ height: 40, width: 40, marginRight: 8 }}>
        <AntDesign name={getNotificationIcon(type)} size={26} color={primary} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 12, color: "gray" }}>{type}</Text>
          <Text style={{ fontSize: 10, color: "gray" }}>45 sep</Text>
        </View>
        <Text style={{ fontSize: 12, color: "white", fontWeight: "600" }}>
          goes here
        </Text>
      </View>
    </View>
  );
};

export default NotificationCard;
