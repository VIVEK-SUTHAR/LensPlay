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
      <StatusBar backgroundColor="transparent" style="light" />
      <View
        style={{
          flexDirection: "row",
          marginTop: "70%",
          justifyContent: "center",
        }}
      >
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
      {/* <View style={{ position: "relative", alignItems: "center" }}>
<Image
source={require("../assets/images/Vector258.png")}
style={{
width: windowWidth,
height: windowWidth + 100,
marginTop: -Constants.statusBarHeight / 2,
}}
resizeMode={"contain"}
/>
<Image
source={require("../assets/images/login3.png")}
style={{
width: windowWidth * 0.9,
height: windowHeight / 2 + 100,
position: "absolute",
bottom: 20,
}}
resizeMode={"contain"}
/>
</View> */}

      <View style={{ justifyContent: "flex-end", top: "24%" }}>
        <View
          style={{
            position: "relative",
            flexDirection: "column",
            alignItems: "flex-end",
            paddingHorizontal: 34,
            marginTop: 8,
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
                color: "#01B35A",
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
                color: "#01B35A",
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
                color: "#01B35A",
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
          position: "absolute",
          bottom: 16,
          width: "100%",
        }}
      >
        {hasHandle ? (
          <Button
            title="Login With Lens"
            bg="#333333"
            borderRadius={10}
            textStyle={{ fontWeight: "800", fontSize: 24, color: "white" }}
            py={10}
            iconPosition="right"
            isLoading={isloading}
            onPress={async () => {
              await logInWithLens();
            }}
          />
        ) : (
          <Button
            title="Claim Lens Handle"
            bg="#93E9C8"
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
},
circle1: {
display: "flex",
width: 100,
height: 100,
backgroundColor: "#9EF01A",
borderRadius: 50,
position: "relative",
zIndex: -1,
justifyContent: "center",
alignItems: "center",
// paddingLeft: 8,
paddingVertical: 10,
top: "20%",
marginRight: "5%",
},
circle2: {
display: "flex",
bottom: "30%",
width: 100,
height: 100,
backgroundColor: "#56CBF9",
borderRadius: 50,
position: "absolute",
zIndex: -1,
justifyContent: "center",
alignItems: "center",
// paddingLeft: 8,
paddingVertical: 10,
},
circle3: {
display: "flex",
width: 100,
height: 100,
backgroundColor: "#FFC600",
borderRadius: 50,
position: "relative",
zIndex: -1,
justifyContent: "center",
alignItems: "center",
// paddingLeft: 8,
paddingVertical: 10,
top: "20%",
marginLeft: "5%",
},
});