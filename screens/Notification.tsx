import AnimatedLottieView from "lottie-react-native";
import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import NotificationCard from "../components/Notifications";
import { NotificationTypes } from "../components/Notifications/index.d";
import Skleton from "../components/Notifications/Skleton";
import PleaseLogin from "../components/PleaseLogin";
import Heading from "../components/UI/Heading";
import Tabs, { Tab } from "../components/UI/Tabs";
import { NOTIFICATION } from "../constants/tracking";
import { useGuestStore } from "../store/GuestStore";
import { useAuthStore, useProfile, useThemeStore } from "../store/Store";
import { Notification, useNotificationsQuery } from "../types/generated";
import { RootTabScreenProps } from "../types/navigation/types";
import TrackAction from "../utils/Track";

const Notifications = ({ navigation }: RootTabScreenProps<"Notifications">) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const theme = useThemeStore();
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();
  const { isGuest } = useGuestStore();
  const { data, error, loading, refetch } = useNotificationsQuery({
    variables: {
      request: {
        profileId: currentProfile?.id,
        sources: ["LensPlay"],
      },
    },
    pollInterval: 100,
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });

  const notifications = data?.notifications?.items as Notification[];

  if (error)
    return (
      <NotFound
        message={
          "Oh no,LensPlay encounterd some error while loading your notifications,😞😞"
        }
      />
    );
  if (isGuest) return <PleaseLogin />;
  if (loading) return <Loader />;
  if (!data)
    return (
      <NotFound
        message={
          "Looks like you don't have any notifications,interact with profiles to get notifications"
        }
      />
    );

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
          data={notifications}
          keyExtractor={(item, index) => `${item?.notificationId}-${index}`}
          ListEmptyComponent={() => {
            return (
              <NotFound message="Looks like you don't have any notifications,interact with profiles to get notifications" />
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                refetch({
                  request: {
                    profileId: currentProfile?.id,
                  },
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
          data={notifications}
          keyExtractor={(item, index) => `${item?.notificationId}-${index}`}
          ListEmptyComponent={() => {
            return (
              <NotFound message="Looks like you don't have any notifications,interact with profiles to get notifications" />
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                refetch({
                  request: {
                    profileId: currentProfile?.id,
                  },
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
            return <View />;
          }}
        />
      );
    }
  };

  if (data) {
    TrackAction(NOTIFICATION.NOTIFICATIONS);
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
  return <SafeAreaView style={styles.container}></SafeAreaView>;
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

const NotFound = ({
  message,
}: {
  message: string;
  showRefreshButton?: boolean;
  onRefresh?: () => void;
}) => {
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
          title={message}
          style={{
            fontSize: 16,
            color: "white",
            marginVertical: 5,
            marginHorizontal: 15,
            fontWeight: "700",
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
