import React from "react";
import { Pressable } from "react-native";
import { dark_primary } from "../../constants/Colors";
import { Notification } from "../../types/generated";
import CollectNotification from "./CollectNotification";
import CommentNotification from "./CommentNotification";
import FollowNotification from "./FollowNotification";
import { NotificationTypes } from "./index.d";
import MentionNotification from "./MentionNotification";
import MirrorNotification from "./MirrorNotification";
import ReactionNotification from "./ReactionNotification";

export type NotificationCardProps = {
  navigation: any;
  notification: Notification;
};

const NotificationCard = ({
  navigation,
  notification,
}: NotificationCardProps) => {
  const getNotification = () => {
    switch (notification.__typename) {
      case NotificationTypes.COLLECT_NOTIFICATION:
        return (
          <CollectNotification
            navigation={navigation}
            notification={notification}
          />
        );
      case NotificationTypes.MIRROR_NOTIFICATION:
        return (
          <MirrorNotification
            navigation={navigation}
            notification={notification}
          />
        );
      case NotificationTypes.FOLLOW_NOTIFICATION:
        return (
          <FollowNotification
            navigation={navigation}
            notification={notification}
          />
        );
      case NotificationTypes.REACTION_NOTIFICATION:
        return (
          <ReactionNotification
            navigation={navigation}
            notification={notification}
          />
        );
      case NotificationTypes.COMMENT_NOTIFICATION:
        return (
          <CommentNotification
            navigation={navigation}
            notification={notification}
          />
        );
      case NotificationTypes.MENTION_NOTIFICATION:
        return (
          <MentionNotification
            key={React.useId()}
            navigation={navigation}
            notification={notification}
          />
        );
    }
  };
  return (
    <>
      <Pressable
        android_ripple={{
          borderless: false,
          color: "rgba(255,255,255,0.1)",
        }}
        style={{
          flexDirection: "row",
          padding: 12,
          borderBottomWidth: 1,
          borderBottomColor: dark_primary,
        }}
      >
        {getNotification()}
      </Pressable>
    </>
  );
};
export default NotificationCard;
