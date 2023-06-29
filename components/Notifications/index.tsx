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
  notification: Notification;
};

const NotificationCard = ({ notification }: NotificationCardProps) => {
  const getNotification = () => {
    switch (notification.__typename) {
      case NotificationTypes.COLLECT_NOTIFICATION:
        return <CollectNotification notification={notification} />;
      case NotificationTypes.MIRROR_NOTIFICATION:
        return <MirrorNotification notification={notification} />;
      case NotificationTypes.FOLLOW_NOTIFICATION:
        return <FollowNotification notification={notification} />;
      case NotificationTypes.REACTION_NOTIFICATION:
        return <ReactionNotification notification={notification} />;
      case NotificationTypes.COMMENT_NOTIFICATION:
        return <CommentNotification notification={notification} />;
      case NotificationTypes.MENTION_NOTIFICATION:
        return <MentionNotification notification={notification} />;
    }
  };
  return <>{getNotification()}</>;
};
export default NotificationCard;
