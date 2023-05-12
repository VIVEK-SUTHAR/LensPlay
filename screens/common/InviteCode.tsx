import { Image } from "expo-image";
import React, { useState } from "react";
import {
  Dimensions,
  NativeSyntheticEvent,
  SafeAreaView,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import Button from "../../components/UI/Button";
import Heading from "../../components/UI/Heading";
import { black, white } from "../../constants/Colors";
import { useProfile, useThemeStore, useToast } from "../../store/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InviteCode() {
  const [inviteCode, setInviteCode] = useState<string>("");
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const { PRIMARY } = useThemeStore();
  const toast = useToast();
  const { currentProfile } = useProfile();

  const handleInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setInviteCode(e.nativeEvent.text);
  };

  const createUser = async (invitedBy: string) => {
    try {
      const apiResponse = await fetch(
        "https://lensplay-api.vercel.app/api/user/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profileId: currentProfile?.id,
            address: currentProfile?.ownedBy,
            invitedBy: invitedBy,
          }),
        }
      );
      const jsonRes = await apiResponse.json();
      if (apiResponse.status === 200) {
        await AsyncStorage.setItem(
          "@user_data",
          JSON.stringify({
            createdAt: jsonRes?.message?.created_at,
            hasInviteCodes: false,
          })
        );
        toast.success("Redeemed successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsValidInviteCode = () => {
    if (!inviteCode.includes("lensplay-")) {
      toast.error("Invaild invite code");
      return;
    }
    const inviteLength = inviteCode?.split("-").length;
    if (inviteLength == 0 || inviteLength == 1 || inviteLength === 2) {
      toast.error("Invaild invite code");
      return;
    }
    updateInvite();
  };

  const updateInvite = async () => {
    setIsChecking(true);
    try {
      const apiResponse = await fetch(
        "https://lensplay-api.vercel.app/api/invites/redeemInvite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inviteCode: inviteCode,
          }),
        }
      );
      const jsonRes = await apiResponse.json();
      if (apiResponse.status === 403) {
        toast.error(jsonRes?.message);
        return;
      }

      if (apiResponse.status === 400) {
        toast.error(jsonRes?.message);
        return;
      }

      if (apiResponse.status === 200) {
        createUser(jsonRes?.message?.profileId);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          flex: 0.5,
          padding: 16,
        }}
      >
        <Image
          source={require("../../assets/images/home.png")}
          style={{
            flex: 1,
          }}
          contentFit="contain"
        />
      </View>
      <View
        style={{
          alignItems: "center",
          padding: 16,
        }}
      >
        <Heading
          title={"Have an invite code?"}
          style={{
            color: white[800],
            fontWeight: "600",
            fontSize: Dimensions.get("window").width / 12,
          }}
        />
        <TextInput
          placeholder="Enter a code"
          placeholderTextColor={"white"}
          selectionColor={PRIMARY}
          onChange={handleInput}
          style={{
            paddingVertical: 16,
            paddingHorizontal: 16,
            fontSize: 20,
            marginVertical: 24,
            width: "100%",
            backgroundColor: black[400],
            borderRadius: 8,
            color: "white",
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 16,
          padding: 16,
          width: "100%",
        }}
      >
        <Button
          title={"Let's Get In"}
          py={16}
          disabled={!inviteCode}
          textStyle={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "600",
          }}
          isLoading={isChecking}
          onPress={checkIsValidInviteCode}
        />
      </View>
    </SafeAreaView>
  );
}
