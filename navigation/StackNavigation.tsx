import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Channel from "../screens/Channel";
import LeaderBoard from "../screens/ZooTools/LeaderBoard";
import Login from "../screens/Auth/Login";
import Search from "../screens/Search";
import UserVideos from "../screens/UserVideos";
import VideoPage from "../screens/VideoPage";
import { useThemeStore } from "../store/Store";
import { RootStackParamList } from "../types/navigation/types";
import React from "react";
import LinkingVideo from "../screens/LinkingVideo";
import UserStats from "../screens/UserStats";
import EditProfile from "../screens/EditProfile";
import ConnectWallet from "../screens/Auth/ConnectWallet";
import LoginWithLens from "../screens/Auth/LoginWithLens";
import ReportPublication from "../screens/ReportPublication";
import Settings from "../screens/Settings";
import BugReport from "../screens/BugReport";
import FullImage from "../screens/FullImage";
import ShotsComment from "../screens/ShotsComment";
import JoinWaitlist from "../screens/ZooTools/JoinWaitlist";
import QRLogin from "../screens/Auth/QRLogin";
import Loader from "../screens/Loader";
import Scanner from "../screens/Auth/Scanner";
import BottomTabNavigator from "./BottomTabNavigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation() {
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
      <Stack.Group key={"ZooTools Screens"}>
        <Stack.Screen
          name="LeaderBoard"
          component={LeaderBoard}
          options={{ headerShown: false }}
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
      </Stack.Group>

      <Stack.Group key={"Auth Screens"}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
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
        <Stack.Group key={"DeskTop Login Screens"}>
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
        </Stack.Group>
      </Stack.Group>
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
        name="Loader"
        component={Loader}
        options={{
          animation: "none",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}