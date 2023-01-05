import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { dark_primary, primary } from "../constants/Colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Uploadvideo from "../components/Uploadvideo";
import GoLive from "../components/GoLive";
import AnimatedLottieView from "lottie-react-native";
import Drawer from "../components/UI/Drawer";
import Heading from "../components/UI/Heading";
import Button from "../components/UI/Button";
import { UploadScreenProps } from "../types/navigation/types";

const UploadStack = createNativeStackNavigator();

const UploadVideo = ({ navigation }) => {
  return (
    <UploadStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="UploadIndex"
    >
      <UploadStack.Screen name="UploadIndex" component={Index} />
      <UploadStack.Screen
        name="UploadScreen"
        component={Uploadvideo}
        options={{ animation: "slide_from_right", animationDuration: 100 }}
      />
      <UploadStack.Screen name="GoLive" component={GoLive} />
    </UploadStack.Navigator>
  );
};

export default UploadVideo;

function Index({ navigation }: UploadScreenProps<"Index">) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View
        style={{
          height: 500,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimatedLottieView
          autoPlay
          style={{
            height: "auto",
          }}
          source={require("../assets/upload.json")}
        />
        <Button
          type="outline"
          title="Upload Video"
          width={"auto"}
          px={24}
          borderColor={primary}
          borderRadius={10}
          textStyle={{ color: "white", fontWeight: "700", fontSize: 20 }}
          onPress={() => {
            navigation.navigate("UploadScreen");
          }}
        />
      </View>
    </SafeAreaView>
  );
}
