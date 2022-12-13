import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { dark_primary } from "../constants/Colors";

const GoLive = () => {
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
        Coming Soon...
      </Text>
    </SafeAreaView>
  );
};

export default GoLive;

const styles = StyleSheet.create({});
