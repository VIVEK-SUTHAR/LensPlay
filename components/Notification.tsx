import {
  SafeAreaView,
  Text,
  View,
} from "react-native";
import React from "react";
import { dark_primary } from "../constants/Colors";
import AnimatedLottieView from "lottie-react-native";

const Navigation = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: dark_primary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{
        height: 500,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <AnimatedLottieView
          autoPlay
          style={{
            height: "auto",
          }}
          source={require("../assets/notifications.json")}
        />
        <View style={{
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 16,
            color: "white",
            marginVertical: 5,
            marginHorizontal: 15,
            fontWeight: "600",
            alignSelf: "flex-start",
          }}>No new notifications</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Navigation;