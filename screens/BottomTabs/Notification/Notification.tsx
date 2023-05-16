import React, { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import NotificationCard from "../../../components/Notifications";
import Tabs, { Tab } from "../../../components/UI/Tabs";
import ErrorMessage from "../../../components/common/ErrorMesasge";
import { NOTIFICATION } from "../../../constants/tracking";
import { useAuthStore, useProfile, useThemeStore } from "../../../store/Store";
import {
  NewCollectNotification,
  NewCommentNotification,
  NewFollowerNotification,
  NewMentionNotification,
  Notification,
  NotificationTypes,
  useNotificationsQuery,
} from "../../../types/generated";
import { RootTabScreenProps } from "../../../types/navigation/types";
import TrackAction from "../../../utils/Track";
import CollectNotification from "../../../components/Notifications/CollectNotification";
import CommentNotification from "../../../components/Notifications/CommentNotification";
import FollowNotification from "../../../components/Notifications/FollowNotification";
import MentionNotification from "../../../components/Notifications/MentionNotification";

const initialFilters = {
  all: false,
  collects: false,
  comments: false,
  follow: false,
  mentions: false,
};

const Notifications = ({ navigation }: RootTabScreenProps<"Notifications">) => {
  const [activeFilter, setActiveFilter] = useState(initialFilters);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();
  const { PRIMARY } = useThemeStore();

  const getNotificationFilters = () => {
    if (activeFilter.mentions) {
      return [NotificationTypes.MentionPost, NotificationTypes.MentionComment];
    }
    if (activeFilter.follow) {
      return [NotificationTypes.Followed];
    }
    if (activeFilter.comments) {
      return [NotificationTypes.CommentedPost];
    }
    if (activeFilter.collects) {
      return [
        NotificationTypes.CollectedPost,
        NotificationTypes.CollectedComment,
      ];
    }
    return [
      NotificationTypes.CollectedPost,
      NotificationTypes.CommentedPost,
      NotificationTypes.Followed,
      NotificationTypes.MentionComment,
      NotificationTypes.MentionPost,
      NotificationTypes.ReactionComment,
      NotificationTypes.ReactionPost,
    ];
  };

  const QueryRequest = {
    limit: 30,
    profileId: currentProfile?.id,
    notificationTypes: getNotificationFilters(),
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
  const pageInfo = data?.notifications?.pageInfo;

  const keyExtractor = (item: { notificationId: any }, index: any) =>
    `${item?.notificationId}-${index}`;

  TrackAction(NOTIFICATION.NOTIFICATIONS);

  const ITEM_HEIGHT = 35;

  const getItemLayout = (_: any, index: number) => {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    };
  };

  const onEndCallBack = () => {
    console.log(pageInfo?.next);
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

  const _MoreLoader = () => {
    return (
      <View
        style={{
          height: 200,
        }}
      >
        {pageInfo?.next ? (
          <ActivityIndicator size={"large"} color={PRIMARY} />
        ) : (
          <ErrorMessage
            message="No more notifications to load"
            withImage={false}
          />
        )}
      </View>
    );
  };

  const MoreLoader = React.memo(_MoreLoader);

  const onRefresh = () => {
    setRefreshing(true);
    refetch({
      request: {
        profileId: currentProfile?.id,
      },
    }).then(() => setRefreshing(false));
  };

  const _RefreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[PRIMARY]}
      progressBackgroundColor={"black"}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Tabs>
        <Tab.Screen
          name={"All"}
          listeners={{
            focus: () => {
              setActiveFilter({ ...initialFilters });
            },
          }}
          children={() => {
            return (
              <View style={styles.container}>
                <FlatList
                  data={notifications}
                  keyExtractor={keyExtractor}
                  ListEmptyComponent={() => {
                    return (
                      <ErrorMessage message="Looks like you don't have any notifications,interact with profiles to get notifications" />
                    );
                  }}
                  getItemLayout={getItemLayout}
                  ListFooterComponent={<MoreLoader />}
                  onEndReached={onEndCallBack}
                  onEndReachedThreshold={0.5}
                  refreshControl={_RefreshControl}
                  renderItem={({ item }) => (
                    <NotificationCard notification={item} />
                  )}
                />
              </View>
            );
          }}
        />
        <Tab.Screen
          name={"Collect"}
          listeners={{
            focus: () => {
              setActiveFilter({ ...initialFilters, collects: true });
            },
          }}
          children={() => {
            return (
              <View style={styles.container}>
                <FlatList
                  data={notifications}
                  keyExtractor={keyExtractor}
                  ListEmptyComponent={() => {
                    return (
                      <ErrorMessage message="Looks like you don't have any notifications,interact with profiles to get notifications" />
                    );
                  }}
                  getItemLayout={getItemLayout}
                  ListFooterComponent={<MoreLoader />}
                  onEndReached={onEndCallBack}
                  onEndReachedThreshold={0.5}
                  refreshControl={_RefreshControl}
                  renderItem={({ item }) => (
                    <CollectNotification
                      notification={item as NewCollectNotification}
                    />
                  )}
                />
              </View>
            );
          }}
        />
        <Tab.Screen
          name={"Comment"}
          listeners={{
            focus: () => {
              setActiveFilter({ ...initialFilters, comments: true });
            },
          }}
          children={() => {
            return (
              <View style={styles.container}>
                <FlatList
                  data={notifications}
                  keyExtractor={keyExtractor}
                  ListEmptyComponent={() => {
                    return (
                      <ErrorMessage message="Looks like you don't have any notifications,interact with profiles to get notifications" />
                    );
                  }}
                  getItemLayout={getItemLayout}
                  ListFooterComponent={<MoreLoader />}
                  onEndReached={onEndCallBack}
                  onEndReachedThreshold={0.5}
                  refreshControl={_RefreshControl}
                  renderItem={({ item }) => (
                    <CommentNotification
                      notification={item as NewCommentNotification}
                    />
                  )}
                />
              </View>
            );
          }}
        />
        <Tab.Screen
          name={"Follow"}
          listeners={{
            focus: () => {
              setActiveFilter({ ...initialFilters, follow: true });
            },
          }}
          children={() => {
            return (
              <View style={styles.container}>
                <FlatList
                  data={notifications}
                  keyExtractor={keyExtractor}
                  ListEmptyComponent={() => {
                    return (
                      <ErrorMessage message="Looks like you don't have any notifications,interact with profiles to get notifications" />
                    );
                  }}
                  getItemLayout={getItemLayout}
                  ListFooterComponent={<MoreLoader />}
                  onEndReached={onEndCallBack}
                  onEndReachedThreshold={0.5}
                  refreshControl={_RefreshControl}
                  renderItem={({ item }) => (
                    <FollowNotification
                      notification={item as NewFollowerNotification}
                    />
                  )}
                />
              </View>
            );
          }}
        />
        <Tab.Screen
          name={"mention"}
          listeners={{
            focus: () => {
              setActiveFilter({ ...initialFilters, mentions: true });
            },
          }}
          children={() => {
            return (
              <View style={styles.container}>
                <FlatList
                  data={notifications}
                  keyExtractor={keyExtractor}
                  ListEmptyComponent={() => {
                    return (
                      <ErrorMessage message="Looks like you don't have any notifications,interact with profiles to get notifications" />
                    );
                  }}
                  getItemLayout={getItemLayout}
                  ListFooterComponent={<MoreLoader />}
                  onEndReached={onEndCallBack}
                  onEndReachedThreshold={0.5}
                  refreshControl={_RefreshControl}
                  renderItem={({ item }) => (
                    <MentionNotification
                      notification={item as NewMentionNotification}
                    />
                  )}
                />
              </View>
            );
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
