import * as Clipboard from "expo-clipboard";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  BackHandler,
  Image,
  Pressable,
  TextInput,
  Vibration,
  View,
} from "react-native";
import Icon from "../../components/Icon";
import Heading from "../../components/UI/Heading";
import StyledText from "../../components/UI/StyledText";
import { dark_primary } from "../../constants/Colors";
import { useToast } from "../../store/Store";
import { RootStackScreenProps } from "../../types/navigation/types";
import { ToastType } from "../../types/Store";

export default function LeaderBoard({
  navigation,
  route,
}: RootStackScreenProps<"LeaderBoard">) {
  const toast = useToast();

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        paddingVertical: 64,
        paddingHorizontal: 16,
        alignItems: "center",
      }}
    >
      <StatusBar style="light" backgroundColor="transparent" />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={{ width: 40, height: 40 }}
        />
        <Heading
          title="LensPlay"
          style={{
            fontSize: 32,
            fontWeight: "600",
            color: "white",
            marginLeft: 4,
            marginBottom: 8,
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 16,
          paddingVertical: 24,
          backgroundColor: dark_primary,
          marginTop: 32,
          alignItems: "center",
          borderRadius: 8,
        }}
      >
        <View
          style={{
            paddingVertical: 16,
            alignItems: "center",
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderTopColor: "gray",
            borderBottomColor: "gray",
          }}
        >
          <StyledText
            title="Your spot in line"
            style={{
              fontSize: 20,
              fontWeight: "600",
              textTransform: "uppercase",
              color: "white",
            }}
          />
          <Heading
            title={route.params.rankingPosition}
            style={{
              fontSize: 34,
              fontWeight: "600",
              marginTop: 8,
              color: "white",
            }}
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <View
          style={{
            padding: 16,
            backgroundColor: dark_primary,
            marginTop: 16,
            alignItems: "center",
            borderRadius: 8,
            width: "48%",
          }}
        >
          <Icon name="star" size={28} color="#5C7CFA" />
          <StyledText
            title="Points"
            style={{
              fontSize: 16,
              fontWeight: "600",
              textTransform: "uppercase",
              color: "white",
              marginTop: 8,
            }}
          />
          <Heading
            title={route.params.rankingPoints}
            style={{
              fontSize: 24,
              fontWeight: "600",
              color: "white",
            }}
          />
        </View>
        <View
          style={{
            padding: 16,
            backgroundColor: dark_primary,
            marginTop: 16,
            alignItems: "center",
            borderRadius: 8,
            width: "48%",
          }}
        >
          <Icon name="referal" size={28} color="#339AF0" />
          <StyledText
            title="Refferal"
            style={{
              fontSize: 16,
              fontWeight: "600",
              textTransform: "uppercase",
              color: "white",
              marginTop: 8,
            }}
          />
          <Heading
            title={route.params.referralsCount}
            style={{
              fontSize: 24,
              fontWeight: "600",
              color: "white",
            }}
          />
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 48, width: "80%" }}>
        <Heading
          title="Go Ahead of the Heard"
          style={{
            fontSize: 24,
            fontWeight: "600",
            color: "white",
          }}
        />
        <StyledText
          title="Move up in the queue by inviting your friends with this link"
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "gray",
            marginTop: 4,
            textAlign: "center",
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          width: 300,
          padding: 8,
          borderRadius: 4,
          marginTop: 24,
        }}
      >
        <TextInput
          value={"https://form.waitlistpanda.com/"}
          editable={false}
          style={{
            color: "black",
            fontSize: 16,
            fontWeight: "600",
            width: "90%",
          }}
          selectionColor={"black"}
          placeholderTextColor={"black"}
        />
        <Pressable
          style={{ marginHorizontal: 8 }}
          onPress={async () => {
            await Clipboard.setStringAsync(route.params.refferalLink);
            Vibration.vibrate(100, true);
            toast.show("Link copied", ToastType.SUCCESS, true);
          }}
        >
          <Icon name="copy" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}
