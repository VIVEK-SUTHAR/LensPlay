import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Maybe } from "../../types/generated";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import { white } from "../../constants/Colors";

type VideoMetaProps = {
  title: Maybe<string> | undefined;
  description: string;
  descRef: React.RefObject<BottomSheetMethods>;
};

const VideoMeta = (props: VideoMetaProps) => {
  const { title, description, descRef } = props;

  const onPress = useCallback(() => {
    descRef?.current?.snapToIndex(0);
  }, []);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Heading
          title={title}
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: "white",
            maxWidth: 300,
          }}
        />
      </View>
      <View style={{ marginTop: 8, flexDirection: "row" }}>
        <StyledText
          title={description}
          style={{ color: "gray", fontSize: 14, maxWidth: "80%" }}
          numberOfLines={1}
        />
        {description?.length > 0 && (
          <Pressable
            android_ripple={{
              color: "darkgray",
            }}
            onPress={(e) => {
              e.preventDefault();
              onPress();
            }}
          >
            <StyledText
              title={" more"}
              style={{ color: white[600], fontSize: 14 }}
            />
          </Pressable>
        )}
      </View>
    </>
  );
};

export default VideoMeta;

const styles = StyleSheet.create({});
