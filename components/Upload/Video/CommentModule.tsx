import React from "react";
import { Pressable, View } from "react-native";
import { dark_primary } from "../../../constants/Colors";
import Icon from "../../Icon";
import StyledText from "../../UI/StyledText";

export default function CommentModule({
  sheetRef,
  activeModule,
}: {
  sheetRef: any;
  activeModule: string;
}) {
  return (
    <Pressable
      style={{
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginHorizontal: 8,
        borderRadius: 8,
        backgroundColor: dark_primary,
        marginVertical: 8,
      }}
      onPress={(e) => {
        sheetRef?.current?.snapToIndex(0);
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
          title={"Who can comment"}
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "500",
            maxWidth: "75%",
          }}
        />
        <StyledText
          title={activeModule}
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
          title={"By default, everyone can comment on your video"}
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
