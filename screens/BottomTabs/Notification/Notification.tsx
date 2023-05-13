import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import NotificationCard from "../../../components/Notifications";
import Skleton from "../../../components/Notifications/Skleton";
import { NotificationTypes } from "../../../components/Notifications/index.d";
import PleaseLogin from "../../../components/PleaseLogin";
import Heading from "../../../components/UI/Heading";
import Tabs, { Tab } from "../../../components/UI/Tabs";
import ErrorMessage from "../../../components/common/ErrorMesasge";
import Skeleton from "../../../components/common/Skeleton";
import { white } from "../../../constants/Colors";
import { NOTIFICATION } from "../../../constants/tracking";
import { useGuestStore } from "../../../store/GuestStore";
import { useAuthStore, useProfile, useThemeStore } from "../../../store/Store";
import {
  Notification,
  NotificationRequest,
  useNotificationsQuery,
} from "../../../types/generated";
import { RootTabScreenProps } from "../../../types/navigation/types";
import TrackAction from "../../../utils/Track";
import Logger from "../../../utils/logger";

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

TrackAction(NOTIFICATION.NOTIFICATIONS);

const Notifications = ({ navigation }: RootTabScreenProps<"Notifications">) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const theme = useThemeStore();
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();
  const { isGuest } = useGuestStore();

  const QueryRequest: NotificationRequest = {
    profileId: currentProfile?.id,
    limit: 7,
  };

  const { data, error, loading, refetch, fetchMore } = useNotificationsQuery({
    variables: {
      request: QueryRequest,
    },
    pollInterval: 100,
    fetchPolicy: "network-only",
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });

  const notifications = data?.notifications?.items as Notification[];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    try {
      refetch({
        request: QueryRequest,
      })
        .then(() => {
          setRefreshing(false);
        })
        .catch((err) => {});
    } catch (error) {
      // Logger.Log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const onEndCallBack = () => {
    if (!pageInfo?.next) {
      return;
    }
    fetchMore({
      variables: {
        request: {
          cursor: pageInfo?.next,
          ...QueryRequest,
        },
      },
    }).catch((err) => {});
  };

  const _RefreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[theme.PRIMARY]}
      progressBackgroundColor={"black"}
    />
  );

  const pageInfo = data?.notifications?.pageInfo;

  Logger.Log(pageInfo?.next);

  const keyExtractor = (item: Notification) => item?.notificationId.toString();

  const _MoreLoader = () => {
    return (
      <>
        {pageInfo?.next ? (
          <ActivityIndicator size={"large"} color={theme.PRIMARY} />
        ) : (
          <ErrorMessage message="No more Videos to load" withImage={false} />
        )}
      </>
    );
  };

  const MoreLoader = React.memo(_MoreLoader);

  const renderAllNotifications = ({ item }: { item: Notification }) => (
    <NotificationCard navigation={navigation} notification={item} />
  );

  if (isGuest) return <PleaseLogin />;
  if (error) {
    return (
      <ErrorMessage
        message={
          "Oh no,LensPlay encounterd some error while loading your notifications,😞😞"
        }
      />
    );
  }

  const FilterNotification = ({
    notificationType,
  }: {
    notificationType: string;
  }) => {
    if (notificationType === "All") {
      return (
        <FlatList
          data={notifications}
          keyExtractor={keyExtractor}
          ListEmptyComponent={
            <NoNewNotification message="Looks like you don't have any notifications,interact with profiles to get notifications" />
          }
          refreshControl={_RefreshControl}
          initialNumToRender={7}
          maxToRenderPerBatch={10}
          ListFooterComponent={<MoreLoader />}
          onEndReachedThreshold={0.5}
          onEndReached={onEndCallBack}
          renderItem={renderAllNotifications}
        />
      );
    } else {
      return (
        <FlatList
          data={notifications}
          keyExtractor={keyExtractor}
          ListEmptyComponent={() => {
            return (
              <NoNewNotification message="Looks like you don't have any notifications,interact with profiles to get notifications" />
            );
          }}
          refreshControl={_RefreshControl}
          initialNumToRender={7}
          maxToRenderPerBatch={10}
          ListFooterComponent={<MoreLoader />}
          onEndReachedThreshold={0.5}
          onEndReached={onEndCallBack}
          renderItem={({ item }) => {
            if (item.__typename === notificationType) {
              return (
                <NotificationCard navigation={navigation} notification={item} />
              );
            }
            return <></>;
          }}
        />
      );
    }
  };

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
                {loading ? (
                  <Skeleton children={<Skleton />} number={10} />
                ) : (
                  <FilterNotification notificationType={tab.type} />
                )}
              </View>
            )}
          />
        ))}
      </Tabs>
    </SafeAreaView>
  );
};

export default Notifications;

const NoNewNotification = ({
  message,
}: {
  message: string;
  showRefreshButton?: boolean;
  onRefresh?: () => void;
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Image
        style={{
          height: 250,
          width: 250,
        }}
        resizeMode="contain"
        source={require("../../../assets/images/notification.png")}
      />
      <View
        style={{
          marginTop: 16,
          alignItems: "center",
        }}
      >
        <Heading
          title={message}
          style={{
            fontSize: 16,
            color: white[200],
            fontWeight: "600",
            textAlign: "center",
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
