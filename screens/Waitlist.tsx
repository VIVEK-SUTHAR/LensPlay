import React from "react";
import {
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SubHeading from "../components/UI/SubHeading";

export default function Waitlist() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{ width: "80%" }}
        onPress={() =>
          Linking.openURL(
            "https://form.waitlistpanda.com/go/wUIsEr2CcnPtycRD68nc"
          )
        }
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 50,
            paddingVertical: 16,
            marginVertical: 10,
          }}
        >
          <SubHeading
            title="Join the waitlist"
            style={{
              color: "black",
              fontSize: 24,
              fontWeight: "700",
              textAlign: "center",
            }}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
