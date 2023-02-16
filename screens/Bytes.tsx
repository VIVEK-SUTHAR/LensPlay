import { View, Text, Dimensions } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import ByteCard from "../components/Bytes/ByteCard";
import Constants from "expo-constants";
const Bytes = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const StatusBarHeight = Constants.statusBarHeight;
  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: StatusBarHeight,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          zIndex: 1,
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Bytes
        </Text>
        <Feather name="camera" style={{ fontSize: 25, color: "white" }} />
      </View>
      <ByteCard />
    </View>
  );
};

export default Bytes;