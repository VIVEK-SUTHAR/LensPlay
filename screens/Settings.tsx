import {
  View,
  StyleSheet,
  Pressable,
  Modal,
  Linking,
  SafeAreaView,
} from "react-native";
import React, { FC, useState } from "react";
import { RootStackScreenProps } from "../types/navigation/types";
import StyledText from "../components/UI/StyledText";
import Heading from "../components/UI/Heading";
import { dark_primary } from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Icon from "../components/Icon";
import { StatusBar } from "expo-status-bar";
import {
  LENSPLAY_DISCORD,
  LENSPLAY_SITE,
  LENSPLAY_TWITTER,
  OFFICIAL_EMAIL,
} from "../constants";

const RIPPLE_COLOR = "rgba(255,255,255,0.1)";

type SocialMediaBadgeProps = {
  icon: JSX.Element;
  name: string;
  link: string;
};
type SettingsItemProps = {
  label: string;
  icon: JSX.Element;
  onPress: () => void;
};
const Settings = ({ navigation }: RootStackScreenProps<"Settings">) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const Wallet = useWalletConnect();

  const SettingItemsList: SettingsItemProps[] = [
    {
      icon: <Icon name="bug" />,
      label: "Report a bug",
      onPress: () => {
        navigation.navigate("BugReport");
      },
    },
    {
      icon: <Icon name="terms" />,
      label: "Terms and Conditions",
      onPress: () => {},
    },
    {
      icon: <Icon name="mail" />,
      label: "Contact Us",
      onPress: () => {
        Linking.openURL(`mailto:${OFFICIAL_EMAIL}`);
      },
    },
    {
      icon: <Icon name="policy" />,
      label: "Privacy Policy",
      onPress: () => {},
    },
    {
      icon: <Icon name="logout" />,
      label: "Logout",
      onPress: () => {
        setIsModalOpen(true);
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" style="auto" />
      {SettingItemsList.map((item, index) => {
        return (
          <SettingsItem
            key={index}
            icon={item.icon}
            label={item.label}
            onPress={item.onPress}
          />
        );
      })}
      <View style={styles.socilaMediaContainer}>
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
          <View style={styles.logOutContainer}>
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

function SocialMediaBadge({ icon, name, link }: SocialMediaBadgeProps) {
  return (
    <Pressable
      android_ripple={{
        color: RIPPLE_COLOR,
        borderless: true,
        radius: 15,
      }}
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
    link: LENSPLAY_DISCORD,
  },
  {
    icon: <Icon name="twitter" size={16} color="#1DA1F2" />,
    name: "Twitter",
    link: LENSPLAY_TWITTER,
  },
  {
    icon: <Icon name="link" size={16} color="#2AD95C" />,
    name: "website",
    link: LENSPLAY_SITE,
  },
];

const Item: FC<SettingsItemProps> = (item: SettingsItemProps) => {
  return (
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
      onPress={item.onPress}
    >
      {item.icon}
      <StyledText
        title={item.label}
        style={{
          color: "white",
          fontSize: 16,
          paddingVertical: 24,
          paddingHorizontal: 12,
        }}
      ></StyledText>
    </Pressable>
  );
};
const SettingsItem = React.memo(Item);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  socilaMediaContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 16,
    width: "100%",
  },
  logOutContainer: {
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
  },
});
