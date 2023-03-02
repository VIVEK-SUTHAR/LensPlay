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
          textTransform: "capitalize",
        },
        tabBarItemStyle: {
          width: "auto",
          height: "auto",
          display: "flex",
          flexDirection:"row",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarActiveTintColor:"white",
        tabBarInactiveTintColor:"gray",
        tabBarStyle: { backgroundColor: "transparent" },
        tabBarIndicatorStyle: {
          backgroundColor: primary,
          height: 3,
          borderTopLeftRadius: 4,
          borderTopRightRadius:4,
      
        },
      }}
    >
      {children}
    </Tab.Navigator>
  );
}
