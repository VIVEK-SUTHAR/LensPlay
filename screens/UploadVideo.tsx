import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { dark_primary, dark_secondary, primary } from "../constants/Colors";

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: dark_primary,
      }}
    >
      <ScrollView>
        <View>
          <Text style={styles.title}>Upload Your Video</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.title}>Title</Text>
          <TextInput
            placeholder="title that describes you video"
            placeholderTextColor={"gray"}
            style={{
              borderWidth: 1,
              borderColor: primary,
              padding: 5,
              borderRadius: 5,
              color: "white",
              width: "90%",
            }}
          />
          <Text style={styles.title}>Description</Text>
          <TextInput
            placeholder="title that describes you video"
            placeholderTextColor={"gray"}
            style={{
              borderWidth: 1,
              borderColor: primary,
              padding: 5,
              borderRadius: 5,
              color: "white",
              width: "90%",
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadVideo;

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
