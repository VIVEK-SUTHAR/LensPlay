import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
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
  const getNotificationIcon = () => {
    switch (type) {
      case "NewReactionNotification":
        return <AntDesign name="heart" size={26} color={primary} />;
      case "NewFollowerNotification":
        return <SimpleLineIcons name="user-follow" size={26} color={primary} />;
      case "NewCollectNotification":
        return (
          <MaterialIcons name="video-collection" size={26} color={primary} />
        );
      case "NewMirrorNotification":
        return <Ionicons name="ios-repeat" size={26} color={primary} />;
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
        borderRadius: 8,
      }}
    >
      <View
        style={{
          height: 40,
          width: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {getNotificationIcon(type)}
        {/* <AntDesign name={getNotificationIcon(type)} size={26} color={primary} /> */}
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
