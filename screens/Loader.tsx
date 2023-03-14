import React, { useEffect } from "react";
import AnimatedLottieView from "lottie-react-native";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { RootStackScreenProps } from "../types/navigation/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import verifyTokens from "../utils/lens/verifyTokens";
import getAccessFromRefresh from "../utils/lens/getAccessFromRefresh";
import storeTokens from "../utils/storeTokens";
import handleWaitlist from "../utils/handleWaitlist";

export default function Loader({ navigation }: RootStackScreenProps<"Loader">) {
  const getLocalStorage = async () => {
    try {
      const waitList = await AsyncStorage.getItem("@waitlist");
      const userTokens = await AsyncStorage.getItem("@user_Tokens");
      if (userTokens) {
        const accessToken = JSON.parse(userTokens).accessToken;
        const refreshToken = JSON.parse(userTokens).refreshToken;
        if (waitList) {
          const isvalidTokens = await verifyTokens(accessToken);
          if (isvalidTokens) {
            const address = JSON.parse(waitList).address;
            const hasAccess = await handleWaitlist(navigation, address);
            if (hasAccess) {
              navigation.replace("Root");
            } else {
              navigation.replace("JoinWaitlist");
            }
          } else {
            const newTokens = await getAccessFromRefresh(refreshToken);
            await storeTokens(newTokens?.accessToken, newTokens?.refreshToken);
            navigation.replace("Root");
          }
        } else {
          navigation.replace("Login");
        }
      } else {
        navigation.replace("Login");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("[Error]:Error in accessing local storage");
        throw new Error("[Error]:Error in accessing local storage", {
          cause: error,
        });
      }
    }
  };

  useEffect(() => {
    getLocalStorage();
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
