import { useNavigation } from "@react-navigation/native";
import Collect from "assets/Icons/Collect";
import Avatar from "components/UI/Avatar";
import StyledText from "components/UI/StyledText";
import { dark_primary } from "constants/Colors";
import { NewCollectNotification } from "customTypes/generated";
import React from "react";
import { Pressable, View } from "react-native";
import formatAddress from "utils/formatAddress";
import getDifference from "utils/getDifference";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";

type CollectNotificationProps = {
	notification: NewCollectNotification;
};

const CollectNotification: React.FC<CollectNotificationProps> = ({ notification }) => {
	const navigation = useNavigation();

	return (
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
			<View
				style={{
					height: 35,
					width: 35,
					marginHorizontal: 4,
					alignItems: "center",
				}}
			>
				<Collect color="#E57C23" height={24} width={24} />
			</View>
			<View style={{ flex: 1 }}>
				<Pressable
					onPress={() => {
						navigation.navigate("Channel", {
							handle: notification?.wallet?.defaultProfile?.handle,
							name: notification?.wallet?.defaultProfile?.name!,
						});
					}}
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "flex-start",
					}}
				>
					<Avatar
						src={getIPFSLink(getRawurl(notification?.wallet?.defaultProfile?.picture))}
						height={35}
						width={35}
					/>
					<StyledText
						title={getDifference(notification?.createdAt)}
						style={{ fontSize: 12, color: "gray" }}
					/>
				</Pressable>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<StyledText
						title={
							notification?.wallet?.defaultProfile?.handle?.split(".")[0] ||
							formatAddress(notification?.wallet?.address)
						}
						style={{ color: "white", fontWeight: "500" }}
					/>
					<StyledText title={" collected your post"} style={{ color: "gray" }} />
				</View>
				<StyledText
					title={
						notification?.collectedPublication?.metadata?.content ||
						notification?.collectedPublication?.metadata?.description
					}
					numberOfLines={2}
					style={{ fontSize: 10, color: "gray" }}
				/>
			</View>
		</Pressable>
	);
};

export default CollectNotification;
