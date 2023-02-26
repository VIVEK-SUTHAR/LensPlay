import { View, Text, Dimensions, Pressable } from "react-native";
import React from "react";
import ByteCard from "../components/Bytes/ByteCard";
import Constants from "expo-constants";
import { RootTabScreenProps } from "../types/navigation/types";
import Icon from "../components/Icon";
const Bytes = ({ navigation }: RootTabScreenProps<"Bytes">) => {
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
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Bytes
        </Text>
        <Pressable
          onPress={(e) => {
            e.preventDefault();
            navigation.navigate("Search");
          }}
        >
          <Icon name="search" size={25} />
        </Pressable>
      </View>
      <ByteCard />
    </View>
  );
};

export default Bytes;
