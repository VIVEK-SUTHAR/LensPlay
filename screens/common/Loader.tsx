import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, View } from "react-native";
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
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import StyledText from "../../components/UI/StyledText";
import Heading from "../../components/UI/Heading";

export default function Loader({ navigation }: RootStackScreenProps<"Loader">) {
  const { setCurrentProfile, currentProfile, setHasHandle } = useProfile();
  const { setAccessToken, setRefreshToken } = useAuthStore();
  const whiteBox = useSharedValue(1);
  const blackBox = useSharedValue(1);
  const image = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  const [
    verifyTokens,
    { data: isvalidTokens, error: verifyError, loading: verifyLoading },
  ] = useVerifyTokensLazyQuery();

  const [
    getAccessFromRefresh,
    { data: newTokens, error, loading },
  ] = useRefreshTokensMutation();

  async function HandleDefaultProfile(adress: string) {
    const userDefaultProfile = await getDefaultProfile(adress);
    if (userDefaultProfile) {
      setHasHandle(true);
      setCurrentProfile(userDefaultProfile);
    } else {
      setHasHandle(false);
    }
  }

  async function getProfileQR() {
    const qrResponse = await fetch(
      "https://www.lensplay.xyz/api/generateProfileQR",
      {
        method: "POST",
        body: JSON.stringify({
          profileID: currentProfile?.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const qrData = await qrResponse.json();
    await AsyncStorage.setItem("@profileQR", qrData.message);
  }

  const getLocalStorage = async () => {
    try {
      TrackAction(APP_OPEN);
      const waitList = await AsyncStorage.getItem("@waitlist");
      const userTokens = await AsyncStorage.getItem("@user_tokens");
      const profileQR = await AsyncStorage.getItem("@profileQR");

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
              if (!profileQR) {
                await getProfileQR();
              }
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
              if (!profileQR) {
                await getProfileQR();
              }
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
        console.log(error);

        console.log("[Error]:Error in accessing local storage");
        throw new Error("[Error]:Error in accessing local storage");
      }
    }
  };

  useEffect(() => {
    whiteBox.value = withTiming(10, {
      duration: 500,
    });
    blackBox.value = withDelay(100, withTiming(10, { duration: 500 }));
    image.value = withDelay(1000, withSpring(1, { mass: 1 }));
    textOpacity.value = withDelay(1500, withTiming(1, { duration: 1000 }));
    setTimeout(() => {
      getLocalStorage();
    }, 2000);
  }, []);

  const whiteBoxAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: whiteBox.value,
        },
      ],
    };
  });

  const blackBoxAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: blackBox.value,
        },
      ],
    };
  });

  const ImageAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: image.value,
        },
      ],
    };
  });

  const TextAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <StatusBar style="light" backgroundColor="transparent" />
      <Animated.View
        style={[
          {
            height: 100,
            width: 100,
            backgroundColor: "white",
            borderRadius: 50,
            position: "absolute",
            top: Dimensions.get("window").height / 2,
          },
          whiteBoxAnimationStyle,
        ]}
      ></Animated.View>
      <Animated.View
        style={[
          {
            height: 100,
            width: 100,
            backgroundColor: "black",
            borderRadius: 50,
            position: "absolute",
            top: Dimensions.get("window").height / 2,
          },
          blackBoxAnimationStyle,
        ]}
      ></Animated.View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Animated.View
          style={[
            {
              height: 200,
              width: 200,
            },
            ImageAnimationStyle,
          ]}
        >
          <Image
            source={require("../../assets/images/adaptive-icon.png")}
            style={{ height: "100%", width: "100%", resizeMode: "contain" }}
          />
        </Animated.View>
      </View>
      <Animated.View
        style={[
          {
            alignItems: "center",
            position: "absolute",
            bottom: 20,
          },
          TextAnimationStyle,
        ]}
      >
        <Heading
          title={"LensPlay"}
          style={{ color: "white", fontSize: 40, fontWeight: "600" }}
        />
      </Animated.View>
    </View>
  );
}
