import React from "react";
import {
  NativeSyntheticEvent,
  SafeAreaView,
  TextInputChangeEventData,
  View,
} from "react-native";
import Heading from "../../components/UI/Heading";
import { black, white } from "../../constants/Colors";
import Input from "../../components/UI/Input";
import { TextInput } from "react-native";
import Button from "../../components/UI/Button";
import { Image } from "expo-image";

export default function InviteCode() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          flex: 0.5,
          padding: 16,
        }}
      >
        <Image
          source={require("../../assets/images/home.png")}
          style={{
            flex: 1,
          }}
          contentFit="contain"
        />
      </View>
      <View
        style={{
          alignItems: "center",
          padding: 16,
        }}
      >
        <Heading
          title={"Have an invite code?"}
          style={{
            color: white[800],
            fontWeight: "600",
            fontSize: 36,
          }}
        />
        <TextInput
          placeholder="Enter a code"
          placeholderTextColor={"white"}
          style={{
            paddingVertical: 16,
            paddingHorizontal: 16,
            fontSize: 20,
            marginVertical: 24,
            width: "100%",
            backgroundColor: black[400],
            borderRadius: 8,
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 16,
          padding: 16,
          width: "100%",
        }}
      >
        <Button
          title={"Submit"}
          py={16}
          textStyle={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "600",
          }}
        />
      </View>
    </SafeAreaView>
  );
}
