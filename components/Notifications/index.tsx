import { Pressable, View } from "react-native";
import React from "react";
import NotificationCardProps, { NotificationTypes } from "./index.d";
import CollectNotification from "./CollectNotification";
import MirrorNotification from "./MirrorNotification";
import FollowNotification from "./FollowNotification";
import ReactionNotification from "./ReactionNotification";
import CommentNotification from "./CommentNotification";
import MentionNotification from "./MentionNotification";
import { dark_primary } from "../../constants/Colors";

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
          color:"rgba(255,255,255,0.1)"
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
