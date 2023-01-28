import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AnimatedLottieView from "lottie-react-native";
import Heading from "../components/UI/Heading";
import NotificationCard from "../components/Notifications";
import Skleton from "../components/Notifications/Skleton";
import Item from "../components/Notifications/index.d";
import { useAuthStore, useProfile, useThemeStore } from "../store/Store";
import notificationsQuery from "../apollo/Queries/notificationsQuery";
import { client } from "../apollo/client";
const Navigation = ({ navigation }: { navigation: any }) => {
  const [allNotifications, setAllNotifications] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const authStore = useAuthStore();
  const theme = useThemeStore();
  const userStore = useProfile();

  useEffect(() => {
    getAllNotifications();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      let newdata = await getAllNotifications();
      if (newdata?.data?.result?.items === allNotifications) {
        ToastAndroid.show("No new notifications", ToastAndroid.SHORT);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setRefreshing(false);
    }
  };

  async function getAllNotifications() {
    setIsLoading(true);
    try {
      const notificationdata = await client.query({
        query: notificationsQuery,
        variables: {
          pid: userStore?.currentProfile?.id,
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${authStore.accessToken}`,
          },
        },
      });
      setAllNotifications(notificationdata?.data?.result?.items);
      return notificationdata;
    } catch (error) {
      if (error instanceof Error) {
        return;
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      {allNotifications?.length ? (
        <FlatList
          data={allNotifications}
          keyExtractor={(_, index) => index.toString()}
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
