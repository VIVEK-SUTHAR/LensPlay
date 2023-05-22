import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { ReactNode } from "react";
import { black, primary } from "../../constants/Colors";

export const Tab = createMaterialTopTabNavigator();

export default function Tabs({ children }: { children: ReactNode }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
          textTransform: "capitalize",
          fontFamily: "OpenSans_Bold",
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
          borderBottomColor: black[300],
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
