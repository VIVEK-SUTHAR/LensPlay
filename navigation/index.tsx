//@ts-ignore
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  ColorSchemeName,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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
import UploadVideo from "../screens/UploadVideo";
import Search from "../screens/Search";

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
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false, presentation: "card" }}
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
          name="Search"
          component={Search}
          options={{ headerShown: true, presentation: "modal" }}
        />
      </Stack.Navigator>
    </>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({ navigation }) {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: dark_secondary },
        headerTitle:"",
        headerRight: () => (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            <View
              style={{
                paddingHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Feather name="search" size={24} color="white" />
            </View>
          </TouchableWithoutFeedback>
        ),
        headerLeft: () => (
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "600", color: "white" }}>
              LensPlay
            </Text>
            <View
              style={{
                backgroundColor: primary,
                marginHorizontal: 4,
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white", fontSize: 12, fontWeight: "600" }}>
                Beta
              </Text>
            </View>
          </View>
        ),
        tabBarStyle: {
          height: 54,
          backgroundColor: dark_secondary,
          borderTopColor: "lightgray",
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
                  size={28}
                  color={focused ? primary : "white"}
                />
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
                  size={28}
                  color={focused ? primary : "white"}
                />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Create"
        component={UploadVideo}
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
                <AntDesign
                  name="pluscircleo"
                  size={28}
                  color={focused ? primary : "white"}
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
          tabBarBadge: 1,
          tabBarBadgeStyle: {
            backgroundColor: primary,
            left: 0,
          },
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
                  size={28}
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
                <Feather
                  name="user"
                  size={28}
                  color={focused ? primary : "white"}
                />
              </View>
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
