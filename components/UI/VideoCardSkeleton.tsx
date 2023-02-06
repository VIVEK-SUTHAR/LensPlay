import React, { FC } from "react";
import { StyleProp, Text, TextStyle, View } from "react-native";

type videoCardProps = {
  width?: number | string;
}

const VideoCardSkeleton = ({ width = "auto" }: videoCardProps) => {
  return (
    <View
      style={{
        // paddingHorizontal: 10,
        paddingVertical: 1,
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#111111',
        width: width
      }}
    >
      <View
        style={{
          height: 200,
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: 10
        }}
      ></View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#111111",
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
              marginVertical: 8,
              width: "50%",
              height: 10,
              borderRadius: 2,
            }}
          ></View>
          <View
            style={{
              backgroundColor: "lightgray",
              minWidth: "70%",
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

export default VideoCardSkeleton;