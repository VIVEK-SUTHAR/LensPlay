import React from "react";
import { RootStackScreenProps } from "../../types/navigation/types";
import { SafeAreaView } from "react-native";

export default function VideoTypes({
  navigation,
}: RootStackScreenProps<"AddDetails">) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    ></SafeAreaView>
  );
}
