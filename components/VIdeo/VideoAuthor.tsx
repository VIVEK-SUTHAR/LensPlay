import { useNavigation } from "@react-navigation/native";
import { SubscribeButton } from "components/Profile/ProfileHeader";
import Avatar from "components/UI/Avatar";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { HandleInfo } from "customTypes/generated";
import React, { useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { useActivePublication } from "store/Store";
import formatHandle from "utils/formatHandle";

type VideoCreatorProps = {
	avatarLink: string;
	uploadedBy: string;
	profileId: string;
	alreadyFollowing: boolean;
	showSubscribeButton?: boolean;
	showSubscribers?: boolean;
	subscribersCount?: number;
};

const VideoCreator: React.FC<VideoCreatorProps> = React.memo((props) => {
	const {
		profileId,
		uploadedBy,
		avatarLink,
		alreadyFollowing,
		showSubscribers = false,
		subscribersCount = 0,
		showSubscribeButton = true,
	} = props;

	const [following, setFollowing] = useState<boolean>(alreadyFollowing);

	const navigation = useNavigation();
	const { activePublication } = useActivePublication();
	const goToChannel = React.useCallback(() => {
		navigation.navigate("Channel", {
			handle: formatHandle(activePublication?.by?.handle as HandleInfo),
			name: activePublication?.by?.metadata?.displayName ?? "",
		});
	}, []);
	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<TouchableOpacity onPress={goToChannel} activeOpacity={0.5}>
					<Avatar src={avatarLink} width={40} height={40} />
				</TouchableOpacity>
				<View style={styles.textContainer}>
					<Heading title={uploadedBy} style={styles.heading} numberOfLines={1} />
					<StyledText
						numberOfLines={1}
						title={
							showSubscribers
								? `${subscribersCount} Subscribers`
								: `@${formatHandle(activePublication?.by?.handle as HandleInfo)}`
						}
						style={styles.subtext}
					/>
				</View>
			</View>
			{showSubscribeButton ? (
				<SubscribeButton channelId={profileId} isFollwebByMe={following} />
			) : null}
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 4,
		justifyContent: "space-between",
		marginTop: 12,
		textAlign: "center",
	},
	contentContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	textContainer: {
		marginHorizontal: 8,
		maxWidth: Dimensions.get("window").width / 2.5,
	},
	heading: {
		color: "white",
		fontSize: 16,
		fontWeight: "500",
	},
	subtext: {
		color: "gray",
		fontSize: 12,
		fontWeight: "500",
	},
	buttonText: {
		fontSize: 14,
		fontWeight: "600",
	},
});

export default VideoCreator;
