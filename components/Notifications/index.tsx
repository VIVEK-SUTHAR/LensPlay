import React from "react";
import { Notification } from "../../types/generated";
import CommentNotification from "./CommentNotification";
import FollowNotification from "./FollowNotification";
import MentionNotification from "./MentionNotification";
import MirrorNotification from "./MirrorNotification";
import ReactionNotification from "./ReactionNotification";
import QuoteNotification from "./Tabs/QuoteNotification";
import CollectNotification from "./CollectNotification";

export type NotificationCardProps = {
	notification: Notification;
};

const NotificationCard = ({ notification }: NotificationCardProps) => {
	const getNotification = () => {
		switch (notification.__typename) {
			case "ReactionNotification":
				return <ReactionNotification notification={notification} />;
			case "MirrorNotification":
				return <MirrorNotification notification={notification} />;
			case "FollowNotification":
				return <FollowNotification notification={notification} />;
			case "CommentNotification":
				return <CommentNotification notification={notification} />;
			case "MentionNotification":
				return <MentionNotification notification={notification} />;
			case "QuoteNotification":
				return <QuoteNotification notification={notification} />;
        case "ActedNotification":
          return <CollectNotification notification={notification}/>
		}
	};
	return <>{getNotification()}</>;
};
export default NotificationCard;
