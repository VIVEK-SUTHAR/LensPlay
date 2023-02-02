import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import getIPFSLink from "../../utils/getIPFSLink";
import { LinearGradient } from "expo-linear-gradient";

type CoverProps = {
  url: string;
};

const Cover = ({ url }: CoverProps) => {
  return (
    <View
      style={{
        height: 180,
        marginBottom: 34,
      }}
    >
      <Image
        source={{
          uri: getIPFSLink(url),
        }}
        style={{
          height: "100%",
          width: "100%",
          resizeMode: "cover",
        }}
      />
      <LinearGradient
        colors={["transparent", "black"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "relative",
          height: 50,
          marginTop: -50,
          zIndex: 12,
        }}
      ></LinearGradient>
    </View>
  );
};

export default Cover;

const styles = StyleSheet.create({});
