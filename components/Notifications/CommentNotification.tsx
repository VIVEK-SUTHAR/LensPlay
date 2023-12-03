import { useNavigation } from "@react-navigation/native";
import Icon from "components/Icon";
import Avatar from "components/UI/Avatar";
import StyledText from "components/UI/StyledText";
import { dark_primary } from "constants/Colors";
import type {
	HandleInfo,
	CommentNotification as NewCommentNotification,
} from "customTypes/generated";
import React, { memo } from "react";
import { Pressable, View } from "react-native";
import formatAddress from "utils/formatAddress";
import formatHandle from "utils/formatHandle";
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
			handle: notification?.comment?.by?.handle?.fullHandle,
			name: notification?.comment?.by?.metadata?.displayName ?? "",
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
				<Icon name="comment" color="#8696FE" />
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
						src={getIPFSLink(getRawurl(notification?.comment?.by?.metadata?.picture))}
						height={35}
						width={35}
					/>
					<StyledText
						title={getDifference(notification?.comment?.createdAt)}
						style={{ fontSize: 12, color: "gray" }}
					/>
				</Pressable>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<StyledText
						title={formatHandle(notification?.comment?.by?.handle as HandleInfo)}
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
				<StyledText
					title={notification?.comment?.metadata?.content ?? ""}
					style={{ color: "gray" }}
					numberOfLines={2}
				/>
			</View>
		</Pressable>
	);
};
export default memo(CommentNotification);
