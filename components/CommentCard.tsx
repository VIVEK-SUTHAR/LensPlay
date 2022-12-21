import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { dark_secondary, primary } from "../constants/Colors";
import getDifference from "../utils/getDifference";

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
        backgroundColor: 'black',
        padding: 8,
        marginVertical: 4,
        borderRadius: 8,
      }}
    >
      <View style={{ height: 40, width: 40, marginRight: 8 }}>
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
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 12, color: 'gray' }}>{username}</Text>
          <Text style={{ fontSize: 10, color: "gray" }}>{getDifference(commentTime)}</Text>
        </View>
        <Text style={{ fontSize: 14, color: "white", fontWeight: '600' }}>{commentText}</Text>
      </View>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({});
