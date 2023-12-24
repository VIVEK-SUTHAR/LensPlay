import { useNavigation } from "@react-navigation/native";
import Icon from "components/Icon";
import Avatar from "components/UI/Avatar";
import StyledText from "components/UI/StyledText";
import { dark_primary } from "constants/Colors";
import type {
	HandleInfo,
	MentionNotification as NewMentionNotification,
} from "customTypes/generated";
import React from "react";
import { Pressable, Text, View } from "react-native";
import extractURLs from "utils/extractURL";
import formatAddress from "utils/formatAddress";
import formatHandle from "utils/formatHandle";
import getDifference from "utils/getDifference";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";

type MentionNotificationProps = {
	notification: NewMentionNotification;
};

const MentionNotification = ({ notification }: MentionNotificationProps) => {
	const navigation = useNavigation();

	const goToChannel = () => {
		navigation.navigate("Channel", {
			handle: notification?.publication?.by?.handle?.fullHandle,
			name: notification?.publication?.by?.metadata?.displayName ?? "",
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
				key={React.useId()}
				style={{
					height: 35,
					width: 35,
					marginHorizontal: 4,
					alignItems: "center",
				}}
			>
				<Icon name="mention" color="#79E0EE" size={24} />
			</View>
			<View style={{ flex: 1 }} key={React.useId()}>
				<Pressable
					onPress={goToChannel}
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "flex-start",
					}}
				>
					<Avatar
						src={getIPFSLink(getRawurl(notification?.publication?.by?.metadata?.picture))}
						height={35}
						width={35}
					/>
				</Pressable>
				<Text style={{ color: "gray", fontSize: 14 }}>
					<Text style={{ color: "white", fontWeight: "600" }}>
						{formatHandle(notification?.publication?.by?.handle as HandleInfo)}
					</Text>
					mentioned you in a {notification?.publication?.__typename === "Post" ? "post" : "comment"}
				</Text>
				<View>
					<Text numberOfLines={2} style={{ color: "grey", fontSize: 12 }}>
						{extractURLs(notification?.publication?.metadata?.content)}
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default MentionNotification;
