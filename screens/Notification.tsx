import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AnimatedLottieView from "lottie-react-native";
import fetchNotifications from "../api/fetchNotifications";
import useStore from "../store/Store";
import Heading from "../components/UI/Heading";
import NotificationCard from "../components/Notifications";
import Skleton from "../components/Notifications/Skleton";
const Navigation = ({ navigation }: { navigation: any }) => {
  const store = useStore();
  const [allNotifications, setAllNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await fetchNotifications(store.profileId, store.accessToken);
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
    fetchNotifications(store.profileId, store.accessToken).then((res) => {
      console.log(res);

      setAllNotifications(res);
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
      {allNotifications.length > 0 ? (
        <FlatList
          data={allNotifications}
          keyExtractor={(item) => item.notificationId.toString()}
          renderItem={({ item, index }) => {
            return (
              <NotificationCard
                notification={item}
                navigation={navigation}
                key={item}
              />
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
      {!isLoading && allNotifications.length === 0 ? (
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
