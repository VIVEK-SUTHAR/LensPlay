import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { dark_primary, primary } from "../constants/Colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Uploadvideo from "../components/Uploadvideo";
import GoLive from "../components/GoLive";
import AnimatedLottieView from "lottie-react-native";

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
      <UploadStack.Screen name="UploadScreen" component={Uploadvideo} />
      <UploadStack.Screen name="GoLive" component={GoLive} />
    </UploadStack.Navigator>
  );
};

export default UploadVideo;

function Index({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark_primary }}>
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
          source={require("../assets/upload.json")}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("UploadScreen");
          }}
        >
          <View style={{
            alignItems: 'center',
            backgroundColor: primary,
            paddingHorizontal: 24,
            paddingVertical: 4,
            borderRadius: 10,
          }}>
            <Text style={{
              fontSize: 20,
              color: "white",
              marginVertical: 5,
              marginHorizontal: 15,
              fontWeight: "600",
              alignSelf: "flex-start",
            }}>Upload a video</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}