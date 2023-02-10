import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBarIOS,
  StyleSheet,
  View,
} from "react-native";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import StyledText from "../components/UI/StyledText";
import { RootStackScreenProps } from "../types/navigation/types";
import Constants from "expo-constants";

export default function LoginWithLens({
  navigation,
}: RootStackScreenProps<"LoginWithLens">) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#93E9C8" style="dark" />
      <View style={{ position: "relative", alignItems: "center" }}>
        <Image
          source={require("../assets/images/Vector258.png")}
          style={{
            width: windowWidth,
            height: windowWidth + 105,
            marginTop: -Constants.statusBarHeight/2,
          }}
          resizeMode={"contain"}
        />
        <Image
          source={require("../assets/images/login3.png")}
          style={{
            width: windowWidth * 0.9,
            height: 495,
            position: "absolute",
            bottom: 32,
            right: 0,
          }}
          resizeMode={"contain"}
        />
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <View
          style={{
            position: "relative",
            flexDirection: "column",
            alignItems: "flex-end",
            paddingHorizontal: 34,
            marginTop: 8,
            top: 72,
          }}
        >
          <StyledText
            title={"SignIn &"}
            style={{
              fontSize: 24,
              color: "white",
              fontWeight: "500",
              textAlign: "right",
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <StyledText
              title={"experience Lens"}
              style={{
                fontSize: 24,
                color: "#93E9C8",
                fontWeight: "500",
                textAlign: "right",
                marginRight: 8,
              }}
            />
          </View>
        </View>
        <View style={{ padding: 16, marginTop: 144 }}>
          <Button
            title="Login With Lens"
            bg="#93E9C8"
            borderRadius={5}
            textStyle={{ fontWeight: "700", fontSize: 24 }}
            py={16}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginWithLens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
