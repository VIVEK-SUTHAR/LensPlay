import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { dark_primary } from "../constants/Colors";

const Uploadvideo = () => {
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
