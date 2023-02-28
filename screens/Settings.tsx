import { View, StyleSheet, Pressable, Modal, Linking } from "react-native";
import React, { useState } from "react";
import { RootStackScreenProps } from "../types/navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledText from "../components/UI/StyledText";
import Heading from "../components/UI/Heading";
import { dark_primary, primary } from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Icon from "../components/Icon";
import { StatusBar } from "expo-status-bar";

type SocialMediaBadgeProps = {
  icon: JSX.Element;
  name: string;
  link: string;
};

function SocialMediaBadge({ icon, name, link }: SocialMediaBadgeProps) {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: dark_primary,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 50,
      }}
      onPress={() => {
        Linking.openURL(link);
      }}
    >
      {icon}
      <StyledText
        title={name}
        style={{
          color: "white",
          fontSize: 14,
          fontWeight: "600",
          marginLeft: 8,
        }}
      />
    </Pressable>
  );
}

const SocialMedia: SocialMediaBadgeProps[] = [
  {
    icon: <Icon name="discord" size={16} color="#7289da" />,
    name: "Discord",
    link: "https://discord.gg/tgrzS4Actz",
  },
  {
    icon: <Icon name="twitter" size={16} color="#1DA1F2" />,
    name: "Twitter",
    link: "https://twitter.com/lensplayxyz",
  },
  {
    icon: <Icon name="link" size={16} color="#2AD95C" />,
    name: "website",
    link: "https://lensplay.xyz/",
  },
];

const Settings = ({ navigation }: RootStackScreenProps<"Settings">) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const RIPPLE_COLOR = "rgba(255,255,255,0.1)";
  const Wallet = useWalletConnect();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar backgroundColor="black" style="auto" />
      <View style={{ borderWidth: 2, width: "100%" }}>
        <Pressable
          android_ripple={{
            color: RIPPLE_COLOR,
          }}
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
          <Icon name="bug" size={24} />
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
        <Pressable
          android_ripple={{
            color: RIPPLE_COLOR,
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            borderBottomColor: dark_primary,
            borderBottomWidth: 1,
          }}
        >
          <Icon name="link" />

          <StyledText
            title="Terms and Conditions"
            style={{
              color: "white",
              fontSize: 16,
              paddingVertical: 24,
              paddingHorizontal: 12,
            }}
          ></StyledText>
        </Pressable>
        <Pressable
          android_ripple={{
            color: RIPPLE_COLOR,
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            borderBottomColor: dark_primary,
            borderBottomWidth: 1,
          }}
          onPress={() => {
            Linking.openURL("mailto:lensplay.ac@gamil.com");
          }}
        >
          <Icon name="mail" />
          <StyledText
            title="Contact Us"
            style={{
              color: "white",
              fontSize: 16,
              paddingVertical: 24,
              paddingHorizontal: 12,
            }}
          ></StyledText>
        </Pressable>
        <Pressable
          android_ripple={{
            color: RIPPLE_COLOR,
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            borderBottomColor: dark_primary,
            borderBottomWidth: 1,
          }}
        >
          <Icon name="copy" />
          <StyledText
            title="Privacy Policy"
            style={{
              color: "white",
              fontSize: 16,
              paddingVertical: 24,
              paddingHorizontal: 12,
            }}
          ></StyledText>
        </Pressable>
        <Pressable
          android_ripple={{
            color: RIPPLE_COLOR,
          }}
          style={{
            paddingHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderBottomColor: dark_primary,
          }}
          onPress={async () => {
            setIsModalOpen(true);
          }}
        >
          <Icon name="logout" size={24} />
          <StyledText
            title="Logout"
            style={{
              color: "white",
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: dark_primary,
              paddingVertical: 24,
              paddingHorizontal: 12,
            }}
          ></StyledText>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          position: "absolute",
          bottom: 16,
          width: "100%",
        }}
      >
        {SocialMedia.map((el, index) => (
          <SocialMediaBadge
            key={index}
            icon={el.icon}
            name={el.name}
            link={el.link}
          />
        ))}
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
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
