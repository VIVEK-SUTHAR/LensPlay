import { useNavigation } from "@react-navigation/native";
import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { LENSPLAY_SITE } from "constants/index";
import { useProxyActionMutation } from "customTypes/generated";
import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { useGuestStore } from "store/GuestStore";
import { useActivePublication, useAuthStore, useToast } from "store/Store";
import Logger from "utils/logger";

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

	const { accessToken } = useAuthStore();
	const { isGuest } = useGuestStore();
	const toast = useToast();

	const [freeFollow] = useProxyActionMutation({
		onError: (error) => {
			Logger.Error("Failed to follow via videoauthor", error);
		},
	});
	const navigation = useNavigation();
	const { activePublication } = useActivePublication();
	const goToChannel = React.useCallback(() => {
		navigation.navigate("Channel", {
			profileId: activePublication?.profile.id,
			ethAddress: activePublication?.profile?.ownedBy,
			handle: activePublication?.profile?.handle,
			isFollowdByMe: activePublication?.profile?.isFollowedByMe,
			name: activePublication?.profile?.name || activePublication?.profile?.handle,
		});
	}, []);

	const followCreator = useCallback(() => {
		if (isGuest) {
			toast.error("Please Login to follow");
			return;
		}
		if (following) {
			toast.error("Currently not supported");
			return;
		}
		try {
			toast.success("Followed");
			setFollowing(true);
			void freeFollow({
				variables: {
					request: {
						follow: {
							freeFollow: {
								profileId: profileId,
							},
						},
					},
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
						"origin": LENSPLAY_SITE,
					},
				},
			});
		} catch (error) {
			if (error instanceof Error) {
				toast.error("Failed to follow...");
				setFollowing(false);
				// Handle errors like follow module set
				// Any one take
			}
		}
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<TouchableOpacity onPress={goToChannel} activeOpacity={0.5} >
					<Avatar src={avatarLink} width={40} height={40} />
				</TouchableOpacity>
				<View style={styles.textContainer}>
					<Heading title={uploadedBy} style={styles.heading} />
					<StyledText
						title={showSubscribers ? `${subscribersCount} Subscribers` : `@${uploadedBy}`}
						style={styles.subtext}
					/>
				</View>
			</View>
			{Boolean(showSubscribeButton) && (
				<Button
					title={following ? "Unsubscribe" : "Subscribe"}
					width={"auto"}
					px={24}
					py={8}
					type={"filled"}
					bg={"white"}
					textStyle={styles.buttonText}
					onPress={followCreator}
				/>
			)}
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
		maxWidth: 185,
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
