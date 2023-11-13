import Icon from "components/Icon";
import Avatar from "components/UI/Avatar";
import StyledText from "components/UI/StyledText";
import { dark_primary } from "constants/Colors";
import type { HandleInfo, QuoteNotification as NewQuoteNotification } from "customTypes/generated";
import React from "react";
import { Pressable, View } from "react-native";
import extractURLs from "utils/extractURL";
import formatHandle from "utils/formatHandle";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";

type QuoteNotificationProps = {
	notification: NewQuoteNotification;
};
const QuoteNotification = ({ notification }: QuoteNotificationProps) => {
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
							<Avatar
								src={getIPFSLink(getRawurl(notification?.quote?.by?.metadata?.picture))}
								height={36}
								width={36}
							/>
						</Pressable>
						<View style={{ flexDirection: "row", alignItems: "center", maxWidth: "95%" }}>
							<StyledText
								title={formatHandle(notification?.quote?.by?.handle as HandleInfo)}
								style={{ color: "white", fontWeight: "500" }}
							/>
							<StyledText
								title={` mirrored your ${
									notification?.quote?.quoteOn?.__typename == "Post"
										? "post"
										: notification?.quote?.quoteOn?.__typename == "Comment"
										? "comment"
										: notification.quote?.quoteOn.__typename === "Quote"
										? "quote"
										: "mirrored post"
								}`}
								style={{ color: "gray" }}
							/>
						</View>
						<View>
							<StyledText
								title={extractURLs(notification?.quote?.metadata?.content ?? "")}
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

export default QuoteNotification;
