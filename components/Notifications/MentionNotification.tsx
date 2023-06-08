import { useNavigation } from "@react-navigation/native";
import Icon from "components/Icon";
import Avatar from "components/UI/Avatar";
import StyledText from "components/UI/StyledText";
import { dark_primary } from "constants/Colors";
import type { NewMentionNotification } from "customTypes/generated";
import React from "react";
import { Pressable, Text, View } from "react-native";
import extractURLs from "utils/extractURL";
import formatAddress from "utils/formatAddress";
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
			profileId: notification?.mentionPublication?.profile?.id,
			isFollowdByMe: notification?.mentionPublication?.profile?.isFollowedByMe,
			name:
				notification?.mentionPublication?.profile?.name ||
				notification?.mentionPublication?.profile?.handle,
			ethAddress: notification?.mentionPublication?.profile?.ownedBy,
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
						src={getIPFSLink(getRawurl(notification?.mentionPublication?.profile?.picture))}
						height={35}
						width={35}
					/>
					<StyledText
						title={getDifference(notification?.createdAt)}
						style={{ fontSize: 12, color: "gray" }}
					/>
				</Pressable>
				<Text style={{ color: "gray", fontSize: 14 }}>
					<Text style={{ color: "white", fontWeight: "600" }}>
						{notification?.mentionPublication?.profile?.handle?.split(".")[0] ||
							formatAddress(notification?.mentionPublication?.profile?.ownedBy)}{" "}
					</Text>
					mentioned you in a{" "}
					{notification?.mentionPublication?.__typename === "Post" ? "post" : "comment"}
				</Text>
				<View>
					<Text numberOfLines={2} style={{ color: "grey", fontSize: 12 }}>
						{extractURLs(
							notification?.mentionPublication?.metadata?.description ||
								notification?.mentionPublication?.metadata?.content
						)}
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default MentionNotification;
