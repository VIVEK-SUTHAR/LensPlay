import { Dimensions, Image, StyleSheet, View } from "react-native";
import React from "react";
import getIPFSLink from "../../utils/getIPFSLink";
import { LinearGradient } from "expo-linear-gradient";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
type CoverProps = {
  url: string;
  navigation: any;
};

const Cover = ({ url, navigation }: CoverProps) => {
  const Wallet = useWalletConnect();

  const StatusBarHeight = Constants.statusBarHeight;

  return (
    <View
      style={{
        height: 180,
        marginBottom: 34,
      }}
    >
      <MaterialIcons
        name="logout"
        size={26}
        color={"white"}
        style={{
          position: "absolute",
          right: Dimensions.get("window").width * 0.05,
          zIndex: 10,
          top: StatusBarHeight,
        }}
        onPress={async (e) => {
          e.preventDefault();
          await AsyncStorage.removeItem("@storage_Key");
          await Wallet.killSession();
          navigation.navigate("Login");
        }}
      />
      <Image
        source={{
          uri: getIPFSLink(url),
        }}
        style={{
          height: "100%",
          width: "100%",
          resizeMode: "cover",
        }}
      />
      <LinearGradient
        colors={["transparent", "black"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "relative",
          height: 50,
          marginTop: -50,
          zIndex: 12,
        }}
      ></LinearGradient>
    </View>
  );
};

export default Cover;
