import { useNavigation } from "@react-navigation/native";
import Icon from "components/Icon";
import Avatar from "components/UI/Avatar";
import StyledText from "components/UI/StyledText";
import { dark_primary } from "constants/Colors";
import type { NewFollowerNotification } from "customTypes/generated";
import React from "react";
import { Pressable, View } from "react-native";
import formatAddress from "utils/formatAddress";
import formatHandle from "utils/formatHandle";
import getDifference from "utils/getDifference";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
type FollowNotificationProps = {
	notification: NewFollowerNotification;
};

const FollowNotification: React.FC<FollowNotificationProps> = ({ notification }) => {
	const navigation = useNavigation();

	const goToChannel = () => {
		navigation.navigate("Channel", {
			name: notification?.wallet?.defaultProfile?.name,
			handle: notification?.wallet?.defaultProfile?.handle,
		});
	};

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
				<Icon name="follow" size={30} color="#EA8FEA" />
			</View>
			<View style={{ flex: 1 }}>
				<Pressable
					onPress={goToChannel}
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
							formatHandle(notification?.wallet?.defaultProfile?.handle) ||
							formatAddress(notification?.wallet?.defaultProfile?.id)
						}
						style={{ color: "white", fontWeight: "500" }}
					/>
					<StyledText title={" followed you"} style={{ color: "gray" }} />
				</View>
			</View>
		</Pressable>
	);
};

export default React.memo(FollowNotification);
