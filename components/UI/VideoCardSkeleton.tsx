import React, { FC } from "react";
import { StyleProp, Text, TextStyle, View } from "react-native";

type videoCardProps = {
  width?: number | string;
};

const VideoCardSkeleton = ({ width = "auto" }: videoCardProps) => {
  return (
    <View
      style={{
        // paddingHorizontal: 10,
        paddingVertical: 1,
        borderRadius: 10,
        margin: 10,
        backgroundColor: "#111111",
        width: width,
      }}
    >
      <View
        style={{
          height: 200,
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: 10,
        }}
      ></View>
      <View
        style={{
          paddingVertical: 10,
          flexDirection: "row-reverse",
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "black",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            marginRight: 4,
            paddingHorizontal: 16,
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
