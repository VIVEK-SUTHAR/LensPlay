import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { RootStackScreenProps } from "../types/navigation/types";
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from "react-native-safe-area-context";
import StyledText from "../components/UI/StyledText";
import Heading from "../components/UI/Heading";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { dark_primary, primary } from "../constants/Colors";
import Cover from "../components/Profile/Cover";
import { STATIC_ASSET } from "../constants";
import { useProfile } from "../store/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Constants from "expo-constants";
import BugReport from "./BugReport";
const Settings = ({ navigation }: RootStackScreenProps<"Settings">) => {
  const userStore = useProfile();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const StatusBarHeight = Constants.statusBarHeight;

  const Wallet = useWalletConnect();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View
        style={{ borderWidth: 2, position: "absolute", width: "100%", top: 0 }}
      >
        {/* <Heading title="Settings" style={{color:"white",fontSize:36 }}></Heading> */}

        <View
          style={{
            paddingHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderBottomColor: dark_primary,
          }}
        >
          <MaterialIcons name="logout" size={24} style={{ color: "white" }} />

          <StyledText
            title="Logout"
            onPress={async () => {
              setIsModalOpen(true);
            }}
            style={{
              color: "white",
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: dark_primary,
              paddingVertical: 24,
              paddingHorizontal: 12,
            }}
          ></StyledText>
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
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  borderColor: "red",
                  paddingLeft: 16,
                }}
              >
                <Heading
                  title="Do you want to log-out?"
                  style={{
                    color: "#2A9D5C",
                    fontSize: 20,
                    marginVertical: 4,
                    textAlign: "left",
                  }}
                />
                <StyledText
                  title="By doing this,next time when you open LensPlay, you need to connect your wallet again."
                  style={{
                    color: "white",
                    fontSize: 14,
                    marginVertical: 4,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    width: "95%",
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
                      navigation.replace("Login");
                    }}
                  >
                    <StyledText title="Log Out" style={{ color: "red" }} />
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate("BugReport");
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            borderBottomColor: dark_primary,
            borderBottomWidth: 1,
          }}
        >
          <MaterialIcons
            name="bug-report"
            size={24}
            style={{ color: "white" }}
          />
          <StyledText
            title="Report a bug"
            style={{
              color: "white",
              fontSize: 16,
              paddingVertical: 24,
              paddingHorizontal: 12,
            }}
          ></StyledText>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            borderBottomColor: dark_primary,
            borderBottomWidth: 1,
          }}
        >
          <MaterialIcons
            name="newspaper"
            size={24}
            style={{ color: "white" }}
          />
          <StyledText
            title="Terms and Conditions"
            style={{
              color: "white",
              fontSize: 16,
              paddingVertical: 24,
              paddingHorizontal: 12,
            }}
          ></StyledText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            borderBottomColor: dark_primary,
            borderBottomWidth: 1,
          }}
        >
          <MaterialIcons
            name="contact-support"
            size={24}
            style={{ color: "white" }}
          />
          <StyledText
            title="Contact Us"
            style={{
              color: "white",
              fontSize: 16,
              paddingVertical: 24,
              paddingHorizontal: 12,
            }}
          ></StyledText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            borderBottomColor: dark_primary,
            borderBottomWidth: 1,
          }}
        >
          <MaterialIcons
            name="policy"
            size={24}
            style={{ color: "white" }}
          />
          <StyledText
            title="Privacy Policy"
            style={{
              color: "white",
              fontSize: 16,
              paddingVertical: 24,
              paddingHorizontal: 12,
            }}
          ></StyledText>
        </View>
      </View>
      {/* <StyledText title="Logout" style={{color:"white"}} ></StyledText>
        <StyledText title="Report a bug" style={{color:"white"}} ></StyledText> */}
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
