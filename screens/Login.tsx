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
import Constants from "expo-constants";

const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
  const store = useStore();
  const authStore = useAuthStore();
  const userStore = useProfile();
  const [isloading, setIsloading] = useState<boolean>(false);
  const connector = useWalletConnect();
  const [isconnected, setIsconnected] = useState<boolean>(false);

  const windowWidth = Dimensions.get("window").width;

  
  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#93E9C8" style="dark" />
      <View style={{ position: "relative" }}>
        <Image
          source={require("../assets/images/Vector256.png")}
          style={{
            width: windowWidth,
            height: windowWidth + 105,
            marginTop: -Constants.statusBarHeight / 2,
          }}
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
            fontSize: 60,
            color: "white",
            fontWeight: "600",
            textAlign: "center",
          }}
        />
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
            paddingHorizontal: 34,
            marginTop: 8,
          }}
        >
          <StyledText
            title={"See the world in a"}
            style={{
              fontSize: 24,
              color: "white",
              fontWeight: "600",
              textAlign: "right",
            }}
          />
          <View style={{ flexDirection: "row", marginTop: -4 }}>
            <StyledText
              title={"different"}
              style={{
                fontSize: 24,
                color: "#93E9C8",
                fontWeight: "600",
                textAlign: "right",
                marginRight: 8,
              }}
            />
            <StyledText
              title={"way"}
              style={{
                fontSize: 24,
                color: "white",
                fontWeight: "600",
                textAlign: "right",
              }}
            />
          </View>
        </View>
        <View style={{ padding: 16, marginTop: 8 }}>
          <Button
            onPress={async () => {
              navigation.push("ConnectWallet");
            }}
            title="Get Started"
            bg="#93E9C8"
            borderRadius={8}
            textStyle={{ fontWeight: "800", fontSize: 24 }}
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
