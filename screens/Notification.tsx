import AnimatedLottieView from "lottie-react-native";
import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View
} from "react-native";
import NotificationCard from "../components/Notifications";
import { NotificationTypes } from "../components/Notifications/index.d";
import Skleton from "../components/Notifications/Skleton";
import PleaseLogin from "../components/PleaseLogin";
import Heading from "../components/UI/Heading";
import Tabs, { Tab } from "../components/UI/Tabs";
import useNotifications from "../hooks/useFeed";
import { useGuestStore } from "../store/GuestStore";
import { useProfile, useThemeStore } from "../store/Store";
import { RootTabScreenProps } from "../types/navigation/types";

const Notifications = ({ navigation }: RootTabScreenProps<"Notifications">) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const theme = useThemeStore();
  const userStore = useProfile();
  const { isGuest } = useGuestStore();

  const { data, error, loading, refetch } = useNotifications();

  if (error) console.log(error);
  if (isGuest) return <PleaseLogin />;
  if (loading) return <Loader />;
  if (!data) return <NotFound />;

  const NotificationTabs = [
    {
      name: "All",
      type: "All",
    },
    {
      name: "Collect",
      type: NotificationTypes.COLLECT_NOTIFICATION,
    },
    {
      name: "Comment",
      type: NotificationTypes.COMMENT_NOTIFICATION,
    },
    {
      name: "Follow",
      type: NotificationTypes.FOLLOW_NOTIFICATION,
    },
    {
      name: "Mention",
      type: NotificationTypes.MENTION_NOTIFICATION,
    },
  ];

  const FilterNotification = ({
    notificationType,
  }: {
    notificationType: string;
  }) => {
    if (notificationType === "All") {
      return (
        <FlatList
          data={data.result.items}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                refetch({
                  pid: userStore.currentProfile?.id,
                }).then(() => setRefreshing(false));
              }}
              colors={[theme.PRIMARY]}
              progressBackgroundColor={"black"}
            />
          }
          renderItem={({ item }) => (
            <NotificationCard navigation={navigation} notification={item} />
          )}
        />
      );
    } else {
      return (
        <FlatList
          data={data.result.items}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                refetch({
                  pid: userStore.currentProfile?.id,
                }).then(() => setRefreshing(false));
              }}
              colors={[theme.PRIMARY]}
              progressBackgroundColor={"black"}
            />
          }
          renderItem={({ item }) => {
            if (item.__typename === notificationType) {
              return (
                <NotificationCard navigation={navigation} notification={item} />
              );
            }
          }}
          estimatedItemSize={10}
        />
      );
    }
  };

  if (data) {
    return (
      <SafeAreaView style={styles.container}>
        <Tabs>
          {NotificationTabs.map((tab, index) => (
            <Tab.Screen
              name={tab.name}
              key={index}
              children={() => (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "black",
                  }}
                >
                  <FilterNotification notificationType={tab.type} />
                </View>
              )}
            />
          ))}
        </Tabs>
      </SafeAreaView>
    );
  }
};

export default Notifications;

const Loader = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Skleton />
      <Skleton />
      <Skleton />
      <Skleton />
      <Skleton />
      <Skleton />
      <Skleton />
      <Skleton />
      <Skleton />
    </SafeAreaView>
  );
};

const NotFound = () => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <AnimatedLottieView
        autoPlay
        style={{
          height: "auto",
        }}
        source={require("../assets/notfound.json")}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
