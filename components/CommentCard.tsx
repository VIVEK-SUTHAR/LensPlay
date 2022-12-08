import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { primary } from "../constants/Colors";

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
        backgroundColor: "white",
        padding: 5,
        borderRadius: 12,
      }}
    >
      <View style={{ height: 40, width: 40, flex: 0.2 }}>
        <Image
          style={{ height: "100%", width: "100%", borderRadius: 30 }}
          source={{
            uri: `https://ipfs.io/ipfs/${avatar.split("//")[1]}`,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: primary }}>{username}</Text>
        <Text style={{ fontSize: 12 }}>{commentText}</Text>
      </View>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({});
