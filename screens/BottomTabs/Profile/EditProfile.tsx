import React, { useCallback, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Dimensions, Image, Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native";

import { RootStackScreenProps } from "customTypes/navigation";
import Button from "components/UI/Button";
import Input from "components/UI/Input";
import StyledText from "components/UI/StyledText";
import TextArea from "components/UI/TextArea";
import Icon from "components/Icon";
import getRawurl from "utils/getRawUrl";
import getIPFSLink from "utils/getIPFSLink";
import { useAuthStore, useProfile, useToast } from "store/Store";
import formatHandle from "utils/formatHandle";
import { ToastType } from "customTypes/Store";
import Avatar from "components/UI/Avatar";
import { dark_primary } from "constants/Colors";
import getImageBlobFromUri from "utils/getImageBlobFromUri";
import { HandleInfo, useSetProfileMetadataMutation } from "customTypes/generated";
import uploadImageToIPFS from "utils/uploadImageToIPFS";
import { APP_ID, LENSPLAY_SITE } from "constants/index";
import TrackAction from "utils/Track";
import { SETTINGS } from "constants/tracking";
import Logger from "utils/logger";
import uploadProfileMetadata from "utils/uploadProfileMetadata";
import {
	ProfileSchemaId,
	profile as profileMetadata,
	MetadataAttributeType,
	MetadataAttribute,
} from "@lens-protocol/metadata";

const EditProfile = ({ navigation }: RootStackScreenProps<"EditProfile">) => {
	const { currentProfile, setCurrentProfile } = useProfile();
	const windowHeight = Dimensions.get("window").height;
	const toast = useToast();
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const { accessToken } = useAuthStore();
	type SocialLinks = {
		twitter: string;
		instagram: string;
		youtube: string;
		website: string;
	};

	const [userData, setUserData] = useState({
		name: "",
		bio: "",
		avatar: "",
		cover: "",
	});

	//states for social links
	const [socialLinks, setSocialLinks] = useState<SocialLinks>({
		twitter: "",
		instagram: "",
		youtube: "",
		website: "",
	});

	//handle selection of avatar
	async function selectAvatar() {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
			base64: true,
		});
		if (result.canceled) {
			return;
		}
		if (!result.canceled) {
			setUserData({ ...userData, avatar: result.assets[0].uri });
			return;
		}
	}

	const constructAttributes = () => {
		try {
			const socialLinksKeys = ["twitter", "website", "instagram", "youtube"];
			const newAttributes = (currentProfile?.metadata?.attributes || []).map((attribute) => ({
				...attribute,
				type: attribute.type === "STRING" ? MetadataAttributeType.STRING : attribute.type,
			}));

			socialLinksKeys.forEach((key) => {
				const existingAttribute = newAttributes.find((item) => item.key === key);
				const socialLinkValue = socialLinks[key];
				if (!existingAttribute && socialLinkValue) {
					newAttributes.push({
						type: MetadataAttributeType.STRING as any,
						key: key,
						value: socialLinkValue,
					});
				} else if (existingAttribute && socialLinkValue) {
					existingAttribute.type = MetadataAttributeType.STRING as any;
					existingAttribute.value = socialLinkValue;
				}
			});

			return newAttributes;
		} catch (error) {
			Logger.Error("error", error);
		}
	};

	const updateStore = async () => {
		setCurrentProfile({
			...currentProfile,
			metadata: {
				...currentProfile!.metadata,
				displayName: userData.name || currentProfile?.metadata?.displayName,
				bio: userData.bio || currentProfile?.metadata?.bio,
				attributes: constructAttributes(),
			},
		});
	};

	//handle selection of cover
	async function selectCover() {
		let coverresult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
			aspect: [2, 1],
			base64: true,
		});
		if (coverresult.canceled) {
			return;
		}
		if (!coverresult.canceled) {
			setUserData({ ...userData, cover: coverresult.assets[0].uri });
		}
	}

	const [createSetProfileMetadataViaDispatcherMutation] = useSetProfileMetadataMutation({
		onCompleted: (data) => {
			Logger.Success("metadata updated", data);
			TrackAction(SETTINGS.PROFILE.UPDATE_DETAILS);
		},
		onError: (error) => {
			Logger.Error("Error while updating metadata", error);
		},
	});

	const handleUpdate = async () => {
		try {
			setIsUpdating(true);
			//check if nothing is updated
			if (
				!userData.bio &&
				!userData.name &&
				!socialLinks.instagram &&
				!socialLinks.twitter &&
				!socialLinks.website &&
				!socialLinks.youtube &&
				!userData.cover &&
				!userData.avatar
			) {
				toast.show("Please select data", ToastType.ERROR, true);
			} else {
				let avatar;
				let cover;
				if (userData.avatar) {
					Logger.Log("User has changed avatar");
					const avatarBlob = await getImageBlobFromUri(userData.avatar);
					const rawAvatar: string = await uploadImageToIPFS(avatarBlob);
					avatar = `ipfs://${rawAvatar}`;
				}
				if (userData.cover) {
					Logger.Log("User has changed cover");
					const coverBlob = await getImageBlobFromUri(userData.cover);
					const rawCover = await uploadImageToIPFS(coverBlob);
					cover = `ipfs://${rawCover}`;
					Logger.Log("this is ipfs", cover);
				}
				const newAttributes = constructAttributes();
				const metadata = profileMetadata({
					name: userData.name
						? userData.name
						: currentProfile?.metadata?.displayName!
						? currentProfile?.metadata?.displayName!
						: "",
					bio: userData.bio
						? userData.bio
						: currentProfile?.metadata?.bio
						? currentProfile?.metadata?.bio
						: "",
					picture: avatar ? avatar : getRawurl(currentProfile?.metadata?.picture),
					coverPicture: cover ? cover : getRawurl(currentProfile?.metadata?.coverPicture),
					attributes: newAttributes as any,
				});

				const response = await uploadProfileMetadata(metadata);

				await createSetProfileMetadataViaDispatcherMutation({
					variables: {
						request: {
							metadataURI: `ar://${response.id}`,
							// profileId: currentProfile?.id,
						},
					},
					context: {
						headers: {
							"x-access-token": `Bearer ${accessToken}`,
							"origin": LENSPLAY_SITE,
						},
					},
				});
				updateStore();

				toast.show("Channel updated successfully", ToastType.SUCCESS, true);
			}
		} catch (error) {
			Logger.Error("Error in Edit Channel", error);
			toast.show("Something went wrong", ToastType.ERROR, true);
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
		>
			<ScrollView style={styles.container}>
				<Pressable
					onPress={selectCover}
					style={{
						height: windowHeight / 4,
						width: "100%",
					}}
				>
					<View
						style={{
							position: "absolute",
							height: "100%",
							width: "100%",
							backgroundColor: "rgba(255,255,255,0.02)",
							zIndex: 4,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Icon name="edit" />
					</View>
					<Image
						source={{
							uri: userData.cover || getIPFSLink(getRawurl(currentProfile?.metadata?.coverPicture)),
						}}
						style={{
							opacity: 0.5,
							height: "100%",
							width: "100%",
							resizeMode: "cover",
						}}
					/>
				</Pressable>
				<Pressable
					style={{
						marginHorizontal: 10,
						marginTop: -40,
						height: windowHeight / 8,
						width: windowHeight / 8,
					}}
					onPress={selectAvatar}
				>
					<View
						style={{
							position: "absolute",
							height: "100%",
							width: "100%",
							backgroundColor: "rgba(255,255,255,0.02)",
							zIndex: 10,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Icon name="edit" size={20} />
					</View>
					<Avatar
						src={userData.avatar || getRawurl(currentProfile?.metadata?.picture)}
						height={"100%"}
						width={"100%"}
						opacity={0.9}
					/>
				</Pressable>
				<View style={{ padding: 16 }}>
					<Input
						label="Name"
						value={userData.name}
						placeHolder={
							currentProfile?.metadata?.displayName ||
							formatHandle(currentProfile?.handle as HandleInfo)
						}
						onChange={(e) => {
							setUserData({
								...userData,
								name: e.nativeEvent.text,
							});
						}}
					/>
					<TextArea
						label="Bio"
						placeHolder={currentProfile?.metadata?.bio || "What describes you the best"}
						value={userData.bio}
						rows={6}
						onChange={(e) => {
							setUserData({
								...userData,
								bio: e.nativeEvent.text,
							});
						}}
					/>
					<StyledText title="Social Links" style={styles.textStyle} />
					<Input
						label="Twitter"
						value={socialLinks.twitter}
						placeHolder={"@username"}
						onChange={(e) => {
							setSocialLinks({
								...socialLinks,
								twitter: e.nativeEvent.text,
							});
						}}
					/>
					<Input
						label="Instagram"
						placeHolder={"@username"}
						value={socialLinks.instagram}
						onChange={(e) => {
							setSocialLinks({
								...socialLinks,
								instagram: e.nativeEvent.text,
							});
						}}
					/>
					<Input
						label="Youtube"
						placeHolder={"Youtube Link"}
						value={socialLinks.youtube}
						onChange={(e) => {
							setSocialLinks({
								...socialLinks,
								youtube: e.nativeEvent.text,
							});
						}}
					/>
					<Input
						label="Website"
						value={socialLinks.website}
						placeHolder={"https://your-site.com"}
						onChange={(e) => {
							setSocialLinks({
								...socialLinks,
								website: e.nativeEvent.text,
							});
						}}
					/>
				</View>
				<View style={[styles.inputContainer]}>
					<Button
						title="Save"
						width={"100%"}
						py={16}
						my={16}
						textStyle={{
							textAlign: "center",
							fontSize: 16,
							fontWeight: "600",
						}}
						isLoading={isUpdating}
						onPress={handleUpdate}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	textStyle: {
		color: "white",
		fontWeight: "700",
		marginTop: 16,
		marginBottom: 8,
		fontSize: 16,
	},
	inputContainer: {
		width: "100%",
		paddingHorizontal: 16,
	},
	input: {
		backgroundColor: dark_primary,
		color: "white",
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
	},
});

export default EditProfile;
