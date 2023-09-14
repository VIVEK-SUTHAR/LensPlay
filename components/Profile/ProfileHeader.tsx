import { type BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useNavigation } from "@react-navigation/native";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import SocialLinks from "components/common/SocialLinks";
import { black, white } from "constants/Colors";
import { LENSPLAY_SITE } from "constants/index";
import { PROFILE } from "constants/tracking";
import {
	ProfileQuery,
	useBroadcastMutation,
	useCreateUnfollowTypedDataMutation,
	useProxyActionMutation,
	type CreateUnfollowTypedDataMutationResult,
	type MediaSet,
	type Profile,
	type Scalars,
} from "customTypes/generated";
import React, { useState } from "react";
import { Pressable, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getColors } from "react-native-image-colors";
import { useBgColorStore } from "store/BgColorStore";
import { useAuthStore, useProfile, useThemeStore, useToast } from "store/Store";
import CommonStyles from "styles/index";
import TrackAction from "utils/Track";
import extractURLs from "utils/extractURL";
import formatHandle from "utils/formatHandle";
import formatInteraction from "utils/formatInteraction";
import getIPFSLink from "utils/getIPFSLink";
import getImageProxyURL from "utils/getImageProxyURL";
import getRawurl from "utils/getRawUrl";
import formatUnfollowTypedData from "utils/lens/formatUnfollowTypedData";
import Logger from "utils/logger";
import Cover from "./Cover";
import PinnedPublication, { UnPinSheet } from "./PinnedPublication";
import ProfileLists from "./ProfileLists";
import UserStats from "./UserStats";
import VerifiedBadge from "./VerifiedBadge";
type ProfileHeaderProps = {
	Profile: ProfileQuery | undefined;
	onRefresh: any;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ Profile, onRefresh }) => {
	const [refreshing, setRefreshing] = useState(false);

	const sheetRef = React.useRef<BottomSheetMethods>(null);

	const { setAvatarColors } = useBgColorStore();
	const { currentProfile } = useProfile();
	const theme = useThemeStore();
	const navigation = useNavigation();
	const profile = Profile?.profile;

	// const onRefresh = React.useCallback(async () => {
	// 	setRefreshing(true);
	// 	await refetch({
	// 		request: {
	// 			profileId: profileId ? profileId : currentProfile?.id,
	// 		},
	// 	}).catch((err) => {
	// 		Logger.Error("Error in Refreshing error", err);
	// 	});
	// 	setRefreshing(false);
	// }, []);

	const navigateToFullImageAvatar = React.useCallback(() => {
		navigation.navigate("FullImage", {
			url: getIPFSLink(getRawurl(profile?.picture as MediaSet)),
			source: "avatar",
		});
		void TrackAction(PROFILE.FULL_IMAGE);
	}, [profile]);

	const navigateToUserStats = React.useCallback(() => {
		navigation.navigate("UserStats", {
			profileId: profile?.id,
			ethAddress: profile?.ownedBy,
			activeTab: "subscriber",
		});
	}, []);

	React.useEffect(() => {
		/**
		 * Fetches primary color of Image,
		 * Use Proxy for Faster Loading of Imaage
		 * Below is for  Profile Picture
		 */
		const avatarImage = getImageProxyURL({
			formattedLink: getIPFSLink(getRawurl(profile?.picture as MediaSet)),
		});

		getColors(avatarImage, {
			fallback: "black",
			cache: true,
			key: avatarImage,
			quality: "lowest",
			pixelSpacing: 500,
		})
			.then((colors) => {
				if (!colors) {
					setAvatarColors("black");
				}
				switch (colors.platform) {
					case "android":
						setAvatarColors(colors.average);
						break;
					case "ios":
						setAvatarColors(colors.primary);
						break;
					default:
						setAvatarColors("black");
				}
			})
			.catch((error) => {
				Logger.Error("Failed to load avatar Image for gettinng image color", error);
				setAvatarColors("black");
			});
		return () => {
			setAvatarColors(null);
		};
	}, [profile]);

	const goToWatchLaters = () => {
		navigation.navigate("WatchLater");
	};

	const isChannel = profile?.id !== currentProfile?.id ? true : false;

	// if (loading) return <ProfileSkeleton />;
	// if (error)
	// 	return (
	// 		<ErrorMesasge
	// 			message="Something went wrong"
	// 			withImage={true}
	// 			retryMethod={onRefresh}
	// 			withButton={true}
	// 		/>
	// 	);
	// if (profile) {
	return (
		<>
			<ScrollView
				style={CommonStyles.screenContainer}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={[theme.PRIMARY]}
						progressBackgroundColor={black[400]}
					/>
				}
				showsVerticalScrollIndicator={false}
			>
				<Cover
					navigation={navigation}
					url={getIPFSLink(getRawurl(profile?.coverPicture as MediaSet))}
				/>

				<View style={styles.ProfileContainer}>
					<Pressable onPress={navigateToFullImageAvatar}>
						<Avatar
							src={getRawurl(profile?.picture as MediaSet)}
							height={90}
							width={90}
							borderRadius={100}
						/>
					</Pressable>
					<View style={styles.editButtonContainer}>
						{isChannel ? <SubscribeButton profile={profile} /> : <EditChannelButton />}
					</View>
				</View>
				<View style={CommonStyles.mx_16}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<View>
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<Heading
									title={profile?.name || formatHandle(profile?.handle)}
									style={{
										fontSize: 16,
										marginTop: 8,
										fontWeight: "bold",
										color: "white",
									}}
								/>
								<VerifiedBadge profileId={profile?.id} />
							</View>
							<StyledText
								title={formatHandle(profile?.handle)}
								style={{
									fontSize: 12,
									fontWeight: "500",
									color: "gray",
								}}
							/>
						</View>
					</View>
					{profile?.bio ? (
						<StyledText title={extractURLs(profile?.bio)} style={styles.bioStyle} />
					) : null}
					<View style={styles.subFlexContainer}>
						<TouchableOpacity
							activeOpacity={0.5}
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
							onPress={navigateToUserStats}
						>
							<StyledText
								title={formatInteraction(profile?.stats?.totalFollowing!)}
								style={{
									fontSize: 14,
									fontWeight: "600",
									color: "white",
								}}
							/>
							<StyledText
								title={"subscription"}
								style={{
									fontSize: 14,
									fontWeight: "500",
									color: "gray",
									marginLeft: 4,
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.5}
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginLeft: 8,
							}}
							onPress={navigateToUserStats}
						>
							<StyledText
								title={formatInteraction(profile?.stats?.totalFollowers!)}
								style={{
									fontSize: 14,
									fontWeight: "600",
									color: "white",
								}}
							/>
							<StyledText
								title={"subscribers"}
								style={{
									fontSize: 14,
									fontWeight: "500",
									color: "gray",
									marginLeft: 4,
								}}
							/>
						</TouchableOpacity>
					</View>
					<SocialLinks profile={profile as Profile} />
					<PinnedPublication
						sheetRef={sheetRef as any}
						profile={profile as Profile}
						isChannel={isChannel}
					/>
					<UserStats profile={profile as Profile} />
					{/* <Pressable
						style={{
							flexDirection: "row",
							alignItems: "center",
						}}
						onPress={() => {
							navigation.navigate("FollowAnalytics");
						}}
					>
						<Icon name="follow" />
						<StyledText title={"Subscribers Growth"} style={styles.itemText} />
					</Pressable> */}
					{!isChannel ? <ProfileLists /> : null}
				</View>
			</ScrollView>

			{!isChannel ? <UnPinSheet sheetRef={sheetRef} /> : null}
		</>
	);
};
// };

type SubscribeButtonProps = {
	profile: Profile | undefined;
};

const EditChannelButton = () => {
	const navigation = useNavigation();

	const goToEditChannel = () => {
		navigation.navigate("EditProfile");
	};

	return (
		<Button
			title={"Edit Channel"}
			width={"auto"}
			type="outline"
			borderColor={white[100]}
			px={24}
			py={8}
			bg={"transparent"}
			textStyle={styles.editButtonText}
			onPress={goToEditChannel}
		/>
	);
};

const _SubscribeButton: React.FC<SubscribeButtonProps> = ({ profile }) => {
	const [isFollowing, setIsFollowing] = useState(profile?.isFollowedByMe || false);

	const toast = useToast();
	const { accessToken } = useAuthStore();
	const { address, provider, isConnected } = useWalletConnectModal();

	/**
	 * Only Free Follow and Free Collect is supported via Dispatcher
	 */
	const [freeFollowViaDispatcher] = useProxyActionMutation({
		onCompleted: (data) => {
			Logger.Success("Subscribed Succesfullly", data);
			toast.success("Subscribed succesfully!");
			setIsFollowing(true);
		},
		onError(error) {
			Logger.Error("failed  to subscribe ,", error);
			if (error?.message?.includes("only follow")) {
				toast.error("Can not follow profile");
			}
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
				"origin": LENSPLAY_SITE,
			},
		},
	});

	/**
	 * Generate Typed Data to Unfollow The Channel
	 */
	const [getTypedData] = useCreateUnfollowTypedDataMutation({
		onError() {
			toast.error("Something went wrong");
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
				"origin": LENSPLAY_SITE,
			},
		},
	});

	/**
	 * Upon Succesfuuly signing the typed data from user, send the
	 * transaction to chain using broadcast
	 *
	 */

	const [sendUnFollowTxn] = useBroadcastMutation({
		onCompleted: () => {
			toast.success("Unsubscribed succesfully!");
			setIsFollowing(false);
			TrackAction(PROFILE.UNFOLLOW);
		},
		onError: (error) => {
			Logger.Error("Failed to Subscribe via Broadcast", error);
			toast.error("Something went wrong");
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
				"origin": LENSPLAY_SITE,
			},
		},
	});

	const getButtonText = React.useCallback(() => {
		return isFollowing ? "Unsubscribe" : "Subscribe";
	}, [isFollowing]);

	const handleButtonClick = React.useCallback(() => {
		return isFollowing ? unSubscribeToChannel() : subscribeToChannel();
	}, [isFollowing]);

	const subscribeToChannel = React.useCallback(() => {
		void freeFollowViaDispatcher({
			variables: {
				request: {
					follow: {
						freeFollow: {
							profileId: profile?.id,
						},
					},
				},
			},
		});
	}, []);

	const unSubscribeToChannel = React.useCallback(async () => {
		const data = await getTypedData({
			variables: {
				request: {
					profile: profile?.id,
				},
			},
		});
		const message = formatUnfollowTypedData(data as CreateUnfollowTypedDataMutationResult);
		const msgParams = [address, JSON.stringify(message)];
		const sig = await provider?.request({
			method: "eth_signTypedData",
			params: msgParams,
		});
		void sendUnFollowTxn({
			variables: {
				request: {
					signature: sig,
					id: data?.data?.createUnfollowTypedData?.id,
				},
			},
		});
	}, []);

	return (
		<Button
			title={getButtonText()}
			width={"auto"}
			px={24}
			py={8}
			type={"filled"}
			bg={"white"}
			textStyle={{
				fontSize: 14,
				fontWeight: "600",
				color: "black",
			}}
			onPress={handleButtonClick}
		/>
	);
};

const SubscribeButton = React.memo(_SubscribeButton);

export default React.memo(ProfileHeader);

export { SubscribeButton };

const styles = StyleSheet.create({
	ProfileContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
		marginLeft: 8,
		marginTop: "-20%",
		zIndex: 12,
	},
	editButtonContainer: {
		justifyContent: "flex-end",
		marginRight: 16,
		top: 0,
	},
	editButtonText: {
		fontSize: 14,
		fontWeight: "600",
		color: "white",
	},
	verifiedContainer: {
		backgroundColor: "transparent",
		height: "auto",
		width: "auto",
		padding: 1,
		borderRadius: 8,
		marginTop: 8,
		marginHorizontal: 4,
	},
	subFlexContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
	},
	bioStyle: {
		fontSize: 16,
		color: "#E9E8E8",
		textAlign: "left",
		marginTop: 4,
	},
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		marginVertical: 16,
		borderRadius: 8,
		backgroundColor: black[700],
		borderBottomColor: "rgba(0,0,0,0.2)",
	},
	itemText: {
		color: "white",
		fontSize: 16,
		paddingVertical: 24,
		paddingHorizontal: 12,
	},
});
