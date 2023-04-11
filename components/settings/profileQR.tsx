import * as Clipboard from "expo-clipboard";
import React, { useEffect, useState } from "react";
import { useProfile, useToast } from "../../store/Store";
import {
  Dimensions,
  Image,
  Pressable,
  Share,
  Vibration,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Avatar from "../UI/Avatar";
import getRawurl from "../../utils/getRawUrl";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import formatHandle from "../../utils/formatHandle";
import { dark_primary } from "../../constants/Colors";
import Icon from "../Icon";
import { ToastType } from "../../types/Store";

export default function ProfileQR() {
  const [profileQR, setProfileQR] = useState<string | null>(null);
  const { currentProfile } = useProfile();
  const toast = useToast();
  const windowWidth = Dimensions.get("window").width;
  const profileLink = `https://lensplay.xyz/channel/${currentProfile?.id}`;

  async function getQR() {
    const profileQR = await AsyncStorage.getItem("@profileQR");
    setProfileQR(profileQR);
  }

  useEffect(() => {
    getQR();
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Avatar
          src={getRawurl(currentProfile?.picture)}
          height={windowWidth / 3}
          width={windowWidth / 3}
        />
        <Heading
          title={currentProfile?.name}
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "600",
          }}
        />
        <StyledText
          title={formatHandle(currentProfile?.handle)}
          style={{
            color: "gray",
            fontSize: 12,
            fontWeight: "500",
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: dark_primary,
          borderRadius: 16,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 24,
        }}
      >
        {profileQR ? (
          <Image
            source={{
              uri: profileQR,
            }}
            style={{
              height: 200,
              width: 200,
              borderRadius: 16,
              marginTop: 24,
            }}
          />
        ) : (
          <></>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: 24,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "white",
              padding: 8,
              borderRadius: 50,
            }}
            onPress={async () => {
              await Clipboard.setStringAsync("");
              Vibration.vibrate(100, true);
              toast.show("Link copied", ToastType.SUCCESS, true);
            }}
          >
            <Icon name="copy" color="black" />
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "white",
              padding: 8,
              borderRadius: 50,
            }}
            onPress={() => {
              Share.share({
                message: profileLink,
              });
            }}
          >
            <Icon name="share" color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
