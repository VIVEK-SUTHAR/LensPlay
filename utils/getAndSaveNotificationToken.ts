import { LENSPLAY_API } from "./../constants/index";
import Logger from "utils/logger";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "constants/Storage";
import updateTokenInCache from "./updateTokenInCache";

async function getFCMTokenFromFirebase() {
	try {
		await messaging().requestPermission();
		await messaging().registerDeviceForRemoteMessages();
		const notificationToken = await messaging().getToken();
		return notificationToken;
	} catch (error) {
		throw new Error("Failed to get token");
	}
}

async function saveTokenInDB(id: string, token: string) {
	try {
		const userAddress = await AsyncStorage.getItem(StorageKeys.UserAddress);
		if (!userAddress) return;
		const rawBody = {
			profileId: id,
			address: userAddress,
			FCMToken: token,
		};
		const apiResponse = await fetch(`${LENSPLAY_API}notifications/saveToken`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(rawBody),
		});
		if (apiResponse.ok) {
			Logger.Success("Tokens Saved to DB ");
		}
	} catch (error) {
		Logger.Error("Failed to Save Token in DB....");
	}
}

async function updateTokenInDB(id: string, token: string) {
	try {
		const userAddress = await AsyncStorage.getItem(StorageKeys.UserAddress);
		if (!userAddress) return;
		const rawBody = {
			profileId: id,
			address: userAddress,
			newToken: token,
		};
		const apiResponse = await fetch(`${LENSPLAY_API}notifications/updateToken`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(rawBody),
		});
		if (apiResponse.ok) {
			Logger.Success("Tokens Updated in DB !");
		}
	} catch (error) {
		Logger.Error("Failed to Save Token in DB....");
	}
}

async function getAndSaveNotificationToken(profileId: string) {
	try {
		const LocalFCMToken = await AsyncStorage.getItem(StorageKeys.NotificationToken);

		if (!LocalFCMToken) {
			const newToken = await getFCMTokenFromFirebase();
			const notificationData = {
				generatedTime: new Date().getTime(),
				token: newToken,
			};
			if (newToken) {
				await AsyncStorage.setItem(StorageKeys.NotificationToken, JSON.stringify(notificationData));
				await updateTokenInCache(profileId, newToken);
				await saveTokenInDB(profileId, newToken);
			} else {
				Logger.Error("[Error]: In Genarating notification token");
			}
		}

		if (LocalFCMToken) {
			const parsedFCMtoken = JSON.parse(LocalFCMToken);

			const updateInterval = 28 * 24 * 60 * 60 * 1000;

			const currentTime = new Date().getTime();

			if (currentTime - parsedFCMtoken.generatedTime > updateInterval) {
				Logger.Success("Token is invalid, 28 days lapsed,geting new tokens");
				const newToken = await getFCMTokenFromFirebase();
				const notificationData = {
					generatedTime: new Date().getTime(),
					token: newToken,
				};
				if (newToken) {
					await AsyncStorage.setItem(
						StorageKeys.NotificationToken,
						JSON.stringify(notificationData)
					);
					await updateTokenInCache(profileId, newToken);
					await updateTokenInDB(profileId, newToken);
				} else {
					Logger.Error("[Error]: In Genarating notification token");
				}
			} else {
				Logger.Warn("Notification token difference is <28 days ");
			}
		}
	} catch (error) {}
}

export default getAndSaveNotificationToken;
