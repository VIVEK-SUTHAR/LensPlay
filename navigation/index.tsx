//@ts-ignore
import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
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
import { dark_secondary, primary } from "../constants/Colors";
import Feed from "../screens/Feed";
import Login from "../screens/Login";
import {
  RootStackParamList,
  RootTabParamList,
} from "../types/navigation/types";
import Profile from "../screens/Profile";
import Trending from "../screens/Trending";
import Notification from "../screens/Notification";
import UploadVideo from "../screens/UploadVideo";
import Search from "../screens/Search";
import Heading from "../components/UI/Heading";
import SubHeading from "../components/UI/SubHeading";
import Channel from "../screens/Channel";

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
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
      }}
    >
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
        options={{
          headerShown: false,
          presentation: "containedModal",
          animation: "slide_from_right",
        }}
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
      <Stack.Screen
        name="Channel"
        component={Channel}
        options={{
          animation: "slide_from_left",
          headerShown: true,
          headerTintColor: primary,
        }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({ navigation }) {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "black", elevation: 0 },
        headerTitle: "",
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
            <Heading
              title="LensPlay"
              style={{ fontSize: 24, fontWeight: "600", color: "white" }}
            />
            <View
              style={{
                backgroundColor: primary,
                marginHorizontal: 4,
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 10,
              }}
            >
              <SubHeading
                title="BETA"
                style={{ color: "white", fontSize: 8, fontWeight: "600" }}
              />
            </View>
          </View>
        ),
        tabBarStyle: {
          position: "absolute",
          borderTopLeftRadius: 25,
          borderTopRightRadius:25,
          height: 54,
          backgroundColor: dark_secondary,
          borderTopColor: dark_secondary,
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
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  color={focused ? primary : "white"}
                  size={26}
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
                <Ionicons
                  name={focused ? "ios-compass" : "ios-compass-outline"}
                  size={28}
                  color={focused?primary:"white"}
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
                  name={focused ? "pluscircle" : "pluscircleo"}
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
          // tabBarBadge: 2,z
          // tabBarBadgeStyle: {
          //   backgroundColor: primary,
          //   left: 0,
          // },
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
                  name={
                    focused ? "ios-notifications" : "ios-notifications-outline"
                  }
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
                <FontAwesome
                  name={focused ? "user" : "user-o"}
                  color={focused ? primary : "white"}
                  size={26}
                />
              </View>
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
