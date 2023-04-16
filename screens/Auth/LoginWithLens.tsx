import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Linking,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import Icon from "../../components/Icon";
import Button from "../../components/UI/Button";
import StyledText from "../../components/UI/StyledText";
import { black, primary, white } from "../../constants/Colors";
import { AUTH } from "../../constants/tracking";
import { useAuthStore, useProfile, useToast } from "../../store/Store";
import { ToastType } from "../../types/Store";
import {
  useAuthenticateMutation,
  useChallengeLazyQuery,
} from "../../types/generated";
import { RootStackScreenProps } from "../../types/navigation/types";
import TrackAction from "../../utils/Track";
import storeTokens from "../../utils/storeTokens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Avatar from "../../components/UI/Avatar";
import getRawurl from "../../utils/getRawUrl";
import Heading from "../../components/UI/Heading";
import Animated, {
  BounceInDown,
  BounceInUp,
  RotateInDownLeft,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import formatHandle from "../../utils/formatHandle";

function LoginWithLens({ navigation }: RootStackScreenProps<"LoginWithLens">) {
  const [isloading, setIsloading] = useState<boolean>(false);
  const { hasHandle } = useProfile();
  const connector = useWalletConnect();
  const toast = useToast();
  const { currentProfile } = useProfile();
  const { setAccessToken, setRefreshToken } = useAuthStore();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [
    getChallenge,
    { data: challangeText, error: challangeError, loading: challengeLoading },
  ] = useChallengeLazyQuery();

  const [
    getTokens,
    { data: tokens, error: tokensError, loading: tokenLoading },
  ] = useAuthenticateMutation();

  const loginWithLens = async () => {
    setIsloading(true);
    try {
      const address = connector.accounts[0];
      const data = await getChallenge({
        variables: {
          request: {
            address: address,
          },
        },
      });

      const signature = await connector.sendCustomRequest({
        method: "personal_sign",
        params: [address, data?.data?.challenge?.text],
      });
      if (signature) {
        const response = await getTokens({
          variables: {
            request: {
              address: address,
              signature: signature,
            },
          },
        });

        setAccessToken(response?.data?.authenticate?.accessToken);
        setRefreshToken(response?.data?.authenticate?.accessToken);
        await storeTokens(
          response?.data?.authenticate?.accessToken,
          response?.data?.authenticate?.refreshToken,
          false
        );
        if (hasHandle) {
          navigation.replace("Root");
        } else {
          navigation.replace("CreateProfile");
        }
        TrackAction(AUTH.SIWL);
      } else {
        toast.show("Something went wrong", ToastType.ERROR, true);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("[Error]:Error in login with lens");
        console.log(error);
      }
    } finally {
      setIsloading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" style="light" />
      {/* <View
        style={{
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingTop: 160,
        }}
      >
        <MotiView
          style={styles.circle2}
          from={{
            transform: [{ scale: 0 }],
          }}
          animate={{
            transform: [{ scale: 1 }],
          }}
          transition={{
            delay: 300,
          }}
        >
          <Icon name="collect" size={44} color="white" />
        </MotiView>
        <View style={styles.bottomCircles}>
          <MotiView
            from={{
              transform: [{ scale: 0 }],
            }}
            animate={{
              transform: [{ scale: 1 }],
            }}
            transition={{
              delay: 400,
            }}
            style={styles.circle1}
          >
            <Icon name="mirror" size={44} />
          </MotiView>
          <MotiView
            style={styles.circle3}
            from={{
              transform: [{ scale: 0 }],
            }}
            animate={{
              transform: [{ scale: 1 }],
            }}
            transition={{
              delay: 450,
            }}
          >
            <Icon name="follow" size={44} />
          </MotiView>
        </View>
      </View>

      <View style={{ justifyContent: "flex-end", marginTop: 80 }}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
            paddingHorizontal: 28,
          }}
        >
          <MotiView
            style={{ flexDirection: "row" }}
            from={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              type: "timing",
              duration: 1500,
              delay: 100,
            }}
          >
            <StyledText
              title={"Just one"}
              style={{
                fontSize: 28,
                color: "white",
                fontWeight: "600",
                textAlign: "right",
                marginRight: 8,
              }}
            />
            <StyledText
              title={"click"}
              style={{
                fontSize: 28,
                color: "#56CBF9",
                fontWeight: "600",
                textAlign: "right",
                marginRight: 8,
              }}
            />
            <StyledText
              title={"away"}
              style={{
                fontSize: 28,
                color: "white",
                fontWeight: "600",
                textAlign: "right",
                marginRight: 8,
              }}
            />
          </MotiView>
          <MotiView
            style={{ flexDirection: "row" }}
            from={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              type: "timing",
              duration: 1500,
              delay: 100,
            }}
          >
            <StyledText
              title={"from"}
              style={{
                fontSize: 28,
                color: "white",
                fontWeight: "600",
                textAlign: "right",
                marginRight: 8,
              }}
            />
            <StyledText
              title={"owning"}
              style={{
                fontSize: 28,
                color: "#9EF01A",
                fontWeight: "600",
                textAlign: "right",
                marginRight: 8,
              }}
            />
            <StyledText
              title={"your"}
              style={{
                fontSize: 28,
                color: "white",
                fontWeight: "600",
                textAlign: "right",
                marginRight: 8,
              }}
            />
          </MotiView>
          <MotiView
            style={{ flexDirection: "row" }}
            from={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              type: "timing",
              duration: 1500,
              delay: 100,
            }}
          >
            <StyledText
              title={"content"}
              style={{
                fontSize: 28,
                color: "#FFC600",
                fontWeight: "600",
                textAlign: "right",
                marginRight: 8,
              }}
            />
          </MotiView>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 16,
          width: "100%",
        }}
      >
        <Button
          title={hasHandle ? "Login With Lens" : "Claim Lens Handle"}
          bg={primary}
          textStyle={{ fontWeight: "600", fontSize: 20, color: "black" }}
          py={12}
          iconPosition="right"
          isLoading={isloading}
          onPress={async () => {
            const isDesktop = await AsyncStorage.getItem("@viaDeskTop");

            if (isDesktop) {
              Linking.openURL("https://lens-create-profile.vercel.app/");
            } else {
              await loginWithLens();
            }
          }}
          animated={true}
        />
      </View> */}
      <View
        style={{
          width: windowWidth,
          height: "70%",
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderColor: black[700],
            borderRadius: 8,
            borderWidth: 2,
            shadowColor: "#bfafb2",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            backgroundColor: black[600],
            elevation: 24,
          }}
        >
          <Animated.View
            style={{
              width: Dimensions.get("window").height / 6,
              height: Dimensions.get("window").height / 6,
              marginTop: -64,
            }}
            entering={BounceInUp.duration(1000)}
          >
            <Avatar
              src={getRawurl(currentProfile?.picture)}
              height={"100%"}
              width={"100%"}
            />
          </Animated.View>
          <View
            style={{
              marginVertical: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Heading
              title={currentProfile?.name}
              style={{
                fontSize: 24,
                fontWeight: "600",
                color: "white",
              }}
            />
            <Heading
              title={formatHandle(currentProfile?.handle)}
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: white[200],
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginWithLens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  bottomCircles: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 230,
  },
  circle1: {
    display: "flex",
    width: 100,
    height: 100,
    backgroundColor: "#9EF01A",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  circle2: {
    display: "flex",
    width: 100,
    height: 100,
    backgroundColor: "#56CBF9",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  circle3: {
    display: "flex",
    width: 100,
    height: 100,
    backgroundColor: "#FFC600",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
