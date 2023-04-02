import React, { useState } from "react";
import { View } from "react-native";
import StyledText from "../../UI/StyledText";
import Switch from "../../UI/Switch";
import { primary } from "../../../constants/Colors";

export default function CommentModule() {
  const [comment, setIsComment] = useState<boolean>(false);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 8,
      }}
    >
      <View
        style={{
          maxWidth: "80%",
        }}
      >
        <StyledText
          title={"Only Followers can comment"}
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "500",
          }}
        />
        <StyledText
          title={
            "Only profiles that follow you will be able to comment on this video"
          }
          style={{
            color: "gray",
            fontSize: 14,
            fontWeight: "500",
          }}
        />
      </View>
      <Switch
        value={comment}
        handleOnPress={() => {
          setIsComment(!comment);
        }}
        activeTrackColor={primary}
        inActiveTrackColor="rgba(255,255,255,0.2)"
        thumbColor="white"
      />
    </View>
  );
}
