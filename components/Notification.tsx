import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { dark_primary } from "../constants/Colors";
import AnimatedLottieView from "lottie-react-native";
import fetchNotifications from "../api/fetchNotifications";
import useStore from "../store/Store";
import NotificationCard from "./NotificationCard";

const Navigation = ({ navigation }) => {
  const store = useStore();
  const [allNotifications, setAllNotifications] = useState([]);
  useEffect(() => {
    //@ts-expect-error
    fetchNotifications(store.profileId, store.accessToken).then((res) => {
      setAllNotifications(res);
    });
  }, []);

  console.log(allNotifications);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: dark_primary,
      }}
    >
      <ScrollView>
        {allNotifications &&
          allNotifications.map((item, index) => {
            return (
              <NotificationCard
                key={index}
                type={item.__typename}
                notification={item}
              />
            );
          })}
        {allNotifications === undefined && (
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
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  marginVertical: 5,
                  marginHorizontal: 15,
                  fontWeight: "600",
                  alignSelf: "flex-start",
                }}
              >
                No new notifications
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Navigation;
