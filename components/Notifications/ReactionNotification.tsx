import Icon from "components/Icon";
import StyledText from "components/UI/StyledText";
import { dark_primary } from "constants/Colors";
import { HandleInfo, ReactionNotification as NewReactionNotification } from "customTypes/generated";
import React from "react";
import { Pressable, View } from "react-native";
import { useThemeStore } from "store/Store";
import extractURLs from "utils/extractURL";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import AvatarGroup from "./AvatarGroup";
import formatHandle from "utils/formatHandle";
type ReactionNotificationProps = {
	notification: NewReactionNotification;
};

const ReactionNotification: React.FC<ReactionNotificationProps> = ({ notification }) => {
	const { PRIMARY } = useThemeStore();

	const profileUrls = notification?.reactions.map((item) =>
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
				<Icon name="like" color={PRIMARY} />
			</View>
			<View style={{ flex: 1 }}>
				<Pressable
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "flex-start",
					}}
				>
					<AvatarGroup avatarUrls={profileUrls} />
					{/* <StyledText
						title={getDifference(notification?.rea)}
						style={{ fontSize: 12, color: "gray" }}
					/> */}
				</Pressable>
				<View style={{ flexDirection: "row", alignItems: "center", marginVertical: 2 }}>
					<StyledText
						title={formatHandle(notification?.reactions[0]?.profile?.handle as HandleInfo)}
						style={{ color: "white", fontWeight: "500" }}
					/>
					{notification?.reactions?.length > 1 && (
						<StyledText
							title={` and ${notification?.reactions?.length - 1} more`}
							style={{ color: "gray" }}
						/>
					)}
					<StyledText
						title={` liked your ${
							notification?.publication?.__typename == "Post"
								? "post"
								: notification?.publication?.__typename == "Comment"
								? "comment"
								: "mirrored post"
						}`}
						style={{ color: "gray" }}
					/>
				</View>
				<View>
					<StyledText
						title={extractURLs(notification?.publication?.metadata?.content || "")}
						numberOfLines={2}
						style={{ fontSize: 12, color: "gray" }}
					/>
				</View>
			</View>
		</Pressable>
	);
};
export default React.memo(ReactionNotification);
