import React from "react";
import { View, StyleSheet, StyleProp, TextStyle } from "react-native";
import { useFonts } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";

const LensIcon = createIconSetFromIcoMoon(
  require("../assets/selection.json"),
  "IcoMoon",
  "icomoon.ttf"
);

type IconProps = {
  name:
    | "home-filled"
    | "home-outline"
    | "arrow-right"
    | "back"
    | "mirror"
    | "chat-alt-3"
    | "close"
    | "collect"
    | "comment"
    | "discord"
    | "edit"
    | "explore-filled"
    | "explore-outline"
    | "go-to"
    | "instagram"
    | "like"
    | "dislike"
    | "logout"
    | "mention"
    | "messages"
    | "new-follow"
    | "notifications"
    | "play"
    | "pause"
    | "replay"
    | "report"
    | "search"
    | "senf"
    | "settings"
    | "share"
    | "shots"
    | "twitter"
    | "upload"
    | "youtube";
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
};

export default function Icon({
  name,
  size = 26,
  color = "white",
  style,
  fill,
}: IconProps) {
  const [fontsLoaded] = useFonts({
    IcoMoon: require("../assets/fonts/icomoon.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <LensIcon name={name} size={size} color={color} style={style} />;
}
