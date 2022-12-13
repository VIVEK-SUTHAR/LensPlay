import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { dark_primary, dark_secondary } from "../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { client } from "../apollo/client";
import getNotifications from "../apollo/Queries/getUserNotifications";
import fetchNotifications from "../api/fetchNotifications";
import useStore from "../store/Store";

const Navigation = ({ navigation }) => {
  const store = useStore();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "LensPlay",
      headerStyle: { backgroundColor: dark_secondary, elevation: 0 },
      headerRight: () => (
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather name="search" size={24} color="white" />
        </View>
      ),
      headerLeft: () => (
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "600", color: "white" }}>
            Notifications
          </Text>
        </View>
      ),
    });
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: dark_primary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ height: "50%" }}>
        <Image source={require("../assets/images/no.png")} />
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            fontWeight: "700",
            color: "white",
          }}
        >
          No new notifications
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            fontWeight: "400",
            color: "white",
          }}
        >
          Engage with posts and check again
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
