import { type BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useNavigation } from "@react-navigation/native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import ProfileSkeleton from "components/UI/ProfileSkeleton";
import StyledText from "components/UI/StyledText";
import ErrorMesasge from "components/common/ErrorMesasge";
import SocialLinks from "components/common/SocialLinks";
import { black, white } from "constants/Colors";
import { LENSPLAY_SITE } from "constants/index";
import { PROFILE } from "constants/tracking";
import {
	useBroadcastMutation,
	useCreateUnfollowTypedDataMutation,
	useProfileQuery,
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
	profileId?: Scalars["ProfileId"];
	ethAddress?: Scalars["EthereumAddress"];
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profileId, ethAddress }) => {
	const [refreshing, setRefreshing] = useState(false);

	const sheetRef = React.useRef<BottomSheetMethods>(null);

	const { setAvatarColors } = useBgColorStore();
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();
	const theme = useThemeStore();
	const navigation = useNavigation();

	const {
		data: Profile,
		loading,
		error,
		refetch,
	} = useProfileQuery({
		variables: {
			request: {
				profileId: profileId ? profileId : currentProfile?.id,
			},
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);
		await refetch({
			request: {
				profileId: profileId ? profileId : currentProfile?.id,
			},
		}).catch((err) => {
			Logger.Error("Error in Refreshing error", err);
		});
		setRefreshing(false);
	}, []);

	const profile = Profile?.profile;

	const navigateToFullImageAvatar = React.useCallback(() => {
		navigation.navigate("FullImage", {
			url: getIPFSLink(getRawurl(profile?.picture as MediaSet)),
			source: "avatar",
		});
		void TrackAction(PROFILE.FULL_IMAGE);
	}, [profile]);

	const navigateToUserStats = React.useCallback(() => {
		navigation.navigate("UserStats", {
			profileId: profileId,
			ethAddress: ethAddress,
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

	const isChannel = profileId ? true : false;

	if (loading) return <ProfileSkeleton />;
	if (error)
		return (
			<ErrorMesasge
				message="Something went wrong"
				withImage={true}
				retryMethod={onRefresh}
				withButton={true}
			/>
		);
	if (profile) {
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
							{isChannel ? (
								<SubscribeButton channelId={profile?.id} isFollwebByMe={profile?.isFollowedByMe} />
							) : (
								<EditChannelButton />
							)}
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
									title={formatInteraction(profile?.stats?.totalFollowing)}
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
									title={formatInteraction(profile?.stats?.totalFollowers)}
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
						<PinnedPublication sheetRef={sheetRef as any} profile={profile as Profile} />
						<UserStats profile={profile as Profile} />
						{/* {!isChannel ? <ProfileLists /> : null} */}
					</View>
				</ScrollView>
				{!isChannel ? <UnPinSheet sheetRef={sheetRef} /> : null}
			</>
		);
	}
	return null;
};

type SubscribeButtonProps = {
	isFollwebByMe: boolean;
	channelId: Scalars["ProfileId"];
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

const _SubscribeButton: React.FC<SubscribeButtonProps> = ({ channelId, isFollwebByMe }) => {
	const [isFollowing, setIsFollowing] = useState(isFollwebByMe);

	const toast = useToast();
	const { accessToken } = useAuthStore();
	const wallet = useWalletConnect();

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
							profileId: channelId,
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
					profile: channelId,
				},
			},
		});
		const message = formatUnfollowTypedData(data as CreateUnfollowTypedDataMutationResult);
		const msgParams = [wallet.accounts[0], JSON.stringify(message)];
		const sig = await wallet.signTypedData(msgParams);
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

export {SubscribeButton};

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
});
