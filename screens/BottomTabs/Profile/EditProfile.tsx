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
} from "@lens-protocol/metadata";

const EditProfile = ({ navigation }: RootStackScreenProps<"EditProfile">) => {
	const { currentProfile } = useProfile();
	const windowHeight = Dimensions.get("window").height;
	const toast = useToast();
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const { accessToken } = useAuthStore();

	//states for avatar
	const [avatar, setAvatar] = useState<null | string>(null);
	const [avatarBlob, setAvatarBlob] = useState<Blob>();

	//states for cover
	const [cover, setCover] = useState<string>("");
	const [coverBlob, setCoverBlob] = useState<Blob>();

	//state for name, bio

	const [userData, setUserData] = useState({
		name: "",
		bio: "",
	});

	//states for social links
	const [socialLinks, setSocialLinks] = useState({
		twitter: "",
		instagram: "",
		youtube: "",
		website: "",
	});

	//handle selection of avatar
	async function selectAvatar() {
		setAvatar(null);
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
			base64: true,
		});
		if (result.canceled) {
			// toast.show("No image selected", ToastType.ERROR, true);
			return;
		}
		if (!result.canceled) {
			setAvatar(result.assets[0].uri);
			const imgblob = await getImageBlobFromUri(result.assets[0].uri);
			setAvatarBlob(imgblob);
		}
	}

	const constructAttributes = () => {
		try {
			let attr = currentProfile?.metadata?.attributes! || [];
			let newAttributes = [...attr];
			const twitter = newAttributes.find((item) => item.key === "twitter")?.value;
			const website = newAttributes.find((item) => item.key === "website")?.value;
			const instagram = newAttributes.find((item) => item.key === "instagram")?.value;
			const youtube = newAttributes.find((item) => item.key === "youtube")?.value;
			if (!twitter && socialLinks.twitter) {
				newAttributes.push({
					type: MetadataAttributeType.STRING as any,
					key: "twitter",
					value: socialLinks.twitter,
				});
			}
			if (!website && socialLinks.website) {
				newAttributes.push({
					type: MetadataAttributeType.STRING as any,
					key: "website",
					value: socialLinks.website,
				});
			}
			if (!instagram && socialLinks.instagram) {
				newAttributes.push({
					type: MetadataAttributeType.STRING as any,
					key: "instagram",
					value: socialLinks.instagram,
				});
			}
			if (!youtube && socialLinks.youtube) {
				newAttributes.push({
					type: MetadataAttributeType.STRING as any,
					key: "youtube",
					value: socialLinks.youtube,
				});
			}
			for (const attribute of newAttributes!) {
				if (attribute.key === "twitter") {
					attribute.type = MetadataAttributeType.STRING as any;
					attribute.value = socialLinks.twitter || attribute.value;
				}
				if (attribute.key === "website") {
					attribute.type = MetadataAttributeType.STRING as any;
					attribute.value = socialLinks.website || attribute.value;
				}
				if (attribute.key === "instagram") {
					attribute.type = MetadataAttributeType.STRING as any;
					attribute.value = socialLinks.instagram || attribute.value;
				}
				if (attribute.key === "youtube") {
					attribute.type = MetadataAttributeType.STRING as any;
					attribute.value = socialLinks.youtube || attribute.value;
				}
				if (attribute.type == "STRING") {
					attribute.type = MetadataAttributeType.STRING as any;
				}
			}
			return newAttributes;
		} catch (error) {
			Logger.Error("erorr", error);
		}
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
			setCover(coverresult.assets[0].uri);
			const imgblob = await getImageBlobFromUri(coverresult.assets[0].uri);
			setCoverBlob(imgblob);
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
				!cover &&
				!avatar
			) {
				toast.show("Please select data", ToastType.ERROR, true);
			} else {
				let avatar;
				let cover;
				if (avatarBlob) {
					Logger.Log("User has changed avatar");
					const rawAvatar = await uploadImageToIPFS(avatarBlob);
					avatar = `ipfs://${rawAvatar}`;
				}
				if (coverBlob) {
					Logger.Log("User has changed cover");
					const rawCover = await uploadImageToIPFS(coverBlob);
					cover = `ipfs://${rawCover}`;
					Logger.Log("this is ipfs", cover);
				}
				const newAttributes = constructAttributes();
				Logger.Log(
					"this are latest attributes",
					newAttributes,
					cover,
					avatar,
					getRawurl(currentProfile?.metadata?.picture),
					currentProfile?.metadata?.picture
				);
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
							uri: cover || getIPFSLink(getRawurl(currentProfile?.metadata?.coverPicture)),
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
						src={avatar || getRawurl(currentProfile?.metadata?.picture)}
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
								name: e.nativeEvent.text,
								bio: userData.bio,
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
								name: userData.name,
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
