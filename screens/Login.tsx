import { Dimensions, Image, StyleSheet, View } from "react-native";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import StyledText from "../components/UI/StyledText";
import { RootStackScreenProps } from "../types/navigation/types";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";

const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#93E9C8" style="dark" />
      <View style={{ position: "relative" }}>
        <Image
          source={require("../assets/images/Vector256.png")}
          style={{
            width: windowWidth,
            height: windowWidth + 100,
            marginTop: -Constants.statusBarHeight / 2,
          }}
          resizeMode={"contain"}
        />
        <Image
          source={require("../assets/images/login1.png")}
          style={{
            width: windowWidth,
            height: windowHeight / 2 + 100,
            position: "absolute",
            top: -30,
          }}
          resizeMode={"contain"}
        />
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <Heading
          title={"LensPlay"}
          style={{
            fontSize: 54,
            color: "white",
            fontWeight: "600",
            textAlign: "center",
          }}
        />
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
            paddingHorizontal: 34,
            marginTop: 8,
          }}
        >
          <StyledText
            title={"See the world in a"}
            style={{
              fontSize: 20,
              color: "white",
              fontWeight: "500",
              textAlign: "right",
            }}
          />
          <View style={{ flexDirection: "row", marginTop: -4 }}>
            <StyledText
              title={"different"}
              style={{
                fontSize: 20,
                color: "#93E9C8",
                fontWeight: "500",
                textAlign: "right",
                marginRight: 8,
              }}
            />
            <StyledText
              title={"way"}
              style={{
                fontSize: 20,
                color: "white",
                fontWeight: "500",
                textAlign: "right",
              }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          position: "absolute",
          bottom: 16,
          width: "100%",
        }}
      >
        <Button
          onPress={async () => {
            navigation.push("ConnectWallet");
          }}
          title="Get Started"
          bg="#93E9C8"
          borderRadius={50}
          textStyle={{ fontWeight: "600", fontSize: 20 }}
          py={12}
          icon={<AntDesign name="arrowright" size={20} color="black" />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
