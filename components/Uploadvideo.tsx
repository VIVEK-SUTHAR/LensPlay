import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { dark_primary } from "../constants/Colors";
import { launchImageLibrary } from "react-native-image-picker";

const Uploadvideo = () => {
  async function getimage() {
    try {
      const result = await launchImageLibrary({
        mediaType: "video",
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: dark_primary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        onPress={getimage}
        style={{
          fontSize: 24,
          textAlign: "center",
          fontWeight: "700",
          color: "white",
        }}
      >
        Ye Umang banayega with logic
      </Text>
    </SafeAreaView>
  );
};

export default Uploadvideo;

const styles = StyleSheet.create({});
