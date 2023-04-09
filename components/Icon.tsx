import React from "react";
import { View, StyleSheet, StyleProp, TextStyle } from "react-native";
import { useFonts } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";

const LensIcon = createIconSetFromIcoMoon(
  require("../assets/selection.json"),
  "IcoMoon",
  "icomoon.ttf"
);

export type IconProps = {
  name:
    | "arrowForward"
    | "arrowLeft"
    | "home_filled"
    | "home_outline"
    | "bug"
    | "terms"
    | "policy"
    | "mirror"
    | "chat"
    | "info"
    | "close"
    | "collect"
    | "comment"
    | "discord"
    | "desktop"
    | "edit"
    | "compass_filled"
    | "compass_outline"
    | "instagram"
    | "like"
    | "dislike"
    | "logout"
    | "mention"
    | "mail"
    | "follow"
    | "notification_outline"
    | "notification_filled"
    | "play"
    | "pause"
    | "replay"
    | "report"
    | "search"
    | "send"
    | "setting"
    | "share"
    | "shots_outline"
    | "shots_filled"
    | "twitter"
    | "upload"
    | "youtube"
    | "link"
    | "verified"
    | "arrowDown"
    | "star"
    | "copy"
    | "qr"
    | "referal"
    | "report"
    | "success"
    | "wallet"
    | "done"
    | "upload-file"
    | "record"
    | "create"
    | "delete"
  | "more"
  | string
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
};

function CustomIcon({ name, size = 26, color = "white", style }: IconProps) {
  const [fontsLoaded] = useFonts({
    IcoMoon: require("../assets/fonts/icomoon.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return <LensIcon name={name} size={size} color={color} style={style} />;
}
const Icon = React.memo(CustomIcon);
export default Icon;
