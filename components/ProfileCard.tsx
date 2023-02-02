import React from "react";
import { Text, View } from "react-native";
import { dark_primary } from "../constants/Colors";
import Avatar from "./UI/Avatar";
import Heading from "./UI/Heading";
import SubHeading from "./UI/SubHeading";

export default function ProfileCard({
  profileIcon = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80",
  profileName = "Harsh Sachaniya",
  handle = "@iamharsh",
}) {
  return (
    <View
      style={{
        backgroundColor: "black",
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginVertical: 4,
      }}
    >
      <Avatar src={profileIcon} height={40} width={40} />
      <View
        style={{
          marginLeft: 8,
        }}
      >
        {profileName && (
          <Heading
            title={profileName}
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "500",
            }}
          />
        )}

        <Heading
          title={handle}
          style={{
            color: profileName ? "gray" : "white",
            fontSize: profileName ? 12 : 16,
            marginTop: profileName ? 0 : -8,
          }}
        />
      </View>
    </View>
  );
}
