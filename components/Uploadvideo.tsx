import { ImagePickerIOS, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { dark_primary } from "../constants/Colors";
import { launchImageLibrary } from "react-native-image-picker";
const Uploadvideo = () => {
  async function getimage() {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
      });
      console.log(result.errorCode);
    } catch (error) {}
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:"black",
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
