import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import React, { useRef } from "react";
import {
  AppState,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Sheet from "../components/Bottom";
import Icon from "../components/Icon";
import Avatar from "../components/UI/Avatar";
import Heading from "../components/UI/Heading";
import StyledText from "../components/UI/StyledText";
import Trending from "../screens/BottomTabs/Explore/Trending";
import Feed from "../screens/BottomTabs/Home/Feed";
import Notifications from "../screens/BottomTabs/Notification/Notification";
import ProfileScreen from "../screens/BottomTabs/Profile/Profile";
import Bytes from "../screens/BottomTabs/Shots/Bytes";
import {
  useAuthStore,
  useProfile,
  useThemeStore,
  useToast,
} from "../store/Store";
import {
  RootStackScreenProps,
  RootTabParamList,
} from "../types/navigation/types";
import getIPFSLink from "../utils/getIPFSLink";
import getAccessFromRefresh from "../utils/lens/getAccessFromRefresh";
import storeTokens from "../utils/storeTokens";
import { Camera } from "react-native-vision-camera";
import getFileSize from "../utils/video/getFileSize";
import canUploadedToIpfs from "../utils/canUploadToIPFS";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator({
  navigation,
}: RootStackScreenProps<"Root">) {
  const theme = useThemeStore();
  const user = useProfile();
  const { setAccessToken, setRefreshToken } = useAuthStore();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  let PROFILE_PIC_URI = "";
  if (user?.currentProfile?.picture?.__typename === "MediaSet") {
    PROFILE_PIC_URI = user?.currentProfile?.picture?.original?.url;
  }
  if (user?.currentProfile?.picture?.__typename === "NftImage") {
    PROFILE_PIC_URI = user?.currentProfile?.picture?.uri;
  }

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

  const uploadRef = useRef<BottomSheetMethods>(null);
  const uploadTypeRef = useRef<BottomSheetMethods>(null);

  const toast = useToast();

  return (
    <>
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "black", elevation: 2 },
          headerTitle: "",
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableWithoutFeedback
                onPress={() => uploadRef.current?.snapToIndex(0)}
              >
                <View
                  style={{
                    paddingHorizontal: 8,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon name="upload" size={24} />
                </View>
              </TouchableWithoutFeedback>
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
            marginBottom: -6,
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
                    color={"white"}
                    size={25}
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
                    color={"white"}
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
                    color={"white"}
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
            tabBarAccessibilityLabel: "Notifications",
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
                    color={"white"}
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
                    borderColor: focused ? "white" : "transparent",
                    borderWidth: focused ? 1 : 0,
                  }}
                >
                  <Avatar
                    src={getIPFSLink(PROFILE_PIC_URI)}
                    height={28}
                    width={28}
                  />
                </View>
              );
            },
          }}
        />
      </BottomTab.Navigator>
      <Sheet
        ref={uploadRef}
        index={-1}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: "#1d1d1d",
        }}
        snapPoints={["25%"]}
        children={
          <View
            style={{
              maxWidth: "100%",
              height: "100%",
            }}
          >
            <Pressable
              android_ripple={{
                color: "rgba(0,0,0,0.2)",
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              onPress={() => {
                uploadRef.current?.close();
                uploadTypeRef.current?.snapToIndex(0);
              }}
            >
              <View
                style={{
                  padding: 16,
                  backgroundColor: "black",
                  borderRadius: 50,
                }}
              >
                <Icon name="create" size={24} />
              </View>
              <StyledText
                title={"Create a video"}
                style={{
                  color: "white",
                  fontSize: 20,
                  marginHorizontal: 16,
                }}
              />
            </Pressable>
            <Pressable
              android_ripple={{
                color: "rgba(0,0,0,0.2)",
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              onPress={async () => {
                const cameraPermission = await Camera.requestCameraPermission();
                const microphonePermission = await Camera.requestMicrophonePermission();
                if (
                  cameraPermission === "authorized" &&
                  microphonePermission === "authorized"
                ) {
                  navigation.push("UploadShots");
                } else {
                  uploadRef.current?.close();
                }
              }}
            >
              <View
                style={{
                  padding: 16,
                  backgroundColor: "black",
                  borderRadius: 50,
                }}
              >
                <Icon name="shots_outline" size={24} />
              </View>
              <StyledText
                title={"Create a shots"}
                style={{
                  color: "white",
                  fontSize: 20,
                  marginHorizontal: 16,
                }}
              />
            </Pressable>
          </View>
        }
      />
      <Sheet
        ref={uploadTypeRef}
        index={-1}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: "#1d1d1d",
        }}
        snapPoints={["25%"]}
        children={
          <View
            style={{
              maxWidth: "100%",
              height: "100%",
            }}
          >
            <Pressable
              android_ripple={{
                color: "rgba(0,0,0,0.2)",
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              onPress={async () => {
                if (!status?.granted) {
                  requestPermission();
                }
                if (status?.granted) {
                  let camera = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                  });
                  if (camera.canceled) {
                    // ToastAndroid.show("No Video recorded", ToastAndroid.SHORT);
                    uploadTypeRef.current?.close();
                  }
                  if (!camera.canceled) {
                    // setImage(camera.uri);
                    navigation.push("UploadVideo", {
                      localUrl: camera.assets[0].uri,
                      duration: camera.assets[0].duration,
                    });
                  }
                }
              }}
            >
              <View
                style={{
                  padding: 16,
                  backgroundColor: "black",
                  borderRadius: 50,
                }}
              >
                <Icon name="record" size={24} />
              </View>
              <StyledText
                title={"Record a video"}
                style={{
                  color: "white",
                  fontSize: 20,
                  marginHorizontal: 16,
                }}
              />
            </Pressable>
            <Pressable
              android_ripple={{
                color: "rgba(0,0,0,0.2)",
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              onPress={async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                  allowsEditing: true,
                  quality: 1,
                  base64: true,
                });
                if (result.canceled) {
                  uploadTypeRef.current?.close();
                }
                if (!result.canceled) {
                  const size = await getFileSize(result.assets[0].uri);
                  if (!canUploadedToIpfs(size)) {
                    toast.error("Select video less than 100MB");
                    return;
                  }
                  navigation.push("UploadVideo", {
                    localUrl: result.assets[0].uri,
                    duration: result.assets[0].duration,
                  });
                }
              }}
            >
              <View
                style={{
                  padding: 16,
                  backgroundColor: "black",
                  borderRadius: 50,
                }}
              >
                <Icon name="upload-file" size={24} />
              </View>
              <StyledText
                title={"Select from gallery"}
                style={{
                  color: "white",
                  fontSize: 20,
                  marginHorizontal: 16,
                }}
              />
            </Pressable>
          </View>
        }
      />
    </>
  );
}
