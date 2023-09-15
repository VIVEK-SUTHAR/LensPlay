import { useNavigation } from "@react-navigation/native";
import CommentIcon from "assets/Icons/Comment";
import Avatar from "components/UI/Avatar";
import StyledText from "components/UI/StyledText";
import { black, dark_primary } from "constants/Colors";
import type { NewCommentNotification } from "customTypes/generated";
import React, { memo } from "react";
import { Pressable, View } from "react-native";
import formatAddress from "utils/formatAddress";
import getDifference from "utils/getDifference";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";

type CommentNotificationProps = {
	notification: NewCommentNotification;
};

const CommentNotification: React.FC<CommentNotificationProps> = ({ notification }) => {
	const navigation = useNavigation();

	const goToChannel = () => {
		navigation.navigate("Channel", {
			handle: notification?.profile?.handle,
			name: notification?.profile?.name!,
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
					alignSelf: "center",
				}}
			>
				<CommentIcon width={26} height={26} />
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
						src={getIPFSLink(getRawurl(notification?.profile?.picture))}
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
							notification?.profile?.handle?.split(".")[0] ||
							formatAddress(notification?.profile?.ownedBy)
						}
						style={{ color: "white", fontWeight: "500" }}
					/>
					<StyledText
						title={` commented on your ${
							notification?.comment?.commentOn?.__typename === "Post"
								? "post"
								: notification?.comment?.commentOn?.__typename === "Comment"
								? "comment"
								: "mirror"
						}`}
						style={{ color: "gray" }}
					/>
				</View>
			</View>
		</Pressable>
	);
};
export default memo(CommentNotification);
