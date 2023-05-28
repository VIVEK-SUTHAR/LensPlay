import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { black } from "constants/Colors";
import React, { ReactNode } from "react";

export const Tab = createMaterialTopTabNavigator();

export default function Tabs({ children }: { children: ReactNode }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
          textTransform: "capitalize",
          fontFamily: "OpenSans_SemiBold",
        },
        tabBarItemStyle: {
          width: "auto",
          height: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "black",
          borderBottomWidth: 1,
          borderBottomColor: black[600],
        },
        tabBarIndicatorStyle: {
          display: "none",
        },
      }}
    >
      {children}
    </Tab.Navigator>
  );
}
