import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import AnimatedLottieView from "lottie-react-native";
import Heading from "../components/UI/Heading";
import NotificationCard from "../components/Notifications";
import Skleton from "../components/Notifications/Skleton";
import { useProfile, useThemeStore } from "../store/Store";
import { RootTabScreenProps } from "../types/navigation/types";
import useNotifications from "../hooks/useFeed";
import Tabs, { Tab } from "../components/UI/Tabs";
import { NotificationTypes } from "../components/Notifications/index.d";
import PleaseLogin from "../components/PleaseLogin";
import { useGuestStore } from "../store/GuestStore";

const Notifications = ({ navigation }: RootTabScreenProps<"Notifications">) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const theme = useThemeStore();
  const userStore = useProfile();
  const { isGuest } = useGuestStore();

  const { data, error, loading, refetch } = useNotifications();

  if (error) console.log(error);
  if (loading && !isGuest) return <Loader />;
  if (!data && !isGuest) return <NotFound />;

  return (
    <SafeAreaView style={styles.container}>
      {isGuest ? (
        <PleaseLogin />
      ) : (
        <Tabs>
          <Tab.Screen
            name="All"
            children={() => (
              <FlatList
                style={{
                  backgroundColor: "black",
                }}
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
                  <NotificationCard
                    navigation={navigation}
                    notification={item}
                  />
                )}
              />
            )}
          />
          <Tab.Screen
            name="Collect"
            children={() => (
              <FlatList
                style={{
                  backgroundColor: "black",
                }}
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
                  if (
                    item.__typename === NotificationTypes.COLLECT_NOTIFICATION
                  ) {
                    return (
                      <NotificationCard
                        navigation={navigation}
                        notification={item}
                      />
                    );
                  }
                }}
              />
            )}
          />
          <Tab.Screen
            name="Comment"
            children={() => (
              <FlatList
                style={{
                  backgroundColor: "black",
                }}
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
                  if (
                    item.__typename === NotificationTypes.COMMENT_NOTIFICATION
                  ) {
                    return (
                      <NotificationCard
                        navigation={navigation}
                        notification={item}
                      />
                    );
                  }
                }}
              />
            )}
          />
          <Tab.Screen
            name="Follow"
            children={() => (
              <FlatList
                style={{
                  backgroundColor: "black",
                }}
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
                  if (
                    item.__typename === NotificationTypes.FOLLOW_NOTIFICATION
                  ) {
                    return (
                      <NotificationCard
                        navigation={navigation}
                        notification={item}
                      />
                    );
                  }
                }}
              />
            )}
          />
          <Tab.Screen
            name="Mention"
            children={() => (
              <FlatList
                style={{
                  backgroundColor: "black",
                }}
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
                  if (
                    item.__typename === NotificationTypes.MENTION_NOTIFICATION
                  ) {
                    return (
                      <NotificationCard
                        navigation={navigation}
                        notification={item}
                      />
                    );
                  }
                }}
              />
            )}
          />
        </Tabs>
      )}
    </SafeAreaView>
  );
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
