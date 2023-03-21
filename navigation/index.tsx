//@ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { AppState, TouchableWithoutFeedback, View } from "react-native";
import Icon from "../components/Icon";
import Avatar from "../components/UI/Avatar";
import Heading from "../components/UI/Heading";
import StyledText from "../components/UI/StyledText";
import BugReport from "../screens/BugReport";
import Bytes from "../screens/Bytes";
import Channel from "../screens/Channel";
import ConnectWallet from "../screens/ConnectWallet";
import EditProfile from "../screens/EditProfile";
import Feed from "../screens/Feed";
import FullImage from "../screens/FullImage";
import JoinWaitlist from "../screens/JoinWaitlist";
import LeaderBoard from "../screens/LeaderBoard";
import LinkingVideo from "../screens/LinkingVideo";
import Loader from "../screens/Loader";
import Login from "../screens/Login";
import LoginWithLens from "../screens/LoginWithLens";
import Notifications from "../screens/Notification";
import ProfileScreen from "../screens/Profile";
import QRLogin from "../screens/QRLogin";
import ReportPublication from "../screens/ReportPublication";
import Scanner from "../screens/Scanner";
import Search from "../screens/Search";
import Settings from "../screens/Settings";
import ShotsComment from "../screens/ShotsComment";
import Trending from "../screens/Trending";
import UserStats from "../screens/UserStats";
import UserVideos from "../screens/UserVideos";
import VideoPage from "../screens/VideoPage";
import { useAuthStore, useProfile, useThemeStore } from "../store/Store";
import {
  RootStackParamList,
  RootStackScreenProps,
  RootTabParamList,
} from "../types/navigation/types";
import getIPFSLink from "../utils/getIPFSLink";
import getAccessFromRefresh from "../utils/lens/getAccessFromRefresh";
import storeTokens from "../utils/storeTokens";
import linking from "./LinkingConfiguration";

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
      initialRouteName={"Loader"}
    >
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
          headerTintColor: theme.PRIMARY.toString(),
        }}
      />
      <Stack.Screen
        name="YourVideos"
        component={UserVideos}
        options={{
          animation: "slide_from_right",
          headerShown: true,
          headerTintColor: theme.PRIMARY.toString(),
          headerTitle: "Your videos",
        }}
      />
      <Stack.Screen
        name="LinkingVideo"
        component={LinkingVideo}
        options={{
          animation: "slide_from_right",
          headerShown: false,
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
          headerTitle: "Edit Your Channel",
          headerTintColor: theme.PRIMARY,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
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
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          animation: "slide_from_right",
          headerShown: true,
          headerTintColor: theme.PRIMARY,
          headerTitle: "Settings",
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
        }}
      />
      <Stack.Screen
        name="BugReport"
        component={BugReport}
        options={{
          animation: "fade_from_bottom",
          headerShown: true,
          headerTitle: "Report a Bug",
          headerTintColor: theme.PRIMARY,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
        }}
      />
      <Stack.Screen
        name="FullImage"
        component={FullImage}
        options={{
          animation: "default",
          headerShown: false,
          presentation: "transparentModal",
          headerStyle: { backgroundColor: "transparent" },
          headerTintColor: theme.PRIMARY,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="ShotsComment"
        component={ShotsComment}
        options={{
          animation: "slide_from_right",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
          headerTintColor: theme.PRIMARY,
          headerTitle: "Comments",
        }}
      />
      <Stack.Screen
        name="JoinWaitlist"
        component={JoinWaitlist}
        options={{
          animation: "slide_from_right",
          headerShown: false,
          headerStyle: { backgroundColor: "black" },
          headerTintColor: theme.PRIMARY,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="QRLogin"
        component={QRLogin}
        options={{
          animation: "fade_from_bottom",
          headerShown: true,
          headerTintColor: theme.PRIMARY,
          headerTitle: "Desktop Login",
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
        }}
      />
      <Stack.Screen
        name="Loader"
        component={Loader}
        options={{
          animation: "none",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={{
          animation: "none",
          headerShown: true,
          headerTintColor: theme.PRIMARY,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
        }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({ navigation }: RootStackScreenProps<"Root">) {
  const theme = useThemeStore();
  const user = useProfile();
  const { setAccessToken, setRefreshToken } = useAuthStore();

  React.useEffect(() => {
    const handle = async () => {
      const url = await Linking.getInitialURL();
      handleNavigation(url);
    };
    handle();
    AppState.addEventListener("change", handle);
    Linking.addEventListener("url", (e) => {
      handleNavigation(e.url);
    });
  }, []);

  React.useEffect(() => {
    updateTokens();
    setInterval(() => {
      updateTokens();
    }, 60000);
  }, []);

  function handleNavigation(url: string | null) {
    if (!url) return;
    const LINK = url;
    if (url?.includes("/watch/")) {
      const video_id = LINK?.split("/watch/")[1];
      navigation.navigate("LinkingVideo", {
        id: video_id,
      });
      return;
    }
    if (url?.includes("/channel/")) {
      const profile_id = LINK?.split("/channel/")[1];
      navigation.navigate("Channel", {
        profileId: profile_id,
      });
      return;
    }
  }

  const updateTokens = async () => {
    const userTokens = await AsyncStorage.getItem("@user_tokens");
    if (userTokens) {
      const tokens = JSON.parse(userTokens);
      const generatedTime = tokens.generatedTime;
      const currentTime = new Date().getTime();

      const minute = Math.floor(
        ((currentTime - generatedTime) % (1000 * 60 * 60)) / (1000 * 60)
      );
      if (minute < 25) {
        return;
      } else {
        const newTokens = await getAccessFromRefresh(tokens.refreshToken);
        setAccessToken(newTokens?.accessToken);
        setRefreshToken(newTokens?.refreshToken);
        if (tokens.viaDesktop) {
          await storeTokens(
            newTokens?.accessToken,
            newTokens?.refreshToken,
            true
          );
          return;
        }
        if (!tokens.viaDesktop) {
          storeTokens(newTokens?.accessToken, newTokens?.refreshToken);
          return;
        }
      }
    }
  };

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "black", elevation: 2 },
        headerTitle: "",
        headerRight: () => (
          <View style={{ flexDirection: "row" }}>
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
                <Icon name="search" size={24} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("Settings");
              }}
            >
              <View
                style={{
                  paddingHorizontal: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon name="setting" size={24} />
              </View>
            </TouchableWithoutFeedback>
          </View>
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
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 8,
              }}
            >
              <StyledText
                title="ALPHA"
                style={{ color: "black", fontSize: 8, fontWeight: "600" }}
              />
            </View>
          </View>
        ),
        tabBarStyle: {
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 6,
          borderTopColor: "transparent",
          marginBottom: -5,
          minHeight: 58,
          paddingHorizontal: 5,
        },
        headerShadowVisible: true,
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
                  height: "100%",
                }}
              >
                <Icon
                  name={focused ? "home_filled" : "home_outline"}
                  color={focused ? theme.PRIMARY : "white"}
                  // size={24}
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
                <Icon
                  name={focused ? "compass_filled" : "compass_outline"}
                  color={focused ? theme.PRIMARY : "white"}
                  size={24}
                />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Bytes"
        component={Bytes}
        options={{
          tabBarLabel: "",
          headerShown: false,
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
                <Icon
                  name={focused ? "shots_filled" : "shots_outline"}
                  color={focused ? theme.PRIMARY : "white"}
                  size={24}
                />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={Notifications}
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
                <Icon
                  name={
                    focused ? "notification_filled" : "notification_outline"
                  }
                  color={focused ? theme.PRIMARY : "white"}
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
