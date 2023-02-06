import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { SafeAreaView, TextInput, View } from "react-native";
import searchUser from "../api/zooTools/searchUser";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import { RootStackScreenProps } from "../types/navigation/types";

export default function Waitlist({
  navigation,
}: RootStackScreenProps<"Waitlist">) {
  const [email, setEmail] = useState<string>("");
  const [userData, setUserData] = useState(null);

  const handleUser = async (email: string) => {
    const data = await searchUser(email);
    console.log(data);
    setUserData(data);
    const handleUser = {
      email: email,
      hasAccess: data.fields.hasAccess,
    };
    await AsyncStorage.setItem("@access_Key", JSON.stringify(handleUser));
    if (data.fields.hasAccess) {
      navigation.push("Waitlist");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: "80%" }}>
        <TextInput
          selectionColor={"black"}
          placeholder="Enter your email"
          placeholderTextColor={"black"}
          value={email}
          onChange={(e) => {
            setEmail(e.nativeEvent.text);
          }}
          style={{
            width: "100%",
            color: "black",
            backgroundColor: "white",
            borderRadius: 50,
            paddingHorizontal: 16,
            paddingVertical: 8,
            fontWeight: "700",
            fontSize: 16,
            marginBottom: 16,
          }}
        />
        <Button
          title={"Check"}
          onPress={() => {
            setEmail("");
            handleUser(email);
          }}
          px={8}
          py={16}
          width={"auto"}
          type={"filled"}
          textStyle={{
            fontSize: 24,
            fontWeight: "700",
            color: "black",
          }}
          bg="white"
        />
      </View>
      {!userData?.fields?.hasAccess ? (
        <Heading
          title="You will get access soon"
          style={{ fontSize: 24, color: "white", marginVertical: 10 }}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}
