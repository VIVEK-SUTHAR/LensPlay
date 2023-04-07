import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import AnimatedLottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { View } from "react-native";
import { APP_OPEN } from "../../constants/tracking";
import { useAuthStore, useProfile } from "../../store/Store";
import {
  useRefreshTokensMutation,
  useVerifyTokensLazyQuery,
} from "../../types/generated";
import { RootStackScreenProps } from "../../types/navigation/types";
import TrackAction from "../../utils/Track";
import handleWaitlist from "../../utils/handleWaitlist";
import getDefaultProfile from "../../utils/lens/getDefaultProfile";
import storeTokens from "../../utils/storeTokens";

export default function Loader({ navigation }: RootStackScreenProps<"Loader">) {
  const { setCurrentProfile, setHasHandle } = useProfile();
  const { setAccessToken, setRefreshToken } = useAuthStore();

  const [
    verifyTokens,
    { data: isvalidTokens, error: verifyError, loading: verifyLoading },
  ] = useVerifyTokensLazyQuery();

  const [
    getAccessFromRefresh,
    { data: newTokens, error, loading },
  ] = useRefreshTokensMutation();

  console.log(isvalidTokens, newTokens);

  console.log(verifyError?.message, error?.message, "error");

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
      TrackAction(APP_OPEN);
      const waitList = await AsyncStorage.getItem("@waitlist");
      const userTokens = await AsyncStorage.getItem("@user_tokens");

      if (!userTokens) {
        navigation.replace("Login");
        return;
      }

      if (userTokens) {
        const accessToken = JSON.parse(userTokens).accessToken;
        const refreshToken = JSON.parse(userTokens).refreshToken;

        if (!accessToken || !refreshToken) {
          navigation.replace("Login");
          return;
        }

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

          if (userData?.fields?.hasAccess) {
            await verifyTokens({
              variables: {
                request: {
                  accessToken: accessToken,
                },
              },
            });

            if (isvalidTokens?.verify) {
              setAccessToken(accessToken);
              setRefreshToken(refreshToken);
              await HandleDefaultProfile(address);
              navigation.replace("Root");
            } else {
              const newData = await getAccessFromRefresh({
                variables: {
                  request: {
                    refreshToken: refreshToken,
                  },
                },
              });
              const address = JSON.parse(waitList).address;
              await HandleDefaultProfile(address);
              setAccessToken(newData?.data?.refresh?.accessToken);
              setRefreshToken(newData?.data?.refresh?.refreshToken);
              await storeTokens(
                newData?.data?.refresh?.accessToken,
                newData?.data?.refresh?.refreshToken
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
        source={require("../../assets/loader.json")}
      />
    </View>
  );
}
