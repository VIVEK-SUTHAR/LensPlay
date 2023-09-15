import { useNavigation } from "@react-navigation/native";
import SubscribeButton from "components/Profile/SubscribeButton";
import Avatar from "components/UI/Avatar";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { Profile } from "customTypes/generated";
import React, { useCallback, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import getRawurl from "utils/getRawUrl";

type VideoCreatorProps = {
	showSubscribeButton?: boolean;
	showSubscribers?: boolean;
	subscribersCount?: number;
	profile: Profile | undefined;
};

const VideoCreator: React.FC<VideoCreatorProps> = React.memo((props) => {
	const {
		profile,
		showSubscribers = false,
		subscribersCount = 0,
		showSubscribeButton = true,
	} = props;

	const navigation = useNavigation();
	const goToChannel = React.useCallback(() => {
		navigation.navigate("Channel", {
			handle: profile?.handle,
			name: profile?.name!,
		});
	}, []);
	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<TouchableOpacity onPress={goToChannel} activeOpacity={0.5}>
					<Avatar src={getRawurl(profile?.picture)} width={40} height={40} />
				</TouchableOpacity>
				<View style={styles.textContainer}>
					<Heading
						title={profile?.name || profile?.handle}
						style={styles.heading}
						numberOfLines={1}
					/>
					<StyledText
						numberOfLines={1}
						title={showSubscribers ? `${subscribersCount} Subscribers` : `@${profile?.handle}`}
						style={styles.subtext}
					/>
				</View>
			</View>
			{showSubscribeButton ? <SubscribeButton profile={profile} /> : null}
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
