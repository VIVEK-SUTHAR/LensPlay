import Icon from "components/Icon";
import Avatar from "components/UI/Avatar";
import StyledText from "components/UI/StyledText";
import { dark_primary } from "constants/Colors";
import { HandleInfo, ActedNotification as NewCollectNotification } from "customTypes/generated";
import React from "react";
import { Pressable, View } from "react-native";
import formatHandle from "utils/formatHandle";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";

type CollectNotificationProps = {
	notification: NewCollectNotification;
};

const CollectNotification: React.FC<CollectNotificationProps> = ({ notification }) => {
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
				<Icon name="collect" color="#E57C23" size={24} />
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
						src={getIPFSLink(getRawurl(notification?.actions[0]?.by?.metadata?.picture))}
						height={35}
						width={35}
					/>
				</Pressable>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<StyledText
						title={formatHandle(notification?.actions[0].by?.handle as HandleInfo)}
						style={{ color: "white", fontWeight: "500" }}
					/>
					<StyledText title={" collected your post"} style={{ color: "gray" }} />
				</View>
				<StyledText
					title={notification?.publication?.metadata?.content}
					numberOfLines={2}
					style={{ fontSize: 10, color: "gray" }}
				/>
			</View>
		</Pressable>
	);
};

export default CollectNotification;
