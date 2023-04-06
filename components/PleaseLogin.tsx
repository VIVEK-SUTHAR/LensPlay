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
        title="You can't access this screen in guest mode, Please Login to continue"
        style={{
          fontSize: 20,
          color: "white",
          fontWeight: "600",
          marginBottom: 16,
          paddingHorizontal: 8,
          textAlign: 'center'
        }}
      />
      <Button
        title="Login"
        width="50%"
        my={16}
        py={8}
        px={2}
        bg={PRIMARY}
        textStyle={{ fontSize: 20, fontWeight: "600" }}
        onPress={() => navigation.navigate("Login")}
      />
    </SafeAreaView>
  );
}
