import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { dark_primary, dark_secondary, primary } from "../constants/Colors";
import AnimatedLottieView from "lottie-react-native";
import fetchNotifications from "../api/fetchNotifications";
import useStore from "../store/Store";
import Heading from "../components/UI/Heading";
import NotificationCard from "../components/Notifications";

const Navigation = ({ navigation }: { navigation: any }) => {
  const store = useStore();
  const [allNotifications, setAllNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await fetchNotifications(store.profileId, store.accessToken);
      console.log(data);

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
    //@ts-expect-error
    fetchNotifications(store.profileId, store.accessToken).then((res) => {
      setAllNotifications(res);
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={[primary]}
            progressBackgroundColor={dark_secondary}
            onRefresh={onRefresh}
          />
        }
      >
        {allNotifications &&
          allNotifications.map((item, index) => {
            return (
              <NotificationCard
                key={index}
                notification={item}
                navigation={navigation}
              />
            );
          })}
        {allNotifications?.length === 0 && (
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
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Navigation;
