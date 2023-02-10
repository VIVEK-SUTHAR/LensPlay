import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBarIOS,
  StyleSheet,
  View,
} from "react-native";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import StyledText from "../components/UI/StyledText";
import { RootStackScreenProps } from "../types/navigation/types";
import Constants from "expo-constants";
import getProfile from "../apollo/Queries/getProfile";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { client } from "../apollo/client";
import { useAuthStore, useProfile } from "../store/Store";
import getChallenge from "../apollo/Queries/getChallenge";
import getAccessTokens from "../apollo/mutations/getAccessTokens";
import storeData from "../utils/storeData";
import AnimatedLottieView from "lottie-react-native";

function LoginWithLens({ navigation }: RootStackScreenProps<"LoginWithLens">) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [isloading, setIsloading] = useState(false);
  const connector = useWalletConnect();
  const userStore = useProfile();
  const authStore = useAuthStore();

  const logInWithLens = async () => {
    setIsloading(true);
    const data = await client.query({
      query: getProfile,
      variables: {
        ethAddress: connector.accounts[0],
      },
    });
    if (!data.data.defaultProfile) {
      return;
    }
    userStore.setCurrentProfile(data.data.defaultProfile);
    const challengeText = await client.query({
      query: getChallenge,
      variables: {
        ethAddress: connector.accounts[0],
      },
    });
    try {
      const data = await connector.sendCustomRequest({
        method: "personal_sign",
        params: [connector.accounts[0], challengeText.data.challenge.text],
      });
      const address = connector.accounts[0];
      const tokens = await client.mutate({
        mutation: getAccessTokens,
        variables: {
          address: address,
          signature: data,
        },
      });
      if (tokens.data.authenticate.accessToken) {
        authStore.setAccessToken(tokens.data.authenticate.accessToken);
        authStore.setRefreshToken(tokens.data.authenticate.refreshToken);
        storeData(
          tokens.data.authenticate.accessToken,
          tokens.data.authenticate.refreshToken
        );
        setIsloading(false);
        navigation.navigate("Root");
      } else {
        setIsloading(false);
        Alert.alert("Something went wrong");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setIsloading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#93E9C8" style="dark" />
      <View style={{ position: "relative", alignItems: "center" }}>
        <Image
          source={require("../assets/images/Vector258.png")}
          style={{
            width: windowWidth,
            height: windowWidth + 105,
            marginTop: -Constants.statusBarHeight / 2,
          }}
          resizeMode={"contain"}
        />
        <Image
          source={require("../assets/images/login3.png")}
          style={{
            width: windowWidth * 0.9,
            height: 495,
            position: "absolute",
            bottom: 32,
            right: 0,
          }}
          resizeMode={"contain"}
        />
      </View>
      <View style={{ justifyContent: "flex-end", marginTop: 48 }}>
        <View
          style={{
            position: "relative",
            flexDirection: "column",
            alignItems: "flex-end",
            paddingHorizontal: 34,
            marginTop: 8,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <StyledText
              title={"Just one"}
              style={{
                fontSize: 28,
                color: "white",
                fontWeight: "700",
                textAlign: "right",
                marginRight: 8,
              }}
            />
            <StyledText
              title={"click"}
              style={{
                fontSize: 28,
                color: "#93E9C8",
                fontWeight: "700",
                textAlign: "right",
                marginRight: 8,
              }}
            />
            <StyledText
              title={"away"}
              style={{
                fontSize: 28,
                color: "white",
                fontWeight: "700",
                textAlign: "right",
                marginRight: 8,
              }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <StyledText
              title={"from"}
              style={{
                fontSize: 28,
                color: 'white',
                fontWeight: "700",
                textAlign: "right",
                marginRight: 8,
              }}
            />
            <StyledText
              title={"owning"}
              style={{
                fontSize: 28,
                color: "#93E9C8",
                fontWeight: "700",
                textAlign: "right",
                marginRight: 8,
              }}
            />
            <StyledText
              title={"your"}
              style={{
                fontSize: 28,
                color: "white",
                fontWeight: "700",
                textAlign: "right",
                marginRight: 8,
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
          <StyledText
              title={"content"}
              style={{
                fontSize: 28,
                color: "#93E9C8",
                fontWeight: "700",
                textAlign: "right",
                marginRight: 8,
              }}
            />
          </View>
        </View>
        <View style={{ padding: 16, marginTop: 44 }}>
          <Button
            title="Login With Lens"
            bg="#93E9C8"
            borderRadius={5}
            textStyle={{ fontWeight: "800", fontSize: 24 }}
            py={16}
            isLoading={isloading}
            onPress={async () => {
              await logInWithLens();
            }
            }
          />
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
  },
});
