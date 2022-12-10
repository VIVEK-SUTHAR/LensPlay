//@ts-ignore
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { ColorSchemeName, Text, View } from "react-native";
import VideoPage from "../screens/VideoPage";
import { dark_primary, dark_secondary, primary } from "../constants/Colors";
import Feed from "../screens/Feed";
import Login from "../screens/Login";
import { RootTabParamList } from "../types";
import Profile from "../screens/Profile";
import Create from "../components/Create";
import useStore from "../store/Store";
import Trending from "../screens/Trending";
import Notification from "../components/Notification";

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

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerTitle: "LensPlay" }}>
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
          options={{ headerShown: false, presentation: "containedModal" }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: true, presentation: "card" }}
        />
        <Stack.Screen
          name="Create"
          component={Create}
          options={{ headerShown: true, presentation: "card" }}
        />
        <Stack.Screen
          name="Trending"
          component={Trending}
          options={{ headerShown: true, presentation: "card" }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: true, presentation: "card" }}
        />
      </Stack.Navigator>
    </>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const state = useStore();
  const setIsOpen = state.setIsOpen;
  const isOpen = state.isOpen;
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: "",
        headerLeft: () => {
          return (
            <View
              style={{
                minWidth: "100%",
                height: "100%",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingHorizontal: 15,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: "white",
                }}
              >
                LensPlay
              </Text>
            </View>
          );
        },
        tabBarStyle: {
          height: 55,
          backgroundColor: dark_secondary,
          borderTopColor: "gray",
          paddingHorizontal: 10,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Feed}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  padding: 5,
                  width: 45,
                  alignContent: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  borderTopWidth: focused ? 2 : 0,
                  borderTopColor: focused ? primary : "none",
                  height: "100%",
                }}
              >
                <Feather
                  name="home"
                  size={24}
                  color={focused ? primary : "white"}
                />
              </View>
            );
          },
          headerRight: () => {
            return (
              <View
                style={{
                  padding: 5,
                }}
              >
                <Feather name="search" size={24} color={"black"} />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Trending"
        component={Trending}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  padding: 5,
                  width: 45,
                  alignContent: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  borderTopWidth: focused ? 2 : 0,
                  borderTopColor: focused ? primary : "none",
                  height: "100%",
                }}
              >
                <Feather
                  name="trending-up"
                  size={24}
                  color={focused ? primary : "white"}
                />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Create"
        component={Profile}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  // width: 40,
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  // height: 40,
                  backgroundColor: primary,
                  borderRadius: 50,
                  borderColor: primary,
                  borderWidth:2
                }}
              >
                <AntDesign
                  name="pluscircleo"
                  size={28}
                  color={"black"}
                />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={Notification}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  padding: 5,
                  width: 45,
                  alignContent: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  borderTopWidth: focused ? 2 : 0,
                  borderTopColor: focused ? primary : "none",
                  height: "100%",
                }}
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={focused ? primary : "white"}
                />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={Profile}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  padding: 5,
                  width: 45,
                  alignContent: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  borderTopWidth: focused ? 2 : 0,
                  borderTopColor: focused ? primary : "none",
                  height: "100%",
                }}
              >
                <Feather name="user" size={24} color="white" />
              </View>
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
