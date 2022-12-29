import React from "react";
import NotificationCardProps, { NotificationTypes } from "./index.d";
import CollectNotification from "./CollectNotification";
import MirrorNotification from "./MirrorNotification";
import FollowNotification from "./FollowNotification";
import ReactionNotification from "./ReactionNotification";
import { dark_secondary } from "../../constants/Colors";
import { View } from "react-native";
import CommentNotification from "./CommentNotification";

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
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: dark_secondary,
        padding: 8,
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius: 8,
      }}
    >
      {getNotification()}
    </View>
  );
};
export default NotificationCard;
