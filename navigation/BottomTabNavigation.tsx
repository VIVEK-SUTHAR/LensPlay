import type { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "components/Icon";
import UploadSelect from "components/Sheets/UploadSelect";
import UploadType from "components/Sheets/UploadType";
import Avatar from "components/UI/Avatar";
import LensPlayBadge from "components/UI/LensPlayBadge";
import BottomTabButton from "components/common/BottomTabButton";
import { black } from "constants/Colors";
import dimensions from "constants/Layout";
import type {
  RootStackScreenProps,
  RootTabParamList,
} from "customTypes/navigation";
import useUpdateTokens from "hooks/useUpdateTokens";
import React, { useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Trending from "screens/BottomTabs/Explore/Trending";
import Feed from "screens/BottomTabs/Home/Feed";
import Notifications from "screens/BottomTabs/Notification/Notification";
import ProfileScreen from "screens/BottomTabs/Profile/Profile";
import Shots from "screens/BottomTabs/Shots/Shots";
import { useProfile } from "store/Store";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

type BottomTabsTyes = {
  name: "Home" | "Trending" | "Shots" | "Notifications";
  component: any;
  filledIcon: React.ReactNode;
  outlinedIcon: React.ReactNode;
};

type HeaderIconsTypes = {
  name: string;
  icon: React.ReactNode;
  onPress: () => void;
};

const BottomTabs: BottomTabsTyes[] = [
  {
    name: "Home",
    component: Feed,
    filledIcon: <Icon name={"home_filled"} color={"white"} size={25} />,
    outlinedIcon: <Icon name={"home_outline"} color={"white"} size={25} />,
  },
  {
    name: "Trending",
    component: Trending,
    filledIcon: <Icon name={"compass_filled"} color={"white"} size={24} />,
    outlinedIcon: <Icon name={"compass_outline"} color={"white"} size={24} />,
  },
  {
    name: "Shots",
    component: Shots,
    filledIcon: <Icon name={"shots_filled"} color={"white"} size={24} />,
    outlinedIcon: <Icon name={"shots_outline"} color={"white"} size={24} />,
  },
  {
    name: "Notifications",
    component: Notifications,
    filledIcon: <Icon name={"notification_filled"} color={"white"} />,
    outlinedIcon: <Icon name={"notification_outline"} color={"white"} />,
  },
];

export default function BottomTabNavigator({
  navigation,
}: RootStackScreenProps<"Root">) {
  const { currentProfile } = useProfile();
  useUpdateTokens();

  const uploadRef = useRef<BottomSheetMethods>(null);
  const uploadTypeRef = useRef<BottomSheetMethods>(null);

  const HeaderIcons: HeaderIconsTypes[] = [
    // {
    //   name: "upload",
    //   icon: <Upload height={24} width={24} />,
    //   onPress: () => {
    //     uploadTypeRef.current?.snapToIndex(0);
    //   },
    // },
    {
      name: "search",
      icon: <Icon name="search" size={24} />,
      onPress: () => {
        navigation.push("Search");
      },
    },
    {
      name: "settings",
      icon: <Icon name="setting" size={24} />,
      onPress: () => {
        navigation.navigate("Settings");
      },
    },
  ];

  return (
    <>
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerStyle: { backgroundColor: "black", elevation: 2 },
          headerTitle: "",
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {HeaderIcons.map((icon,index) => (
                <Pressable
                key={`${icon.name}-${index}`}
                  onPress={icon.onPress}
                  style={styles.headerIconContainer}
                >
                  {icon.icon}
                </Pressable>
              ))}
            </View>
          ),
          headerLeft: () => <LensPlayBadge />,
          tabBarStyle: styles.tabBarStyle,
          headerShadowVisible: false,
        }}
      >
        {BottomTabs.map((tab) => (
          <BottomTab.Screen
          key={`${tab.name}-tab`}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ focused }) => {
                return (
                  <BottomTabButton style={styles.iconBaseStyle}>
                    {focused ? tab.filledIcon : tab.outlinedIcon}
                  </BottomTabButton>
                );
              },
            }}
          />
        ))}
        <BottomTab.Screen
          name="Account"
          component={ProfileScreen}
          options={{
            tabBarLabel: "",
            headerShown: true,
            tabBarIcon: ({ focused }) => {
              return (
                <BottomTabButton
                  style={[
                    styles.avatarContainer,
                    {
                      borderColor: focused ? "white" : "transparent",
                      borderWidth: focused ? 1 : 0,
                    },
                  ]}
                >
                  <Avatar
                    src={getIPFSLink(
                      getRawurl(currentProfile?.metadata?.picture)
                    )}
                    height={28}
                    width={28}
                  />
                </BottomTabButton>
              );
            },
          }}
        />
      </BottomTab.Navigator>
      <UploadType uploadTypeSheetRef={uploadTypeRef} />
      <UploadSelect uploadRef={uploadRef} uploadTypeRef={uploadTypeRef} />
    </>
  );
}

const styles = StyleSheet.create({
  iconBaseStyle: {
    width: 45,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: "100%",
  },
  avatarContainer: {
    width: 30,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 30,
    borderRadius: 45,
  },
  headerIconContainer: {
    paddingHorizontal: 8,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarStyle: {
    backgroundColor: black[800],
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor: "transparent",
    minHeight: dimensions.window.height / 14,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});