import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { dark_secondary, primary } from "../constants/Colors";
import getDifference from "../utils/getDifference";
import Heading from "./UI/Heading";
import SubHeading from "./UI/SubHeading";
import Hyperlink from 'react-native-hyperlink'

type CommentCardProps = {
  avatar: string;
  username: string;
  commentText: string;
  commentTime: string;
  id: string;
  navigation: any;
};

const CommentCard = ({
  avatar,
  username,
  commentText,
  commentTime,
  id,
  navigation,
}: CommentCardProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "black",
        padding: 8,
        marginVertical: 4,
        borderRadius: 8,
      }}
    >
      <View style={{ height: 40, width: 40, marginRight: 8 }}>
        <Pressable
          onPress={() => {
            navigation.navigate("Channel", {
              profileId: id,
            });
          }}
        >
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
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Heading title={username} style={{ fontSize: 12, color: "gray" }} />
          <SubHeading
            title={getDifference(commentTime)}
            style={{ fontSize: 10, color: "gray" }}
          />
        </View>
       
        <Hyperlink linkDefault={true} linkStyle={ { color: '#2980b9' } }>
        <Text style={{ fontSize: 14, color: "white", fontWeight: "600" }}>{commentText}</Text>
        </Hyperlink>
      </View>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({});
