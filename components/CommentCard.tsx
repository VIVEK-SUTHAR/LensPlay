import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { dark_secondary, primary } from "../constants/Colors";

type CommentCardProps = {
  avatar: string;
  username: string;
  commentText: string;
  commentTime: string;
};

const CommentCard = ({
  avatar,
  username,
  commentText,
  commentTime,
}: CommentCardProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: dark_secondary,
        padding: 5,
        marginVertical: 4,
        borderRadius: 12,
      }}
    >
      <View style={{ height: 40, width: 40, marginHorizontal: 5, padding: 2 }}>
        <Image
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 50,
            resizeMode: "contain",
          }}
          source={{
            uri: `https://ipfs.io/ipfs/${avatar?.split("//")[1]}`,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: primary }}>
          {username}
          <Text style={{ fontSize: 10, color: "white" }}>~{commentTime}</Text>
        </Text>
        <Text style={{ fontSize: 12, color: "white" }}>{commentText}</Text>
      </View>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({});
