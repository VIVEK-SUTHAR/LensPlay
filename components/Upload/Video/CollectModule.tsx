import React from "react";
import { Pressable } from "react-native";
import { dark_primary } from "../../../constants/Colors";
import StyledText from "../../UI/StyledText";

export default function CollectModule({ collectRef }: { collectRef: any }) {
  return (
    <Pressable
      style={{
        padding: 12,
        marginHorizontal: 8,
        borderRadius: 4,
        marginVertical: 16,
        backgroundColor: dark_primary,
      }}
      onPress={(e) => {
        e.preventDefault();
        collectRef?.current?.snapToIndex(0);
      }}
    >
      <StyledText
        title="Collect Settings"
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "500",
        }}
      />
      <StyledText
        title="You can also set whether this video is collectible or not"
        style={{
          color: "gray",
          fontSize: 14,
          fontWeight: "500",
          maxWidth: "95%",
        }}
      />
    </Pressable>
  );
}
