import React, { useCallback, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Dimensions, Image, Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native";

import { RootStackScreenProps } from "customTypes/navigation";
import Button from "components/UI/Button";
import Input from "components/UI/Input";
import StyledText from "components/UI/StyledText";
import TextArea from "components/UI/TextArea";
import getRawurl from "utils/getRawUrl";
import getIPFSLink from "utils/getIPFSLink";
import { useAuthStore, useProfile, useToast } from "store/Store";
import formatHandle from "utils/formatHandle";
import { ToastType } from "customTypes/Store";
import Avatar from "components/UI/Avatar";
import { dark_primary } from "constants/Colors";
import getImageBlobFromUri from "utils/getImageBlobFromUri";
import {
	Profile,
	useCreateSetProfileImageUriViaDispatcherMutation,
	useCreateSetProfileMetadataViaDispatcherMutation,
} from "customTypes/generated";
import uploadImageToIPFS from "utils/uploadImageToIPFS";
import { LENSPLAY_SITE } from "constants/index";
import TrackAction from "utils/Track";
import { SETTINGS } from "constants/tracking";
import Logger from "utils/logger";
import uploadProfileMetadata from "utils/uploadProfileMetadata";
import Edit from "assets/Icons/Edit";

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

	const [initialSocialLinks, setInitialSocialLinks] = useState({
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

	useEffect(() => {
		if (currentProfile) {
			getSocialLinks(currentProfile);
		}
	}, []);

	//function that fetches current social links from profile
	const getSocialLinks = useCallback((profile: Profile | null) => {
		const attributes = profile?.attributes ?? [];

		const website = attributes.find((item) => item.key === "website")?.value;
		const twitter = attributes.find((item) => item.key === "twitter")?.value;
		const instagram = attributes.find((item) => item.key === "instagram")?.value;
		const youtube = attributes.find((item) => item.key === "youtube")?.value;

		setInitialSocialLinks({
			instagram: instagram || "",
			website: website || "",
			youtube: youtube || "",
			twitter: twitter || "",
		});
	}, []);

	//function that check if any channel details have been updated
	const canUpload = (): boolean => {
		return (
			userData.name.length > 0 ||
			userData.bio.length > 0 ||
			socialLinks.instagram.length > 0 ||
			socialLinks.twitter.length > 0 ||
			socialLinks.website.length > 0 ||
			socialLinks.youtube.length > 0 ||
			cover.length > 0
		);
	};

	const [createSetProfileImageUriViaDispatcherMutation] =
		useCreateSetProfileImageUriViaDispatcherMutation({
			onCompleted: (data) => {
				Logger.Success("avatar updated", data);
			},
			onError: (error) => {
				Logger.Error("Error while updating ProfilePic", error);
			},
		});

	const [createSetProfileMetadataViaDispatcherMutation] =
		useCreateSetProfileMetadataViaDispatcherMutation({
			onCompleted: (data) => {
				Logger.Success("metadata updated", data);
				TrackAction(SETTINGS.PROFILE.UPDATE_DETAILS);
			},
			onError: (error) => {
				Logger.Error("Error while updating metadata", error);
			},
		});

	const updateProfileAvatar = async () => {
		const imageCID = await uploadImageToIPFS(avatarBlob);
		await createSetProfileImageUriViaDispatcherMutation({
			variables: {
				request: {
					profileId: currentProfile?.id,
					url: `ipfs://${imageCID}`,
				},
			},
			context: {
				headers: {
					"x-access-token": `Bearer ${accessToken}`,
					"origin": LENSPLAY_SITE,
				},
			},
		});

		TrackAction(SETTINGS.PROFILE.UPDATE_AVATAR);
	};

	const updateProfileMetadata = async () => {
		//get the current cover and populate the local variable
		let coverURI = getRawurl(currentProfile?.coverPicture);

		//if the cover has been updated then upload it to ipfs and update the local variable
		if (coverBlob) {
			coverURI = await uploadImageToIPFS(coverBlob);
			coverURI = coverURI;
			Logger.Success("updated cover");
		}

		//upload the metadata to arweave and get it's txn id
		const metadata = await uploadProfileMetadata(
			currentProfile,
			userData,
			socialLinks,
			coverBlob ? `ipfs://${coverURI}` : coverURI
		);

		await createSetProfileMetadataViaDispatcherMutation({
			variables: {
				request: {
					metadata: `https://arweave.net/${metadata.id}`,
					profileId: currentProfile?.id,
				},
			},
			context: {
				headers: {
					"x-access-token": `Bearer ${accessToken}`,
					"origin": LENSPLAY_SITE,
				},
			},
		});
	};

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
				//update avatar as well as metadata
				if (avatarBlob && canUpload()) {
					Logger.Warn("need to update both");
					const [avatarResult, metadataResult] = await Promise.all([
						updateProfileAvatar(),
						updateProfileMetadata(),
					]);
				}
				//update avatar
				else if (avatarBlob) {
					Logger.Warn("need to update avatar");
					await updateProfileAvatar();
				}
				//update metadata
				else {
					Logger.Warn("need to update metadata");
					await updateProfileMetadata();
				}

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
						<Edit height={24} width={24} />
					</View>
					<Image
						source={{
							uri: cover || getIPFSLink(getRawurl(currentProfile?.coverPicture)),
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
						<Edit height={20} width={20} />
					</View>
					<Avatar
						src={avatar || getRawurl(currentProfile?.picture)}
						height={"100%"}
						width={"100%"}
						opacity={0.9}
					/>
				</Pressable>
				<View style={{ padding: 16 }}>
					<Input
						label="Name"
						value={userData.name}
						placeHolder={currentProfile?.name || formatHandle(currentProfile?.handle)}
						onChange={(e) => {
							setUserData({
								name: e.nativeEvent.text,
								bio: userData.bio,
							});
						}}
					/>
					<TextArea
						label="Bio"
						placeHolder={currentProfile?.bio || "What describes you the best"}
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
						placeHolder={initialSocialLinks.twitter || "@username"}
						onChange={(e) => {
							setSocialLinks({
								...socialLinks,
								twitter: e.nativeEvent.text,
							});
						}}
					/>
					<Input
						label="Instagram"
						placeHolder={initialSocialLinks.instagram || "@username"}
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
						placeHolder={initialSocialLinks.youtube || "Youtube Link"}
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
						placeHolder={initialSocialLinks.website || "https://your-site.com"}
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
