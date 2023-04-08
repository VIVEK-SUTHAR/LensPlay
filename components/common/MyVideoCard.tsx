import React from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import StyledText from "../UI/StyledText";
import Heading from "../UI/Heading";
import Icon from "../Icon";

type MyVideoCardProps = {
  title: string;
  time: string;
  poster: string;
};

export default function MyVideoCard({ title, time, poster }: MyVideoCardProps) {
  return (
    <Pressable
      android_ripple={{
        color: "gray",
      }}
      style={{
        flexDirection: "row",
        maxWidth: Dimensions.get("window").width,
        padding: 16,
      }}
    >
      <View>
        <Image
          source={{
            uri:
              "https://images.unsplash.com/photo-1680693377318-63eb48d33056?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          }}
          style={{
            width: 140,
            height: 80,
            borderRadius: 8,
          }}
        />
      </View>
      <View
        style={{
          height: "100%",
          width: "58%",
          marginLeft: 8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "80%",
          }}
        >
          <Heading
            title="Hello this is firt ivrvn kjfkk sdfn  slkns d skdnfk ksdn ksd k kdfkjs lsndl sd"
            style={{ color: "white", fontSize: 14, fontWeight: "400" }}
            numberOfLines={3}
          />
          <View
            style={{
              marginTop: 2,
            }}
          >
            <StyledText
              title={"1 year ago"}
              style={{ color: "gray", fontSize: 12 }}
            />
          </View>
        </View>
        <Pressable>
          <Icon name="arrowDown" size={16} />
        </Pressable>
      </View>
    </Pressable>
  );
}
