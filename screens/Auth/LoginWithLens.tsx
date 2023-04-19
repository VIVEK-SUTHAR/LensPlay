import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import Avatar from "../../components/UI/Avatar";
import Button from "../../components/UI/Button";
import Heading from "../../components/UI/Heading";
import StyledText from "../../components/UI/StyledText";
import { white } from "../../constants/Colors";
import { AUTH } from "../../constants/tracking";
import { useAuthStore, useProfile, useToast } from "../../store/Store";
import { ToastType } from "../../types/Store";
import {
  useAuthenticateMutation,
  useChallengeLazyQuery,
} from "../../types/generated";
import { RootStackScreenProps } from "../../types/navigation/types";
import TrackAction from "../../utils/Track";
import formatHandle from "../../utils/formatHandle";
import getRawurl from "../../utils/getRawUrl";
import storeTokens from "../../utils/storeTokens";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "../../components/Icon";

function LoginWithLens({ navigation }: RootStackScreenProps<"LoginWithLens">) {
  const [isloading, setIsloading] = useState<boolean>(false);
  const { hasHandle } = useProfile();
  const connector = useWalletConnect();
  const toast = useToast();
  const { currentProfile } = useProfile();
  const { setAccessToken, setRefreshToken } = useAuthStore();
  const windowWidth = Dimensions.get("window").width;
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const fadeInAnimation = useRef(new Animated.Value(0)).current;

  const [
    getChallenge,
    { data: challangeText, error: challangeError, loading: challengeLoading },
  ] = useChallengeLazyQuery();

  const [
    getTokens,
    { data: tokens, error: tokensError, loading: tokenLoading },
  ] = useAuthenticateMutation();

  const shortenAddress = (address: string): string => {
    if (!address) return "0X...000";
    return "0x.." + address.slice(address.length - 4, address.length);
  };

  const handleLoginWithLens = async () => {
    try {
      setIsloading(true);
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

  const handleDisconnect = async () => {
    await connector.killSession();
    navigation.replace("Login");
  };

  useEffect(() => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      damping: 12,
      velocity: 2,
      delay: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeInAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" style="light" />
      <LinearGradient
        colors={["#2D3436", "black", "#000000"]}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            width: windowWidth,
            height: "70%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/3d-5.png")}
            style={{ resizeMode: "contain", width: "70%", height: "70%" }}
          />
        </View>
        <View
          style={{
            padding: 16,
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <StyledText
            title={"Login with Lens"}
            style={{
              color: "white",
              fontSize: 32,
              fontWeight: "600",
            }}
          />
          <View>
            <Animated.View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                opacity: fadeInAnimation,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={getRawurl(currentProfile?.picture)}
                  height={40}
                  width={40}
                />
                <View
                  style={{
                    marginLeft: 8,
                  }}
                >
                  <Heading
                    title={
                      currentProfile?.name ||
                      shortenAddress(currentProfile?.ownedBy)
                    }
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  />
                  <StyledText
                    title={formatHandle(currentProfile?.handle)}
                    style={{
                      color: white[200],
                      fontSize: 12,
                    }}
                  />
                </View>
              </View>
              <Button
                title={"Disconnect"}
                width={"auto"}
                bg={"rgba(255,255,255,0.1)"}
                px={24}
                py={12}
                textStyle={{ fontSize: 12, fontWeight: "600", color: "white" }}
                onPress={handleDisconnect}
              />
            </Animated.View>
            <Animated.View
              style={{
                marginTop: 24,
                transform: [
                  {
                    scale: scaleAnimation,
                  },
                ],
              }}
            >
              <Button
                title={"Login with Lens"}
                isLoading={isloading}
                textStyle={{ fontSize: 16, fontWeight: "600" }}
                bg={white[800]}
                py={16}
                icon={<Icon name="arrowForward" color="black" size={16} />}
                iconPosition="right"
                onPress={handleLoginWithLens}
              />
            </Animated.View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

export default LoginWithLens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-between",
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
