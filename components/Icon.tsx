import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { useFonts } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";

const CustomIcon = createIconSetFromIcoMoon(
  require("../assets/selection.json"),
  "IcoMoon",
  "icomoon.ttf"
);

export type IconName =
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
  | "rightArrow"
  | "referal"
  | "report"
  | "invite"
  | "success"
  | "wallet"
  | "done"
  | "upload-file"
  | "record"
  | "create"
  | "delete"
  | "more"
  | "pin"
  | "unpin"
  | "images"
  | "image"
  | "camera"
  ;
export type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
};
const Icon: React.FC<IconProps> = ({
  name,
  color = "white",
  size = 26,
  style,
}) => {
  const [fontsLoaded] = useFonts({
    IcoMoon: require("../assets/fonts/icomoon.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return <CustomIcon name={name} size={size} color={color} style={style} />;
};

export default React.memo(Icon);
