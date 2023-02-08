import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import getIPFSLink from "../../utils/getIPFSLink";
import { LinearGradient } from "expo-linear-gradient";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import Button from "../UI/Button";
type CoverProps = {
  url: string;
  navigation: any;
};

const Cover = ({ url, navigation }: CoverProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const Wallet = useWalletConnect();

  const StatusBarHeight = Constants.statusBarHeight;

  return (
    <>
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
            setIsModalOpen(true);
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
      <Modal
        transparent={true}
        statusBarTranslucent={true}
        animationType={"fade"}
        visible={isModalOpen}
      >
        <View
          style={{
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "85%",
              height: "auto",
              borderRadius: 8,
              backgroundColor: "#232323",
              paddingVertical: 18,
              paddingHorizontal: 16,
            }}
          >
            <Heading
              title="Do you want to log-out?"
              style={{
                color: "white",
                fontSize: 20,
                marginVertical: 4,
              }}
            />
            <StyledText
              title="By doing this,next time when you open LensPlay, you need to connect your wallet again."
              style={{
                color: "gray",
                fontSize: 14,
                marginVertical: 4,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "90%",
              }}
            >
              <Pressable
                style={{
                  marginHorizontal: 8,
                  padding: 2,
                }}
                android_ripple={{
                  color: "gray",
                  borderless: true,
                  radius: 30,
                }}
                onPress={() => {
                  setIsModalOpen(false);
                }}
              >
                <StyledText title="Cancel" style={{ color: "white" }} />
              </Pressable>
              <Pressable
                style={{
                  padding: 2,
                  marginHorizontal: 8,
                }}
                android_ripple={{
                  color: "gray",
                  borderless: true,
                  radius: 30,
                }}
                onPress={async () => {
                  setIsModalOpen(false);
                  await AsyncStorage.removeItem("@storage_Key");
                  await Wallet.killSession();
                  navigation.navigate("Login");
                }}
              >
                <StyledText title="Log out" style={{ color: "white" }} />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Cover;
