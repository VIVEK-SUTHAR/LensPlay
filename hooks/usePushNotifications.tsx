import notifee, {
	AndroidStyle,
	AuthorizationStatus,
	EventType,
} from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import {
	NOTIFICATIONS_TOPICS_APP,
	NOTIFICATIONS_TOPICS_PUBLICATION,
} from "constants/index";
import React from "react";
import { Platform } from "react-native";
import { useProfile } from "store/Store";
import Logger from "utils/logger";
const usePushNotifications = () => {
	const profileId = useProfile((profile) => profile?.currentProfile?.id);
	React.useEffect(() => {
		const appActiveStateNotiListener = notifee.onForegroundEvent(
			({ type, detail }) => {
				switch (type) {
					case EventType.DISMISSED:
						Logger.Warn("User Dismissed notification", detail.notification);
						break;
					case EventType.PRESS:
						Logger.Log("Pressed", detail.notification?.data);
						break;
				}
			}
		);

		notifee.requestPermission().then((res) => {
			console.log(res);
			if (res.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
				console.log("Allowed");
			} else {
				console.log("Not Allowed");
			}
		});

		const unsubscribe = messaging().onMessage(async (remoteMessage) => {});

		const profileIdTopicForInteractions = (topic: string) => {
			let result = profileId + "-" + topic;
			console.log(result);
			return result;
		};

		const subscribeToPublicationTopics = async () => {
			try {
				console.log(NOTIFICATIONS_TOPICS_PUBLICATION);
				NOTIFICATIONS_TOPICS_PUBLICATION.forEach((topic) => {
					messaging().subscribeToTopic(profileIdTopicForInteractions(topic));
				});
				NOTIFICATIONS_TOPICS_APP.forEach((commonTopic) => {
					messaging().subscribeToTopic(commonTopic);
				});
			} catch (error) {}
		};

		subscribeToPublicationTopics();
		return () => {
			unsubscribe();
			appActiveStateNotiListener();
		};
	}, []);
};

export default usePushNotifications;
