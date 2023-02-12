//@ts-ignore
import { Feather, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Image, TouchableWithoutFeedback, View } from "react-native";
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
import StyledText from "../components/UI/StyledText";
import Channel from "../screens/Channel";
import { useProfile, useThemeStore } from "../store/Store";
import ProfileScreen from "../screens/Profile";
import UserVideos from "../screens/UserVideos";
import Waitlist from "../screens/Waitlist";
import {
  HOME_FILLED,
  HOME_OUTLINE,
  NOTI_FILLED,
  NOTI_OUTLINE,
  UPLOAD_FILLED,
  UPLOAD_OUTLINE,
} from "../components/Icons";
import Avatar from "../components/UI/Avatar";
import getIPFSLink from "../utils/getIPFSLink";
import linking from "./LinkingConfiguration";
import LinkingVideo from "../screens/LinkingVideo";
import { dark_primary } from "../constants/Colors";
import UserStats from "../screens/UserStats";
import LeaderBoard from "../screens/LeaderBoard";
import EditProfile from "../screens/EditProfile";
import SearchIcon from "../components/svg/SearchIcon";
import Loader from "../screens/Loader";
import ConnectWallet from "../screens/ConnectWallet";
import LoginWithLens from "../screens/LoginWithLens";
import ReportPublication from "../screens/ReportPublication";

export default function Navigation() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer linking={linking}>
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
      initialRouteName={"Root"}
    >
      <Stack.Screen
        name="Waitlist"
        component={Waitlist}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Loader"
        component={Loader}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LeaderBoard"
        component={LeaderBoard}
        options={{ headerShown: false }}
      />
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
          headerShown: false,
          headerTintColor: theme.PRIMARY,
        }}
      />
      <Stack.Screen
        name="YourVideos"
        component={UserVideos}
        options={{
          animation: "slide_from_right",
          headerShown: true,
          headerTintColor: theme.PRIMARY,
          headerTitle: "Your videos",
        }}
      />
      <Stack.Screen
        name="LinkingVideos"
        component={LinkingVideo}
        options={{
          animation: "slide_from_right",
          headerShown: false,
          headerTintColor: theme.PRIMARY,
          headerTitle: "Your videos",
        }}
      />
      <Stack.Screen
        name="UserStats"
        component={UserStats}
        options={{
          animation: "slide_from_right",
          headerShown: true,
          headerTintColor: theme.PRIMARY,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          animation: "slide_from_right",
          headerShown: true,
          headerTitle:"Edit Your Channel",
          headerTintColor: theme.PRIMARY,
        }}
      />
      <Stack.Screen
        name="ConnectWallet"
        component={ConnectWallet}
        options={{
          animation: "slide_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginWithLens"
        component={LoginWithLens}
        options={{
          animation: "slide_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReportPublication"
        component={ReportPublication}
        options={{
          animation: "slide_from_right",
          headerShown: true,
          headerTintColor: theme.PRIMARY,
          headerTitle: "Report Video",
        }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({ navigation }: RootStackScreenProps<"Root">) {
  const theme = useThemeStore();
  const user = useProfile();
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
              <SearchIcon width={24} height={24} />
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
                paddingHorizontal: 4,
                paddingVertical: 2,
                borderRadius: 10,
              }}
            >
              <StyledText
                title="BETA"
                style={{ color: "white", fontSize: 8, fontWeight: "700" }}
              />
            </View>
          </View>
        ),
        tabBarStyle: {
          paddingVertical: 2,
          height: "auto",
          minHeight: 55,
          backgroundColor: dark_primary,
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
                  height: "100%",
                }}
              >
                <Image
                  source={{
                    uri: focused ? HOME_FILLED : HOME_OUTLINE,
                  }}
                  style={{
                    alignSelf: "center",
                    height: 26,
                    width: 26,
                  }}
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
                  height: "100%",
                }}
              >
                <Ionicons
                  name={focused ? "compass" : "compass-outline"}
                  color={focused ? theme.PRIMARY : "white"}
                  size={28}
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
                  height: "100%",
                }}
              >
                <Image
                  source={{
                    uri: focused ? UPLOAD_FILLED : UPLOAD_OUTLINE,
                  }}
                  style={{
                    alignSelf: "center",
                    height: 26,
                    width: 26,
                  }}
                />
                {/* <Feather
                  name={"plus-circle"}
                  color={focused ? theme.PRIMARY : "white"}
                  size={28}
                /> */}
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
                  height: "100%",
                }}
              >
                <Image
                  source={{
                    uri: focused ? NOTI_FILLED : NOTI_OUTLINE,
                  }}
                  style={{
                    alignSelf: "center",
                    height: 26,
                    width: 26,
                  }}
                />
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
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  width: 30,
                  alignContent: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  height: 30,
                  borderRadius: 45,
                  borderColor: focused ? theme.PRIMARY : "transparent",
                  borderWidth: 1,
                }}
              >
                <Avatar
                  src={getIPFSLink(
                    user?.currentProfile?.picture?.original?.url
                  )}
                  height={28}
                  width={28}
                />
              </View>
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
