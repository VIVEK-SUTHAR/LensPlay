import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { primary } from "../constants/Colors";

const Skleton = () => {
  return (
    <View
      style={{
        // paddingHorizontal: 10,
        marginVertical: 1,
        borderTopLeftRadius: 10,
      }}
    >
      <View
        style={{
          height: 150,
          backgroundColor: "rgba(255,255,255,0.02)",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      ></View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.02)",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              backgroundColor: "lightgray",
              minWidth: "80%",
              height: 10,
              borderRadius: 2,
            }}
          ></View>
          <View
            style={{
              backgroundColor: "lightgray",
              marginVertical: 8,
              width: "60%",
              height: 10,
              borderRadius: 2,
            }}
          ></View>
        </View>
        <View
          style={{
            height: 40,
            width: 40,
            backgroundColor: "lightgray",
            borderRadius: 40,
          }}
        ></View>
      </View>
    </View>
  );
};

export default Skleton;

const styles = StyleSheet.create({});
