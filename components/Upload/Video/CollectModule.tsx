import React, { useState } from "react";
import { View } from "react-native";
import StyledText from "../../UI/StyledText";
import Switch from "../../UI/Switch";
import { primary } from "../../../constants/Colors";

export default function CollectModule() {
  const [collect, setIsCollect] = useState<boolean>(false);

  return (
    <View
      style={{
        flexDirection: "row",
        // alignItems: "center",
        justifyContent: "space-between",
        padding: 8,
        marginVertical: 16,
      }}
    >
      <View
        style={{
          maxWidth: "80%",
        }}
      >
        <StyledText
          title={"Only Followers can collect"}
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "500",
          }}
        />
        <StyledText
          title={
            "Only profiles that follow you will be able to collect this video"
          }
          style={{
            color: "gray",
            fontSize: 14,
            fontWeight: "500",
          }}
        />
      </View>
      <Switch
        value={collect}
        handleOnPress={() => {
          setIsCollect(!collect);
        }}
        activeTrackColor={primary}
        inActiveTrackColor="rgba(255,255,255,0.2)"
        thumbColor="white"
      />
    </View>
  );
}
