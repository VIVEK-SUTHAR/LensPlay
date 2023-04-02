import React from "react";
import { Pressable, View } from "react-native";
import { dark_primary } from "../../../constants/Colors";
import StyledText from "../../UI/StyledText";
import Heading from "../../UI/Heading";
import Icon from "../../Icon";

export default function CollectModule({ collectRef }: { collectRef: any }) {
  return (
    <Pressable
      style={{
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginHorizontal: 8,
        borderRadius: 8,
        backgroundColor: dark_primary,
        marginTop: 16,
        marginBottom: 8,
      }}
      onPress={(e) => {
        collectRef?.current?.snapToIndex(0);
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <StyledText
          title={"Who can collect"}
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "500",
            maxWidth: "75%",
          }}
        />
        <StyledText
          title={"Free"}
          style={{
            color: "gray",
            fontSize: 12,
            fontWeight: "500",
            marginHorizontal: 2,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <StyledText
          title={"By default, no one can collect this video"}
          style={{
            color: "gray",
            fontSize: 12,
            fontWeight: "500",
            maxWidth: "65%",
          }}
        />
        <Icon name="arrowForward" size={16} />
      </View>
    </Pressable>
  );
}
