import React from "react";
import { View } from "react-native";
import { dark_primary } from "../../constants/Colors";
import Avatar from "./Avatar";

const ProfileCardSkeleton = () => {
  return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          marginVertical: 4,
          borderBottomWidth: 1,
          borderBottomColor: dark_primary,
        }}
      >
        <View style={{
            height: 40,
            width: 40,
            backgroundColor: "rgba(255,255,255,0.7)",
            borderRadius: 20
        }}></View>
        <View
          style={{
            marginLeft: 8,
          }}
        >
            <View style={{
                width: 140,
                height: 10,
                backgroundColor: "gray",
            }}/>
            <View style={{
                width: 100,
                marginTop: 8,
                height: 10,
                backgroundColor: "gray",
            }}/>
        </View>
      </View>
  );
}

export default ProfileCardSkeleton;
