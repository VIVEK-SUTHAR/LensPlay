import notifee, { AndroidStyle, EventDetail, EventType } from "@notifee/react-native";
import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { Platform } from "react-native";
import Logger from "utils/logger";

export default function handleNotifications(navRef) {
    notifee.onForegroundEvent(({ type, detail }: {
        type: EventType, detail: EventDetail
    }) => {
        switch (type) {
            case EventType.DISMISSED:
                Logger.Warn("User Dismissed notification", detail.notification);
                break;
            case EventType.PRESS:
                const publicationId = detail?.notification?.data.pubId;
                if (publicationId) {
                    navRef.current.navigate("LinkingVideo", { id: publicationId })
                }
                break;
        }
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
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
                    pubId: remoteMessage?.data?.pubId,
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

    return unsubscribe;
}
