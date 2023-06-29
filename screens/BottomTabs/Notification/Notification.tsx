import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import AllNotifications from "components/Notifications/Tabs/AllNotifications";
import CollectNotifications from "components/Notifications/Tabs/CollectNotifications";
import CommentNotifications from "components/Notifications/Tabs/CommentNotifications";
import FollowNotifications from "components/Notifications/Tabs/FollowNotifications";
import MentionNotifications from "components/Notifications/Tabs/MentionNotifications";
import Tabs, { Tab } from "components/UI/Tabs";
import { RootTabScreenProps } from "customTypes/navigation";
import TrackAction from "utils/Track";
import { NOTIFICATION } from "constants/tracking";

type NotificationTabsType = {
  name: string;
  component: React.ReactNode;
};

const NotificationTabs: NotificationTabsType[] = [
  {
    name: "All",
    component: <AllNotifications />,
  },
  {
    name: "Collect",
    component: <CollectNotifications />,
  },
  {
    name: "Comment",
    component: <CommentNotifications />,
  },
  {
    name: "Follow",
    component: <FollowNotifications />,
  },
  {
    name: "Mention",
    component: <MentionNotifications />,
  },
];

const Notifications = ({ navigation }: RootTabScreenProps<"Notifications">) => {
  TrackAction(NOTIFICATION.NOTIFICATIONS);
  return (
    <SafeAreaView style={styles.container}>
      <Tabs>
        {NotificationTabs.map((tab, index) => (
          <Tab.Screen
            name={tab.name}
            key={index}
            listeners={{
              focus: () => {},
            }}
            children={() => <>{tab.component}</>}
          />
        ))}
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
