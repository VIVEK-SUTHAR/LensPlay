import { Pressable, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import getDifference from "../../utils/getDifference";
import formatAddress from "../../utils/formatAddress";
import NotificationCardProps from "./index.d";
import Avatar from "../UI/Avatar";
import getIPFSLink from "../../utils/getIPFSLink";

const FollowNotification: React.FC<NotificationCardProps> = ({ navigation, notification }) => {
	console.log(notification.isFollowedByMe);
	
	return (
		<>
			<View
				style={{
					height: 35,
					width: 35,
					marginHorizontal: 4,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<AntDesign name="adduser" size={24} color={"#9a76e0"} />
			</View>
			<View style={{ flex: 1 }}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<View>
						<Pressable
							onPress={() => {
								navigation.navigate("Channel", {
									profileId: notification?.wallet?.defaultProfile?.id,
									isFollowdByMe:notification.isFollowedByMe,
									name: notification?.profile?.name,
									ethAddress: notification?.wallet?.address,
									handle: notification?.profile?.handle,
								});
							}}
						>
							<Avatar
								src={getIPFSLink(notification?.wallet?.defaultProfile?.picture?.original?.url)}
								height={35}
								width={35}
							/>
						</Pressable>
						<Text style={{ color: "gray", fontSize: 14 }}>
							<Text style={{ color: "white", fontWeight: "500" }}>
								{notification?.wallet?.defaultProfile?.handle?.split(".")[0] ||
									formatAddress(notification?.wallet?.address)}{" "}
							</Text>
							followed you
							<Text style={{ fontSize: 10, color: "gray" }}>
								{" "}
								{getDifference(notification?.createdAt)}
							</Text>
						</Text>
					</View>
				</View>
			</View>
		</>
	);
};

export default FollowNotification;
