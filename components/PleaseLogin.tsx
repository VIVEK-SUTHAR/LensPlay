import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStore } from "../store/Store";
import Button from "./UI/Button";
import Heading from "./UI/Heading";

export default function PleaseLogin() {
  const { PRIMARY } = useThemeStore();
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Heading
        title="please login"
        style={{
          fontSize: 24,
          color: "white",
          fontWeight: "600",
        }}
      />
      <Button
        title="Login"
        width="50%"
        my={16}
        py={8}
        bg={PRIMARY}
        textStyle={{ fontSize: 16, fontWeight: "600" }}
        onPress={() => navigation.navigate("Login")}
      />
    </SafeAreaView>
  );
}
