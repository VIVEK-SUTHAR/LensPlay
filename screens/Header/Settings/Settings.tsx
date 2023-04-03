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
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Sheet from "../../../components/Bottom";
import Icon from "../../../components/Icon";
import Button from "../../../components/UI/Button";
import Heading from "../../../components/UI/Heading";
import StyledText from "../../../components/UI/StyledText";
import ProfileQR from "../../../components/settings/profileQR";
import {
  LENSPLAY_PRIVACY,
  LENSPLAY_TERMS,
  OFFICIAL_EMAIL,
} from "../../../constants";
import { dark_primary } from "../../../constants/Colors";
import { AUTH } from "../../../constants/tracking";
import { useGuestStore } from "../../../store/GuestStore";
import { RootStackScreenProps } from "../../../types/navigation/types";
import TrackAction from "../../../utils/Track";
import UPADTES from "../../../update.json";
import Socials from "../../../components/settings/Socials";
const RIPPLE_COLOR = "rgba(255,255,255,0.1)";

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
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" style="auto" />
      <ScrollView>
        <ProfileQR />
        <View>
          <Heading
            title={"About"}
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "600",
            }}
          />
          <View
            style={{
              backgroundColor: dark_primary,
              marginTop: 16,
              borderRadius: 12,
            }}
          >
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
          </View>
        </View>
        <View
          style={{
            marginTop: 24,
          }}
        >
          <Heading
            title={"Bug"}
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "600",
            }}
          />
          <View
            style={{
              backgroundColor: dark_primary,
              marginTop: 16,
              borderRadius: 12,
            }}
          >
            <SettingsItem
              icon={<Icon name="bug" />}
              label={"Report a bug"}
              onPress={() => navigation.push("BugReport")}
            />
          </View>
        </View>
        <View
          style={{
            marginVertical: 48,
          }}
        >
          <Button
            title={isGuest ? "Login" : "Logout of LensPlay"}
            bg={dark_primary}
            py={16}
            borderRadius={12}
            textStyle={{
              color: "white",
              fontSize: 16,
              fontWeight: "500",
            }}
            onPress={() => {
              isGuest
                ? navigation.push("Login")
                : logoutref.current?.snapToIndex(0);
            }}
          />
        </View>
        <Socials />
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
      </ScrollView>
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
                bg={"rgba(255,255,255,0.1)"}
                textStyle={{
                  fontWeight: "600",
                  fontSize: 16,
                  color: "white",
                }}
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
                bg={"#f5f5f5"}
                textStyle={{
                  fontWeight: "600",
                  fontSize: 16,
                  color: "black",
                }}
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
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.2)",
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
  appVersionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16,
  },
});
