import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import React, { useState } from "react";
import { Linking, SafeAreaView, StyleSheet, View } from "react-native";
import Icon from "../components/Icon";
import Button from "../components/UI/Button";
import StyledText from "../components/UI/StyledText";
import { primary } from "../constants/Colors";
import { AUTH } from "../constants/tracking";
import { useAuthStore, useProfile, useToast } from "../store/Store";
import { RootStackScreenProps } from "../types/navigation/types";
import { ToastType } from "../types/Store";
import generateChallenge from "../utils/lens/getChallenge";
import getTokens from "../utils/lens/getTokens";
import storeTokens from "../utils/storeTokens";
import TrackAction from "../utils/Track";

function LoginWithLens({ navigation }: RootStackScreenProps<"LoginWithLens">) {
  const [isloading, setIsloading] = useState<boolean>(false);
  const { hasHandle } = useProfile();
  const connector = useWalletConnect();
  const toast = useToast();
  const { setAccessToken, setRefreshToken } = useAuthStore();

  const loginWithLens = async () => {
    setIsloading(true);
    try {
      const address = connector.accounts[0];
      const challange = await generateChallenge({
        address: address,
      });
      const signature = await connector.sendCustomRequest({
        method: "personal_sign",
        params: [address, challange?.text],
      });
      if (signature) {
        const tokens = await getTokens({
          address: address,
          signature: signature,
        });
        setAccessToken(tokens?.accessToken);
        setRefreshToken(tokens?.refreshToken);
        await storeTokens(tokens?.accessToken, tokens?.refreshToken, false);
        navigation.replace("Root");
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
            textStyle={{ fontWeight: "600", fontSize: 20, color: "black" }}
            py={12}
            iconPosition="right"
            isLoading={isloading}
            onPress={async () => {
              await loginWithLens();
            }}
            animated={true}
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
              Linking.openURL("https://lens-create-profile.vercel.app/");
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
