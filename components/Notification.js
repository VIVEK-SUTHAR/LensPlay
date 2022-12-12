import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { dark_primary, dark_secondary } from "../constants/Colors";
import { Feather } from "@expo/vector-icons";

const Navigation = ({navigation}) => {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: dark_primary }}>
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
