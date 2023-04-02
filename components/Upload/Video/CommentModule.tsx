import React from "react";
import { Pressable, View } from "react-native";
import { dark_primary } from "../../../constants/Colors";
import Icon from "../../Icon";
import StyledText from "../../UI/StyledText";

export default function CommentModule({ sheetRef,activeModule }: { sheetRef: any,activeModule:string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 12,
        marginHorizontal: 8,
        borderRadius: 4,
        backgroundColor: dark_primary,
      }}
    >
      <View
        style={{
          maxWidth: "60%",
        }}
      >
        <StyledText
          title={"Who can comment"}
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "500",
          }}
        />
        <StyledText
          title={"By default, everyone can comment on your video"}
          style={{
            color: "gray",
            fontSize: 12,
            fontWeight: "500",
          }}
        />
      </View>
      <Pressable
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={(e) => {
          sheetRef?.current?.snapToIndex(0);
        }}
      >
        <StyledText
          title={activeModule}
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: "500",
            marginHorizontal: 2,
          }}
        />
        <Icon name="arrowDown" size={20} />
      </Pressable>
    </View>
  );
}
