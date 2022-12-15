import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useRef } from "react";
import { Feather } from "@expo/vector-icons";
import { dark_primary, dark_secondary, primary } from "../constants/Colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Uploadvideo from "../components/Uploadvideo";
import GoLive from "../components/GoLive";

const UploadStack = createNativeStackNavigator();

const UploadVideo = ({ navigation }) => {
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
            LensPlay
          </Text>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              width: "auto",
              height: 20,
              marginHorizontal: 5,
              paddingHorizontal: 5,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.6)",
            }}
          >
            <Text style={{ color: primary, fontSize: 12 }}>Beta</Text>
          </View>
        </View>
      ),
    });
  }, []);
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
      <View>
        {/* <View
          style={{
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.08)",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
        >
          <Image
            source={require("../assets/images/upload.png")}
            style={{
              alignSelf: "center",
              height: "80%",
              width: "80%",
              resizeMode: "contain",
            }}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("UploadScreen");
            }}
          >
            <View
              style={{
                borderRadius: 50,
                borderColor: primary,
                borderWidth: 1,
                paddingVertical: 5,
                width: "auto",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "600",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Upload your Video
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View> */}
      </View>
      {/* <View
        style={{
          flex: 0.5,
          paddingHorizontal: 10,
          marginVertical: 15,
        }}
      >
        <View
          style={{
            height: "100%",
            justifyContent: "space-between",
            backgroundColor: "rgba(255,255,255,0.08)",
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Image
            source={require("../assets/images/live.png")}
            style={{
              alignSelf: "center",
              height: "70%",
              width: "70%",
              resizeMode: "contain",
            }}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("GoLive");
            }}
          >
            <View
              style={{
                borderRadius: 50,
                borderColor: primary,
                borderWidth: 1,
                paddingVertical: 5,
                width: "auto",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "600",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Go Live
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "white",
    marginVertical: 5,
    marginHorizontal: 15,
    fontWeight: "600",
    alignSelf: "flex-start",
  },
});
