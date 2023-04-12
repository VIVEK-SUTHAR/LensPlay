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
          height: 160,
          backgroundColor: "#1d1d1d",
          // borderTopEndRadius:8,
          // borderTopLeftRadius:8,
          borderRadius: 10,
        }}
      ></View>
      <View
        style={{
          paddingVertical: 10,
          flexDirection: "row-reverse",
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "#111111",
          borderRadius:10,
          // borderBottomLeftRadius: 10,
          // borderBottomRightRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            marginRight: 4,
            paddingHorizontal: 8,
            
          }}
        >
          <View
            style={{
              backgroundColor: "#1d1d1d",
              marginVertical: 8,
              width: "50%",
              height: 10,
              borderRadius: 2,
            }}
          ></View>
          <View
            style={{
              backgroundColor: "#1d1d1d",
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
            backgroundColor: "#1d1d1d",
            borderRadius: 40,
            marginLeft:8,
          }}
        ></View>
      </View>
    </View>
  );
};

export default VideoCardSkeleton;
