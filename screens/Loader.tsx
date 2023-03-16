import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import AnimatedLottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useAuthStore, useProfile } from "../store/Store";
import { RootStackScreenProps } from "../types/navigation/types";
import handleWaitlist from "../utils/handleWaitlist";
import getAccessFromRefresh from "../utils/lens/getAccessFromRefresh";
import getDefaultProfile from "../utils/lens/getDefaultProfile";
import verifyTokens from "../utils/lens/verifyTokens";
import storeTokens from "../utils/storeTokens";

export default function Loader({ navigation }: RootStackScreenProps<"Loader">) {
  const { setCurrentProfile, setHasHandle } = useProfile();
  const { setAccessToken, setRefreshToken } = useAuthStore();

  async function HandleDefaultProfile(adress: string) {
    const userDefaultProfile = await getDefaultProfile(adress);
    if (userDefaultProfile) {
      setHasHandle(true);
      setCurrentProfile(userDefaultProfile);
    } else {
      setHasHandle(false);
    }
  }

  const getLocalStorage = async () => {
    try {
      const waitList = await AsyncStorage.getItem("@waitlist");
      const userTokens = await AsyncStorage.getItem("@user_tokens");

      if (!userTokens) {
        navigation.replace("Login");
        return;
      }

      if (userTokens) {
        const accessToken = JSON.parse(userTokens).accessToken;
        const refreshToken = JSON.parse(userTokens).refreshToken;

        if (!waitList) {
          navigation.replace("Login");
          return;
        }

        if (waitList) {
          const address = JSON.parse(waitList).address;
          const userData = await handleWaitlist(address);

          if (!userData.fields.hasAccess) {
            navigation.replace("LeaderBoard", {
              referralsCount: userData.referralsCount,
              rankingPoints: userData.rankingPoints,
              rankingPosition: userData.rankingPosition,
              refferalLink: `https://form.waitlistpanda.com/go/${userData.listId}?ref=${userData.id}`,
            });
          }

          if (userData?.statusCode === 404) {
            navigation.replace("JoinWaitlist");
            return;
          }

          if (userData.fields.hasAccess) {
            const isvalidTokens = await verifyTokens(accessToken);
            if (isvalidTokens) {
              setAccessToken(accessToken);
              setRefreshToken(refreshToken);
              await HandleDefaultProfile(address);
              navigation.replace("Root");
            } else {
              const newTokens = await getAccessFromRefresh(refreshToken);
              const address = JSON.parse(waitList).address;
              await HandleDefaultProfile(address);
              setAccessToken(newTokens?.accessToken);
              setRefreshToken(newTokens?.refreshToken);
              await storeTokens(
                newTokens?.accessToken,
                newTokens?.refreshToken
              );
              navigation.replace("Root");
            }
          }
        }
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
