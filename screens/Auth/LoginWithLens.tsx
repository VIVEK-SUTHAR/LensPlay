import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import Icon from "../../components/Icon";
import Button from "../../components/UI/Button";
import StyledText from "../../components/UI/StyledText";
import { black, dark_primary, primary, white } from "../../constants/Colors";
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
import { BlurView } from "expo-blur";

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
  const width = Dimensions.get("window").width;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" style="light" />
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            width: width,
            height: "70%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/3d-1.png")}
            style={{ resizeMode: "contain", width: "70%", height: "70%" }}
          />
        </View>
        <View
          style={{
            width: width,
            paddingHorizontal: 16,
            justifyContent: "flex-end",
          }}
        >
          <StyledText
            title={"Connecttttttt party"}
            style={{
              color: "white",
              fontSize: 32,
              fontWeight: "600",
            }}
          />
        </View>
        <View style={{justifyContent:"space-around",flex:1}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              marginVertical: 4,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", paddingHorizontal: 12 }}>
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
                {currentProfile?.name && (
                  <Heading
                    title={currentProfile?.name}
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  />
                )}
                <StyledText
                  title={formatHandle(currentProfile?.handle)}
                  style={{
                    color: currentProfile?.name ? "gray" : "white",
                    fontSize: currentProfile?.name ? 12 : 16,
                    marginTop: currentProfile?.name ? 0 : -8,
                  }}
                />
              </View>
            </View>
            <Button
              title={"Disconnect"}
              width={"auto"}
              px={20}
              py={10}
              textStyle={{ fontSize: 12, fontWeight: "600" }}
              bg={white[500]}
            />
          </View>

          <View style={{ paddingHorizontal: 16 }}>
            <Button
              title={"Login with Lens"}
              width={"auto"}
              textStyle={{ fontSize: 20, fontWeight: "600" }}
              bg={white[500]}
              py={24}
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
