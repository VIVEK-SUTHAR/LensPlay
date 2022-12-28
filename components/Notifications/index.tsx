import React from "react";
import NotificationCardProps, { NotificationTypes } from "./index.d";
import CollectNotification from "./CollectNotification";
const NotificationCard = ({
  navigation,
  notification,
}: NotificationCardProps) => {
  const getNotification = () => {
    switch (notification.__typename) {
      case NotificationTypes.NewCollectNotification:
        return (
          <CollectNotification
            navigation={navigation}
            notification={notification}
          />
        );
    }
  };

  return <>{getNotification()}</>;
};

export default NotificationCard;
