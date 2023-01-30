import React from "react";
import { Text, View } from "react-native";
import { dark_primary } from "../constants/Colors";
import Avatar from "./UI/Avatar";
import Heading from "./UI/Heading";
import SubHeading from "./UI/SubHeading";

export default function ProfileCard() {
  return (
    <View
      style={{
        backgroundColor: dark_primary,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Avatar
        src={
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
        }
        height={60}
        width={60}
      />
      <View
        style={{
          marginLeft: 8,
        }}
      >
        <Heading
          title="Harsh Sachaniya"
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "500",
          }}
        />
        <SubHeading
          title="@iamharsh"
          style={{
            color: "gray",
            fontSize: 12,
          }}
        />
      </View>
    </View>
  );
}
