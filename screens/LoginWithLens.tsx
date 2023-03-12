import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { client } from "../apollo/client";
import getAccessTokens from "../apollo/mutations/getAccessTokens";
import getChallenge from "../apollo/Queries/getChallenge";
import getProfile from "../apollo/Queries/getProfile";
import Icon from "../components/Icon";
import Button from "../components/UI/Button";
import StyledText from "../components/UI/StyledText";
import { primary } from "../constants/Colors";
import { useAuthStore, useProfile, useToast } from "../store/Store";
import { RootStackScreenProps } from "../types/navigation/types";
import { ToastType } from "../types/Store";
import storeData from "../utils/storeData";

function LoginWithLens({ navigation }: RootStackScreenProps<"LoginWithLens">) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [isloading, setIsloading] = useState<boolean>(false);
  const [hasHandle, setHasHandle] = useState<boolean>(true);
  const connector = useWalletConnect();
  const userStore = useProfile();
  const authStore = useAuthStore();
  const toast = useToast();

  const logInWithLens = async () => {
    setIsloading(true);
    const data = await client.query({
      query: getProfile,
      variables: {
        ethAddress: connector.accounts[0],
      },
    });
    if (!data.data.defaultProfile) {
      setIsloading(false);
      setHasHandle(false);
      toast.show("Please claim your handle", ToastType.ERROR, true);
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
          tokens.data.authenticate.refreshToken,
          userStore.currentProfile?.id
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
      <StatusBar backgroundColor="transparent" style="light" />
      <View
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
        {hasHandle ? (
          <Button
            title="Login With Lens"
            bg={primary}
            borderRadius={8}
            textStyle={{ fontWeight: "600", fontSize: 20, color: "black" }}
            py={8}
            iconPosition="right"
            isLoading={isloading}
            onPress={async () => {
              await logInWithLens();
            }}
          />
        ) : (
          <Button
            title="Claim Lens Handle"
            bg={primary}
            borderRadius={50}
            textStyle={{ fontWeight: "600", fontSize: 20 }}
            py={12}
            isLoading={isloading}
            onPress={() => {
              Linking.openURL("<http://claim.lens.xyz/>");
            }}
          />
        )}
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
