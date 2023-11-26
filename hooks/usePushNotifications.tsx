import notifee, { AndroidStyle, EventType } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import React from "react";
import { Platform } from "react-native";
import Logger from "utils/logger";
const usePushNotifications = () => {
	React.useEffect(() => {
		const appActiveStateNotiListener = notifee.onForegroundEvent(({ type, detail }) => {
			switch (type) {
				case EventType.DISMISSED:
					Logger.Warn("User Dismissed notification", detail.notification);
					break;
				case EventType.PRESS:
					Logger.Log("Pressed", detail.notification?.data);
					break;
			}
		});

		const unsubscribe = messaging().onMessage(async (remoteMessage) => {
			Logger.Count("New Noti received from LP Server", remoteMessage);
			let channelId;
			let imageUrl;
			if (Platform.OS === "android") {
				channelId = await notifee.createChannel({
					id: "default",
					name: "Default Channel",
				});
			}
			const notification = remoteMessage?.notification;
			//@ts-expect-error
			imageUrl = remoteMessage.data?.fcm_options?.image;
			if (Platform.OS === "android") {
				imageUrl = remoteMessage?.notification?.android?.imageUrl;
			}
			if (imageUrl) {
				notifee.displayNotification({
					title: notification?.title,
					body: notification?.body,
					ios: {
						attachments: [
							{
								url: imageUrl,
							},
						],
					},
					android: {
						channelId,
						style: {
							type: AndroidStyle.BIGPICTURE,
							picture: imageUrl,
						},
					},
					data: {
						pubId: remoteMessage?.data?.pubId!,
					},
				});
			} else {
				notifee.displayNotification({
					title: notification?.title,
					body: notification?.body,
					android: {
						channelId,
					},
				});
			}
		});

		return () => {
			unsubscribe();
			appActiveStateNotiListener();
		};
	}, []);
};

export default usePushNotifications;
