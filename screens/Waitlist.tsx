import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Linking, SafeAreaView, TextInput, View } from "react-native";
import searchUser from "../api/zooTools/searchUser";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import LeaderBoard from "./LeaderBoard";
import { primary } from "../constants/Colors";
import { RootStackScreenProps } from "../types/navigation/types";

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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
              fontWeight: "700",
              fontSize: 16,
              marginBottom: 16,
            }}
          />
          <Button
            title={"Check your Position 👀"}
            onPress={() => {
              setEmail("");
              handleUser(email);
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
