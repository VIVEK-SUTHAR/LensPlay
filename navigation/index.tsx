/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
//@ts-ignore
import { AntDesign, Feather } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { ColorSchemeName, Pressable, TouchableWithoutFeedback } from "react-native";
import { View } from "../components/Themed";
import VideoPage from "../screens/VideoPage";
import useColorScheme from "../hooks/useColorScheme";
import Feed from "../screens/Feed";
import Login from "../screens/Login";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { EvilIcons } from "@expo/vector-icons";
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoPage"
        component={VideoPage}
        options={{ headerShown: true, presentation: "card" }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={Feed}
        options={{
          headerRight: () => (
            <TouchableWithoutFeedback style={{padding:"10"}}>  
              <EvilIcons name="search" size={32} color="black" />
            </TouchableWithoutFeedback>
          ),
          tabBarBadge:"7",
          tabBarIcon: ({ color }) => {
            <AntDesign name="home" size={24} color="red" />;
          },
        }}
      />
      <BottomTab.Screen
        name="Go Live"
        component={VideoPage}
        options={{
          tabBarIcon: () => {
            <AntDesign name="home" size={24} color="black" />;
          },
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={Feed}
        options={{
          tabBarIcon: () => {
            <Feather name="users" size={24} color="black" />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
