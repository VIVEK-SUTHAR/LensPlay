import { useNavigation } from "@react-navigation/native";
import Mirror from "assets/Icons/Mirror";
import Avatar from "components/UI/Avatar";
import StyledText from "components/UI/StyledText";
import { dark_primary } from "constants/Colors";
import type { NewMirrorNotification } from "customTypes/generated";
import React from "react";
import { Pressable, View } from "react-native";
import extractURLs from "utils/extractURL";
import formatAddress from "utils/formatAddress";
import getDifference from "utils/getDifference";
import getRawurl from "utils/getRawUrl";

type MirrorNotificationProps = {
	notification: NewMirrorNotification;
};

const MirrorNotification = ({ notification }: MirrorNotificationProps) => {
	const navigation = useNavigation();

	const profile = notification?.profile;

	const goToChannel = () => {
		navigation.navigate("Channel", {
			handle: profile?.handle,
			name: profile?.name!,
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
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Mirror height={22} width={22} color={"#6bd841"} />
			</View>
			<View style={{ flex: 1 }}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<View>
						<Pressable onPress={goToChannel}>
							<Avatar src={getRawurl(notification?.profile?.picture)} height={35} width={35} />
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
								title={` mirrored your ${
									notification?.publication?.__typename == "Post"
										? "post"
										: notification?.publication?.__typename == "Comment"
										? "comment"
										: "mirrored post"
								}`}
								style={{ color: "gray" }}
							/>
							<StyledText
								title={getDifference(notification?.createdAt)}
								style={{ fontSize: 10, color: "gray" }}
							/>
						</View>
						<View>
							<StyledText
								title={extractURLs(
									notification?.publication?.metadata?.content ||
										notification?.publication?.metadata?.description
								)}
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
