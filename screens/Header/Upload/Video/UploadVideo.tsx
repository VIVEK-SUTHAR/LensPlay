import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { RootStackScreenProps } from "../../../../types/navigation/types";

export default function UploadVideo({
  navigation,
}: RootStackScreenProps<"UploadVideo">) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    ></SafeAreaView>
  );
}
