import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React, { FC, useRef } from "react";
import {
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import Sheet from "../../../components/Bottom";
import Icon from "../../../components/Icon";
import Button from "../../../components/UI/Button";
import Heading from "../../../components/UI/Heading";
import StyledText from "../../../components/UI/StyledText";
import {
  LENSPLAY_DISCORD,
  LENSPLAY_PRIVACY,
  LENSPLAY_SITE,
  LENSPLAY_TERMS,
  LENSPLAY_TWITTER,
  OFFICIAL_EMAIL,
} from "../../../constants";
import { dark_primary } from "../../../constants/Colors";
import { AUTH } from "../../../constants/tracking";
import { useGuestStore } from "../../../store/GuestStore";
import { RootStackScreenProps } from "../../../types/navigation/types";
import TrackAction from "../../../utils/Track";
import UPADTES from "../../../update.json";
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
  const Wallet = useWalletConnect();
  const { isGuest } = useGuestStore();
  const logoutref = useRef<BottomSheetMethods>(null);

  const SettingItemsList: SettingsItemProps[] = [
    {
      icon: <Icon name="bug" />,
      label: "Report a bug",
      onPress: () => {
        navigation.navigate("BugReport");
      },
    },
    {
      icon: <Icon name="policy" />,
      label: "Terms and Conditions",
      onPress: () => {
        Linking.openURL(LENSPLAY_TERMS);
      },
    },
    {
      icon: <Icon name="terms" />,
      label: "Privacy Policy",
      onPress: () => {
        Linking.openURL(LENSPLAY_PRIVACY);
      },
    },
    {
      icon: <Icon name="mail" />,
      label: "Contact Us",
      onPress: () => {
        Linking.openURL(`mailto:${OFFICIAL_EMAIL}`);
      },
    },
    {
      icon: <Icon name="logout" />,
      label: isGuest ? "Login" : "Logout",
      onPress: () => {
        isGuest ? navigation.push("Login") : logoutref.current?.snapToIndex(0);
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
      <View
        style={{
          position: "absolute",
          bottom: 16,
          width: "100%",
        }}
      >
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
        <View style={styles.appVersionContainer}>
          <StyledText
            title={`OTA Build:${UPADTES.OTA_BUILD}`}
            style={{ color: "gray", fontSize: 10 }}
          />
          <StyledText
            title={`${Constants.expoConfig?.name} v${Constants.expoConfig?.version}`}
            style={{ color: "gray", fontSize: 10 }}
          />
        </View>
      </View>
      <Sheet
        ref={logoutref}
        index={-1}
        snapPoints={["50%"]}
        bottomInset={32}
        enablePanDownToClose
        detached={true}
        style={{
          marginHorizontal: 16,
        }}
        children={
          <View
            style={{
              justifyContent: "space-between",
              padding: 16,
              height: "100%",
            }}
          >
            <View>
              <Heading
                title="Do you want to log-out?"
                style={{
                  color: "white",
                  fontSize: 20,
                  marginVertical: 4,
                  textAlign: "left",
                  fontWeight: "600",
                }}
              />
              <StyledText
                title="By doing this,next time when you open LensPlay, you need to connect your wallet again."
                style={{
                  color: "gray",
                  fontSize: 14,
                  marginVertical: 4,
                  fontWeight: "500",
                }}
              />
            </View>
            <View>
              <Button
                onPress={() => {
                  logoutref.current?.close();
                }}
                title="Cancel"
                textStyle={{ fontWeight: "600", fontSize: 16, color: "black" }}
                py={12}
                borderRadius={8}
              />
              <Button
                onPress={async () => {
                  const isDeskTopLogin = await AsyncStorage.getItem(
                    "@viaDeskTop"
                  );
                  await AsyncStorage.removeItem("@user_tokens");
                  if (isDeskTopLogin) {
                    await AsyncStorage.removeItem("@viaDeskTop");
                    navigation.replace("Login");
                    return;
                  } else {
                    await Wallet.killSession();
                    navigation.replace("Login");
                  }
                  TrackAction(AUTH.LOGOUT);
                }}
                mt={16}
                title="Log Out"
                bg={"red"}
                textStyle={{ fontWeight: "600", fontSize: 16, color: "black" }}
                py={12}
                borderRadius={8}
              />
            </View>
          </View>
        }
      />
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
      style={styles.badgeContainer}
      onPress={() => {
        Linking.openURL(link);
      }}
    >
      {icon}
      <StyledText title={name} style={styles.badgeText} />
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
    name: "Website",
    link: LENSPLAY_SITE,
  },
];

const Item: FC<SettingsItemProps> = (item: SettingsItemProps) => {
  return (
    <Pressable
      android_ripple={{
        color: RIPPLE_COLOR,
      }}
      style={styles.itemContainer}
      onPress={item.onPress}
    >
      {item.icon}
      <StyledText title={item.label} style={styles.itemText} />
    </Pressable>
  );
};
const SettingsItem = React.memo(Item);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: dark_primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomColor: dark_primary,
    borderBottomWidth: 1,
  },
  socilaMediaContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
  itemText: {
    color: "white",
    fontSize: 16,
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  badgeText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  appVersionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16,
  },
});