import { Image, Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import getIPFSLink from "../utils/getIPFSLink";
import { RootStackScreenProps } from "../types/navigation/types";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import Icon from "../components/Icon";
const StatusBarHeight = Constants.statusBarHeight;

const FullImage = ({
  navigation,
  route,
}: RootStackScreenProps<"FullImage">) => {
  const isAvatar = route.params.source === "avatar";
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" style="auto" />
      <View style={styles.headerStyle}>
        <Pressable
          onPress={() => {
            navigation.pop();
          }}
        >
          <Icon name="arrowLeft" />
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: getIPFSLink(route.params.url) }}
          style={isAvatar ? styles.avatarStyle : styles.imageStyle}
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
  headerStyle: {
    position: "absolute",
    top: StatusBarHeight,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  imageContainer: {
    width: "100%",
    height: 300,
  },
  imageStyle: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  avatarStyle: {
    height: "100%",
    width: "90%",
    alignSelf: "center",
    resizeMode: "contain",
    borderRadius: 500,
  },
});
