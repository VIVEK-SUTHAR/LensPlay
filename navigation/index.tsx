//@ts-ignore
import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { ColorSchemeName, TouchableWithoutFeedback, View } from "react-native";
import VideoPage from "../screens/VideoPage";
import Feed from "../screens/Feed";
import Login from "../screens/Login";
import {
  RootStackParamList,
  RootStackScreenProps,
  RootTabParamList,
} from "../types/navigation/types";
import Trending from "../screens/Trending";
import Notification from "../screens/Notification";
import UploadVideo from "../screens/UploadVideo";
import Search from "../screens/Search";
import Heading from "../components/UI/Heading";
import SubHeading from "../components/UI/SubHeading";
import Channel from "../screens/Channel";
import { useThemeStore } from "../store/Store";
import Home from "../components/Svgs/Home";
import Explore from "../components/Svgs/Explore";
import Upload from "../components/Svgs/Upload";
import NotificationSvg from "../components/Svgs/Notification";
import ProfileSvg from "../components/Svgs/Profile";
import { primary } from "../constants/Colors";
import ProfileScreen from "../screens/Profile";

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
  const theme = useThemeStore();
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
        options={{
          headerShown: false,
          animation: "slide_from_right",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="VideoPage"
        component={VideoPage}
        options={{
          headerShown: false,
          presentation: "card",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: true,
          presentation: "card",
          animation: "default",
        }}
      />
      <Stack.Screen
        name="Channel"
        component={Channel}
        options={{
          animation: "slide_from_left",
          headerShown: true,
          headerTintColor: theme.PRIMARY,
        }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({ navigation }: RootStackScreenProps<"Root">) {
  const theme = useThemeStore();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "black", elevation: 2 },
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
                backgroundColor: theme.PRIMARY,
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
          height: 54,
          backgroundColor: "black",
          borderTopColor: "transparent",
          paddingHorizontal: 10,
        },
        headerShadowVisible: true,
      }}
    >
      {/* {NavigationItems.map((item, index) => (
        <BottomTab.Screen
          key={index}
          name={item.name}
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
                    borderTopColor: focused ? theme.PRIMARY : "transparent",
                    height: "100%",
                  }}
                >
                  {item.icon}
                </View>
              );
            },
          }}
        />
      ))} */}

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
                  borderTopColor: focused ? theme.PRIMARY : "transparent",
                  height: "100%",
                }}
              >
                <Home fill={focused ? primary : "none"} />
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
                  borderTopWidth: 2,
                  borderTopColor: focused ? theme.PRIMARY : "transparent",
                  height: "100%",
                }}
              >
                <Explore fill={focused ? primary : "#FFFFFF"} />
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
                  borderTopWidth: 2,
                  borderTopColor: focused ? theme.PRIMARY : "transparent",
                  height: "100%",
                }}
              >
                <Upload fill={focused ? primary : "#FFFFFF"} />
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
                  borderTopWidth: 2,
                  borderTopColor: focused ? theme.PRIMARY : "transparent",
                  height: "100%",
                }}
              >
                <NotificationSvg fill={focused ? primary : "none"} />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={ProfileScreen}
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
                  borderTopWidth: 2,
                  borderTopColor: focused ? theme.PRIMARY : "transparent",
                  height: "100%",
                }}
              >
                <ProfileSvg fill={focused ? primary : "#FFFFFF"} />
              </View>
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
