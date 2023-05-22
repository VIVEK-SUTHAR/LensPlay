import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CreateProfile from "../screens/Auth/CreateProfile";
import Login from "../screens/Auth/Login";
import LoginWithLens from "../screens/Auth/LoginWithLens";
import QRLogin from "../screens/Auth/QRLogin";
import Scanner from "../screens/Auth/Scanner";
import EditProfile from "../screens/BottomTabs/Profile/EditProfile";
import UserStats from "../screens/BottomTabs/Profile/UserStats";
import ShotsComment from "../screens/BottomTabs/Shots/ShotsComment";
import Search from "../screens/Header/Search/Search";
import BugReport from "../screens/Header/Settings/BugReport";
import ProfileScanner from "../screens/Header/Settings/ProfileScanner";
import Settings from "../screens/Header/Settings/Settings";
import UploadShots from "../screens/Header/Upload/Shots/UploadShots";
import AddDetails from "../screens/Header/Upload/Video/AddDetails";
import UploadVideo from "../screens/Header/Upload/Video/UploadVideo";
import JoinWaitlist from "../screens/ZooTools/JoinWaitlist";
import LeaderBoard from "../screens/ZooTools/LeaderBoard";
import AddDescription from "../screens/common/AddDescription";
import Channel from "../screens/common/Channel";
import FullImage from "../screens/common/FullImage";
import Invite from "../screens/common/Invite";
import InviteCode from "../screens/common/InviteCode";
import LinkingVideo from "../screens/common/LinkingVideo";
import Loader from "../screens/common/Loader";
import ReportPublication from "../screens/common/ReportPublication";
import UserVideos from "../screens/common/UserVideos";
import VideoPage from "../screens/common/VideoPage";
import VideoTypes from "../screens/common/VideoTypes";
import { useThemeStore } from "../store/Store";
import useVideoURLStore from "../store/videoURL";
import { RootStackParamList } from "../types/navigation/types";
import BottomTabNavigator from "./BottomTabNavigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  const theme = useThemeStore();
  const { setVideoURI } = useVideoURLStore();

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

      <Stack.Group key={"Invite Code"}>
        <Stack.Screen
          name="Invite"
          component={Invite}
          options={{
            animation: "fade_from_bottom",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="InviteCode"
          component={InviteCode}
          options={{
            animation: "default",
            headerShown: false,
          }}
        />
      </Stack.Group>

      <Stack.Group key={"Auth Screens"}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            animation: "default",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginWithLens"
          component={LoginWithLens}
          options={{
            animation: "default",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreateProfile"
          component={CreateProfile}
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
              headerShown: false,
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
              headerShown: false,
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
          animation: "default",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="VideoPage"
        component={VideoPage}
        listeners={{
          blur: () => {
            // console.log("going back");

            setVideoURI("");
          },
        }}
        options={{
          headerShown: false,
          presentation: "card",
          animation: "default",
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
          animation: "default",
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
          animation: "slide_from_bottom",
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
      <Stack.Screen
        name="UploadVideo"
        component={UploadVideo}
        options={{
          animation: "slide_from_right",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
          headerTintColor: "white",
          headerTitle: "Select Cover",
        }}
      />
      <Stack.Screen
        name="UploadShots"
        component={UploadShots}
        options={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddDetails"
        component={AddDetails}
        options={{
          animation: "slide_from_right",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
          headerTintColor: "white",
          headerTitle: "Add Details",
        }}
      />
      <Stack.Screen
        name="AddDescription"
        component={AddDescription}
        options={{
          animation: "slide_from_right",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
          headerTintColor: "white",
          headerTitle: "Add Description",
        }}
      />
      <Stack.Screen
        name="VideoTypes"
        component={VideoTypes}
        options={{
          animation: "slide_from_right",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
          headerTintColor: "white",
          headerTitle: "Select Video types",
        }}
      />
      <Stack.Screen
        name="ProfileScanner"
        component={ProfileScanner}
        options={{
          animation: "slide_from_right",
          headerShown: false,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
          headerTintColor: "white",
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}
