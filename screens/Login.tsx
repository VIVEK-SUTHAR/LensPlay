import {
  Alert,
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { client } from "../apollo/client";
import getChallenge from "../apollo/Queries/getChallenge";
import getAccessTokens from "../apollo/mutations/getAccessTokens";
import getProfile from "../apollo/Queries/getProfile";
import useStore, { useAuthStore, useProfile } from "../store/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import verifyToken from "../apollo/Queries/verifyToken";
import refreshCurrentToken from "../apollo/mutations/refreshCurrentToken";
import { StatusBar } from "expo-status-bar";
import Paginator from "../components/Paginator";
import StyledText from "../components/UI/StyledText";
import { RootStackScreenProps } from "../types/navigation/types";
import Button from "../components/UI/Button";
import formatTime from "../utils/formatTime";
import storeData from "../utils/storeData";
import Heading from "../components/UI/Heading";


const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
  const store = useStore();
  const authStore = useAuthStore();
  const userStore = useProfile();
  const [isloading, setIsloading] = useState<boolean>(false);
  const connector = useWalletConnect();
  const [isconnected, setIsconnected] = useState<boolean>(false);
  const connectWallet = React.useCallback(async () => {
    await connector.connect();
    setIsconnected(true);
  }, [connector]);

  useEffect(() => {
    // navigation.addListener("focus", getData);
  }, []);

  const data = [
    "https://res.cloudinary.com/djkwixcg8/image/upload/v1674534829/landing-1_lrrjd1.webp",
    "https://res.cloudinary.com/djkwixcg8/image/upload/v1674534829/landing-2_byfsnm.webp",
    "https://res.cloudinary.com/djkwixcg8/image/upload/v1674534828/landing-3_gatvjy.webp",
  ];

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  // const { width } = Dimensions.get("screen");
  // const imageW = width ;
  // const imageH = imageW ;
  console.log(windowWidth);
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
  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={{ position: "relative" }}>
        <Image
          source={require("../assets/images/Vector256.png")}
          style={{ width: windowWidth, height: windowWidth + 105 }}
          resizeMode={"contain"}
        />
        <Image
          source={require("../assets/images/login1.png")}
          style={{ width: windowWidth, height: 495, position: "absolute" }}
          resizeMode={"contain"}
        />
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <Heading
          title={"LensPlay"}
          style={{
            fontSize: 64,
            color: "white",
            fontWeight: "600",
            textAlign: "center",
          }}
        />
        <View
          style={{
            position: "relative",
            flexDirection: "column",
            alignItems: "flex-end",
            paddingHorizontal:34,
            marginTop:8
          }}
        >
          <StyledText
            title={"See the world in a"}
            style={{
              fontSize: 24,
              color: "white",
              fontWeight: "500",
              textAlign: "right",
            }}
          />
          <View style={{flexDirection:"row" }} >
            <StyledText
              title={"different"}
              style={{
                fontSize: 24,
                color: "#93E9C8",
                fontWeight: "500",
                textAlign: "right",
                marginRight:8
              }}
            />
            <StyledText
              title={"way"}
              style={{
                fontSize: 24,
                color: "white",
                fontWeight: "500",
                textAlign: "right",
              }}
            />
          </View>
        </View>
        <View style={{ padding: 16,marginTop:16 }}>
          <Button
            onPress={()=>{navigation.push("ConnectWallet")}}
            title="Get Started"
            bg="#93E9C8"
            borderRadius={5}
            textStyle={{ fontWeight: "700", fontSize: 24 }}
            py={16}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
