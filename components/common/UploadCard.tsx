import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  View,
} from "react-native";
import StyledText from "../UI/StyledText";
import Heading from "../UI/Heading";
import Icon from "../Icon";

export default function UploadCard() {
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
      <View
        style={{
          position: "relative",
        }}
      >
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
        <View
          style={{
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.4)",
            width: "100%",
            height: "100%",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator />
        </View>
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
              title={"Uploading 94%"}
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
