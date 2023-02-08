import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import searchUser from "../api/zooTools/searchUser";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import { primary } from "../constants/Colors";
import { RootStackScreenProps } from "../types/navigation/types";
import { ToastType } from "../types/Store";
import AnimatedLottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import { useToast } from "../store/Store";

export default function Waitlist({
  navigation,
}: RootStackScreenProps<"Waitlist">) {
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(true);

  const toast = useToast();

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const isValidEmail = (userEmail: string) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(userEmail);
  };

  const handleUser = async (email: string) => {
    const data = await searchUser(email);
    if (!(data.statusCode === 404)) {
      const handleUser = {
        email: email,
        hasAccess: data.fields.hasAccess,
      };
      await AsyncStorage.setItem("@access_Key", JSON.stringify(handleUser));
      if (data.fields.hasAccess) {
        navigation.push("Root");
      }
      if (!data.fields.hasAccess) {
        navigation.push("LeaderBoard", {
          referralsCount: data.referralsCount,
          rankingPoints: data.rankingPoints,
          rankingPosition: data.rankingPosition,
          refferalLink: `https://form.waitlistpanda.com/go/${data.listId}?ref=${data.id}`,
        });
      }
    } else {
      setSubscribed(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "black" }}
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <StatusBar style="dark" backgroundColor="transparent" />
        <View
          style={{
            marginBottom: 48,
            paddingVertical: 96,
            borderBottomLeftRadius: 34,
            borderBottomRightRadius: 34,
            backgroundColor: "white",
          }}
        >
          <AnimatedLottieView
            autoPlay
            autoSize
            style={{
              width: "100%",
            }}
            source={
              subscribed
                ? require("../assets/waitlist.json")
                : require("../assets/notInWaitlist.json")
            }
          />
        </View>
        {subscribed ? (
          <View style={{ width: "80%" }}>
            <TextInput
              selectionColor={"black"}
              placeholder="Enter your email"
              placeholderTextColor={"black"}
              value={email}
              onChange={(e) => {
                setEmail(e.nativeEvent.text);
              }}
              style={{
                width: "100%",
                color: "black",
                backgroundColor: "white",
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 8,
                fontWeight: "500",
                fontSize: 16,
                marginBottom: 16,
                fontFamily: "OpenSans_Medium",
              }}
            />
            <Button
              title={"Get started"}
              onPress={() => {
                setEmail("");
                const isValid = isValidEmail(email);
                if (isValid) {
                  handleUser(email);
                } else {
                  toast.show("Please enter valid email", ToastType.ERROR, true);
                }
              }}
              px={8}
              py={12}
              borderRadius={8}
              width={"auto"}
              type={"filled"}
              textStyle={{
                fontSize: 16,
                fontWeight: "600",
                color: "black",
              }}
              bg={primary}
            />
          </View>
        ) : (
          <View>
            <Heading
              title="seems like you have not yet joined waitlist"
              style={{
                fontSize: 24,
                color: "white",
                marginVertical: 10,
                textAlign: "center",
                fontWeight: "600",
              }}
            />
            <Button
              title={"Join waitlist"}
              onPress={() =>
                Linking.openURL(
                  "https://form.waitlistpanda.com/go/WzNdl6Tusvm3k89B3yKL"
                )
              }
              px={8}
              py={12}
              borderRadius={8}
              my={8}
              width={"auto"}
              type={"filled"}
              textStyle={{
                fontSize: 16,
                fontWeight: "600",
                color: "black",
              }}
              bg={primary}
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
