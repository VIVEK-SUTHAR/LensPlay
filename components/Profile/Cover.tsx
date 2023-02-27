import { Dimensions, Image, Modal, Pressable, View } from "react-native";
import React, { useState } from "react";
import getIPFSLink from "../../utils/getIPFSLink";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import { dark_primary, primary } from "../../constants/Colors";
import Icon from "../Icon";
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
      <Pressable
        onPress={() => {
          navigation.navigate("FullImage", {
            url: url,
          });
        }}
      >
        <View
          style={{
            height: 180,
            marginBottom: 34,
          }}
          onTouchStart={(e) => {
            setIsModalOpen(true);
          }}
        >
          <Icon
            name="logout"
            style={{
              position: "absolute",
              right: Dimensions.get("window").width * 0.05,
              zIndex: 100,
              top: StatusBarHeight + 10,
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
        </View>
      </Pressable>
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
              paddingHorizontal: 28,
            }}
          >
            <Heading
              title="Do you want to log-out?"
              style={{
                color: primary,
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
                marginTop: 8
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
                <StyledText title="Log out" style={{ color: "red" }} />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Cover;
