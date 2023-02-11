import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import StyledText from "../components/UI/StyledText";
import useStore from "../store/Store";
import { RootStackScreenProps } from "../types/navigation/types";
import Constants from "expo-constants";

function ConnectWallet({ navigation }: RootStackScreenProps<"ConnectWallet">) {
  const connector = useWalletConnect();
  const windowWidth = Dimensions.get("window").width;
  const connectWallet = React.useCallback(async () => {
    await connector.connect();
  }, [connector]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#93E9C8" style="dark" />
      <View style={{ position: "relative", alignItems: "center" }}>
        <Image
          source={require("../assets/images/Vector257.png")}
          style={{
            width: windowWidth,
            height: windowWidth + 105,
            marginTop: -Constants.statusBarHeight / 2,
          }}
          resizeMode={"contain"}
        />
        <Image
          source={require("../assets/images/login2.png")}
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
      <View
        style={{
          justifyContent: "center",
          marginTop: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            paddingHorizontal: 34,
            marginTop: 0,
            top: 64,
          }}
        >
          <StyledText
            title={"Fully"}
            style={{
              fontSize: 28,
              color: "white",
              fontWeight: "700",
              textAlign: "right",
            }}
          />
          <StyledText
            title={"Composable,"}
            style={{
              fontSize: 28,
              color: "#93E9C8",
              fontWeight: "700",
              textAlign: "right",
              marginLeft: 8,
            }}
          />
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 36, top: 64 }}>
          <StyledText
            title={"User"}
            style={{
              fontSize: 28,
              color: "white",
              fontWeight: "700",
              textAlign: "right",
            }}
          />
          <StyledText
            title={"Owned,"}
            style={{
              fontSize: 28,
              color: "#93E9C8",
              fontWeight: "700",
              textAlign: "right",
              marginLeft: 8,
            }}
          />
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 36, top: 64 }}>
          <StyledText
            title={"Social"}
            style={{
              fontSize: 28,
              color: "white",
              fontWeight: "700",
              textAlign: "right",
            }}
          />
          <StyledText
            title={"Graph."}
            style={{
              fontSize: 28,
              color: "#93E9C8",
              fontWeight: "700",
              textAlign: "right",
              marginLeft: 8,
            }}
          />
        </View>
        <View style={{ padding: 16, marginTop: 84 }}>
          <Button
            onPress={async() => {
              await connectWallet();
              navigation.push("LoginWithLens");
            }}
            title="Connect Wallet"
            bg="#93E9C8"
            borderRadius={5}
            textStyle={{ fontWeight: "800", fontSize: 24 }}
            py={16}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
export default ConnectWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
