import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import getIPFSLink from "../utils/getIPFSLink";
import { RootStackScreenProps } from "../types/navigation/types";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
const FullImage = ({
  navigation,
  route,
}: RootStackScreenProps<"FullImage">) => {
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const StatusBarHeight = Constants.statusBarHeight;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: getRandomColor() }]}
    >
      <StatusBar backgroundColor="transparent" style="auto" />
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
        <Feather
          name="arrow-left"
          size={28}
          color={"white"}
          onPress={(e) => {
            e.preventDefault();
            navigation.goBack();
          }}
        />
      </View>
      <View style={{ width: "100%", height: 300, aspectRatio: 2 }}>
        <Image
          source={{ uri: getIPFSLink(route.params.url) }}
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FullImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
