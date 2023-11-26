import Icon from "components/Icon";
import Avatar from "components/UI/Avatar";
import StyledText from "components/UI/StyledText";
import { dark_primary } from "constants/Colors";
import type {
	HandleInfo,
	FollowNotification as NewFollowerNotification,
} from "customTypes/generated";
import React from "react";
import { Pressable, View } from "react-native";
import formatHandle from "utils/formatHandle";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
type FollowNotificationProps = {
	notification: NewFollowerNotification;
};

const FollowNotification: React.FC<FollowNotificationProps> = ({ notification }) => {
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
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "flex-start",
					}}
				>
					<Avatar
						src={getIPFSLink(getRawurl(notification?.followers[0]?.metadata?.picture))}
						height={36}
						width={36}
					/>
				</Pressable>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<StyledText
						title={formatHandle(notification?.followers[0].handle as HandleInfo) ?? ""}
						style={{ color: "white", fontWeight: "500" }}
					/>
					{notification.followers?.length > 1 && (
						<StyledText
							title={` and ${notification?.followers?.length - 1} more`}
							style={{ color: "gray" }}
						/>
					)}
					<StyledText title={" followed you"} style={{ color: "gray" }} />
				</View>
			</View>
		</Pressable>
	);
};

export default React.memo(FollowNotification);
