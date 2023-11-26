import Icon from "components/Icon";
import StyledText from "components/UI/StyledText";
import { dark_primary } from "constants/Colors";
import type {
	HandleInfo,
	MirrorNotification as NewMirrorNotification,
} from "customTypes/generated";
import React from "react";
import { Pressable, View } from "react-native";
import extractURLs from "utils/extractURL";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import AvatarGroup from "./AvatarGroup";
import formatHandle from "utils/formatHandle";

type MirrorNotificationProps = {
	notification: NewMirrorNotification;
};

const MirrorNotification = ({ notification }: MirrorNotificationProps) => {
	const profileUrls = notification?.mirrors.map((item) =>
		getIPFSLink(getRawurl(item?.profile?.metadata?.picture))
	);

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
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Icon name="mirror" color={"#6bd841"} />
			</View>
			<View style={{ flex: 1 }}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<View>
						<Pressable>
							<AvatarGroup avatarUrls={profileUrls} />
						</Pressable>
						<View style={{ flexDirection: "row", alignItems: "center",maxWidth:"95%" }}>
							<StyledText
								title={formatHandle(notification?.mirrors[0].profile?.handle as HandleInfo)}
								style={{ color: "white", fontWeight: "500" }}
							/>
							{notification?.mirrors?.length > 1 && (
								<StyledText
									title={` and ${notification?.mirrors?.length - 1} more`}
									style={{ color: "gray" }}
								/>
							)}
							<StyledText
								title={` mirrored your ${
									notification?.publication?.__typename == "Post"
										? "post"
										: notification?.publication?.__typename == "Comment"
										? "comment"
										: notification.publication.__typename === "Quote"
										? "quote"
										: "mirrored post"
								}`}
								style={{ color: "gray" }}
							/>
							{/* <StyledText
								title={getDifference(notification?.mirrors[0]?.mirroredAt)}
								style={{ fontSize: 10, color: "gray" }}
							/> */}
						</View>
						<View>
							<StyledText
								title={extractURLs(notification?.publication?.metadata?.content ?? "")}
								numberOfLines={2}
								style={{ color: "grey", fontSize: 12 }}
							/>
						</View>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default MirrorNotification;
