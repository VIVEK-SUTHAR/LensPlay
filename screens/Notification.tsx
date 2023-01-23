import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AnimatedLottieView from "lottie-react-native";
import fetchNotifications from "../api/fetchNotifications";
import { useAuthStore, useProfile, useThemeStore } from "../store/Store";
import Heading from "../components/UI/Heading";
import NotificationCard from "../components/Notifications";
import Skleton from "../components/Notifications/Skleton";
import Item from "../components/Notifications/index.d";
const Navigation = ({ navigation }: { navigation: any }) => {
  const [allNotifications, setAllNotifications] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);

  const authStore = useAuthStore();
  const theme = useThemeStore();
  const userStore = useProfile();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await fetchNotifications(
        userStore.currentProfile?.id,
        authStore.accessToken
      );
      if (data == allNotifications) {
        ToastAndroid.show("No new notifications", ToastAndroid.SHORT);
      } else {
        setAllNotifications(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetchNotifications(userStore.currentProfile?.id, authStore.accessToken)
      .then((allNotification) => {
        setAllNotifications(allNotification);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error instanceof Error) {
          throw new Error(
            "Some thing Went wrong while fetching notifications",
            { cause: error.cause }
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      {allNotifications && allNotifications?.length > 0 ? (
        <FlatList
          data={allNotifications}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.PRIMARY]}
              progressBackgroundColor={"black"}
            />
          }
          renderItem={({ item }) => {
            return (
              <NotificationCard navigation={navigation} notification={item} />
            );
          }}
        />
      ) : (
        <></>
      )}
      {isLoading ? (
        <>
          <Skleton />
          <Skleton />
          <Skleton />
          <Skleton />
          <Skleton />
          <Skleton />
          <Skleton />
          <Skleton />
          <Skleton />
        </>
      ) : (
        <></>
      )}
      {!isLoading && allNotifications?.length === 0 ? (
        <View
          style={{
            height: 500,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AnimatedLottieView
            autoPlay
            style={{
              height: "auto",
            }}
            source={require("../assets/notifications.json")}
          />
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Heading
              title="No new notifications"
              style={{
                fontSize: 16,
                color: "white",
                marginVertical: 5,
                marginHorizontal: 15,
                fontWeight: "600",
                alignSelf: "flex-start",
              }}
            />
          </View>
        </View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default Navigation;
