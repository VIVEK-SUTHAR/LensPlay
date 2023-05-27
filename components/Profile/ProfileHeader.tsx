import { type BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useNavigation } from "@react-navigation/native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import React, { useState } from "react";
import { Pressable, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getColors } from "react-native-image-colors";
import { LENSPLAY_SITE } from "../../constants";
import { black, white } from "../../constants/Colors";
import { PROFILE } from "../../constants/tracking";
import VERIFIED_CHANNELS from "../../constants/Varified";
import { useBgColorStore } from "../../store/BgColorStore";
import { useAuthStore, useProfile, useThemeStore, useToast } from "../../store/Store";
import CommonStyles from "../../styles";
import {
	type CreateUnfollowTypedDataMutationResult,
	type MediaSet,
	type Profile,
	type Scalars,
	useBroadcastMutation,
	useCreateUnfollowTypedDataMutation,
	useProfileQuery,
	useProxyActionMutation,
} from "../../types/generated";
import extractURLs from "../../utils/extractURL";
import formatHandle from "../../utils/formatHandle";
import formatInteraction from "../../utils/formatInteraction";
import getImageProxyURL from "../../utils/getImageProxyURL";
import getIPFSLink from "../../utils/getIPFSLink";
import getRawurl from "../../utils/getRawUrl";
import formatUnfollowTypedData from "../../utils/lens/formatUnfollowTypedData";
import Logger from "../../utils/logger";
import TrackAction from "../../utils/Track";
import ErrorMesasge from "../common/ErrorMesasge";
import SocialLinks from "../common/SocialLinks";
import Icon from "../Icon";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import Heading from "../UI/Heading";
import ProfileSkeleton from "../UI/ProfileSkeleton";
import StyledText from "../UI/StyledText";
import Cover from "./Cover";
import PinnedPublication, { UnPinSheet } from "./PinnedPublication";
import UserStats from "./UserStats";

interface ProfileHeaderProps {
	profileId?: Scalars["ProfileId"];
	ethAddress?: Scalars["EthereumAddress"];
}

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
				profileId: Boolean(profileId) || currentProfile?.id,
			},
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		refetch({
			request: {
				profileId: Boolean(profileId) || currentProfile?.id,
			},
		})
			.then(() => {})
			.catch((err) => {
				Logger.Error("Error in Refreshing error", err);
			});
		setRefreshing(false);
	}, []);

	const profile = Profile?.profile;

	const navigateToFullImageCover = React.useCallback(() => {
		navigation.navigate("FullImage", {
			url: getRawurl(profile?.coverPicture as MediaSet),
			source: "cover",
		});
		void TrackAction(PROFILE.FULL_IMAGE);
	}, []);

	const navigateToFullImageAvatar = React.useCallback(() => {
		navigation.navigate("FullImage", {
			url: getRawurl(profile?.picture as MediaSet),
			source: "avatar",
		});
		void TrackAction(PROFILE.FULL_IMAGE);
	}, []);

	const navigateToUserStats = React.useCallback(() => {
		navigation.navigate("UserStats", {
			profileId,
			ethAddress,
			activeTab: "subscriber",
		});
	}, []);

	React.useEffect(() => {
		const coverURL = getImageProxyURL({
			formattedLink: getIPFSLink(getRawurl(profile?.coverPicture as MediaSet)),
		});

		getColors(coverURL, {
			fallback: "#000000",
			cache: true,
			key: coverURL,
			quality: "lowest",
			pixelSpacing: 500,
		})
			.then((colors) => {
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
			.catch((reason) => {
				Logger.Error("Error in Get Image color", reason);
			});

		return () => {
			setAvatarColors(null);
		};
	}, []);

	const isChannel = Boolean(profileId);

	if (loading) return <ProfileSkeleton />;
	if (error != null)
		return (
			<ErrorMesasge
				message="Something went wrong"
				withImage={true}
				retryMethod={onRefresh}
				withButton={true}
			/>
		);
	if (profile != null) {
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
					<Pressable onPress={navigateToFullImageCover}>
						<Cover
							navigation={navigation}
							url={getIPFSLink(getRawurl(profile?.coverPicture as MediaSet))}
						/>
					</Pressable>
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
										title={Boolean(profile?.name) || formatHandle(profile?.handle)}
										style={{
											fontSize: 16,
											marginTop: 8,
											fontWeight: "bold",
											color: "white",
										}}
									/>
									{VERIFIED_CHANNELS.includes(profile?.id) && (
										<View style={styles.verifiedContainer}>
											<Icon name="verified" size={18} color={theme.PRIMARY} />
										</View>
									)}
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
						{profile?.bio != null ? (
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
					</View>
				</ScrollView>
				{!isChannel ? <UnPinSheet sheetRef={sheetRef} /> : null}
			</>
		);
	}
	return null;
};

interface SubscribeButtonProps {
	isFollwebByMe: boolean;
	channelId: Scalars["ProfileId"];
}

const EditChannelButton = (): JSX.Element => {
	const navigation = useNavigation();

	const goToEditChannel = (): void => {
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
			void TrackAction(PROFILE.UNFOLLOW);
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

	const handleButtonClick = React.useCallback(async () => {
		if (isFollowing) {
			void unSubscribeToChannel();
		} else {
			subscribeToChannel();
		}
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
