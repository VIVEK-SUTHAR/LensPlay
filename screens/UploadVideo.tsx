import { View, SafeAreaView } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Uploadvideo from "../components/Uploadvideo";
import GoLive from "../components/GoLive";
import AnimatedLottieView from "lottie-react-native";
import Button from "../components/UI/Button";
import {
  UploadScreenProps,
  UploadTabParamsList,
} from "../types/navigation/types";
import { useThemeStore } from "../store/Store";

const UploadStack = createNativeStackNavigator();

const UploadVideo = ({}: UploadTabParamsList) => {
  return (
    <UploadStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="UploadIndex"
    >
      <UploadStack.Screen name="Index" component={Index} />
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
  const theme = useThemeStore();
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
          borderColor={theme.PRIMARY}
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
