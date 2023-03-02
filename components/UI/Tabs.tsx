import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { ReactNode } from "react";
import { primary } from "../../constants/Colors";

const Tab = createMaterialTopTabNavigator();

export default function Tabs({ children }: { children: ReactNode }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          color: "white",
          textTransform: "capitalize",
        },
        tabBarItemStyle: {
          width: "auto",
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarStyle: { backgroundColor: "transparent" },
        tabBarIndicatorStyle: {
          backgroundColor: primary,
          height: 3,
        },
      }}
    >
      {children}
    </Tab.Navigator>
  );
}
