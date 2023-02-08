import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  Linking,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";
import searchUser from "../api/zooTools/searchUser";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import { primary } from "../constants/Colors";
import { RootStackScreenProps } from "../types/navigation/types";
import { useToast } from "../store/Store";
import { ToastType } from "../types/Store";
import AnimatedLottieView from "lottie-react-native";
interface fieldsData {
  hasAccess: boolean;
}
interface userData {
  referralsCount: number;
  rankingPoints: number;
  id: string;
  fields: fieldsData;
  rankingPosition: number;
}

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",
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
          source={require("../assets/wait.json")}
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
              borderRadius: 50,
              paddingHorizontal: 16,
              paddingVertical: 8,
              fontWeight: "500",
              fontSize: 16,
              marginBottom: 16,
            }}
          />
          <Button
            title={"Check your Position 👀"}
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
            py={16}
            width={"auto"}
            type={"filled"}
            textStyle={{
              fontSize: 20,
              fontWeight: "700",
              color: "black",
            }}
            bg={primary}
          />
        </View>
      ) : (
        <View>
          <Heading
            title="seems like you didn't joined waitlist"
            style={{
              fontSize: 24,
              color: "white",
              marginVertical: 10,
              textAlign: "center",
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
            py={16}
            width={"auto"}
            type={"filled"}
            textStyle={{
              fontSize: 20,
              fontWeight: "700",
              color: "black",
            }}
            bg={primary}
          />
        </View>
      )}
    </SafeAreaView>
  );
}