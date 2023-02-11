import React, { useEffect } from "react";
import AnimatedLottieView from "lottie-react-native";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { RootStackScreenProps } from "../types/navigation/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import searchUser from "../api/zooTools/searchUser";
import useStore from "../store/Store";

export default function Loader({
  navigation,
}: RootStackScreenProps<"Waitlist">) {
  const { handleAccess } = useStore();
  let isLoading: boolean = true;

  const isWaitListed = async () => {
    const userData = await AsyncStorage.getItem("@access_Key");
    if (userData) {
      const user = JSON.parse(userData);
      const data = await searchUser(user.email);
      const handleUser = {
        email: user.email,
        hasAccess: data.fields.hasAccess,
      };
      await AsyncStorage.setItem("@access_Key", JSON.stringify(handleUser));
      isLoading = false;
      handleAccess(data.fields.hasAccess);
      if (data.fields.hasAccess) {
        navigation.push("Root");
      } else {
        navigation.push("Waitlist");
      }
    } else {
      navigation.push("Waitlist");
    }
  };

  useEffect(() => {
    if (isLoading) {
      isWaitListed();
    }
  }, []);

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <StatusBar style="light" backgroundColor="transparent" />
      <AnimatedLottieView
        autoPlay
        style={{
          height: "auto",
        }}
        source={require("../assets/loader.json")}
      />
    </View>
  );
}
