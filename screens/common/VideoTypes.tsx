import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black } from "constants/Colors";
import { APP_ID, LENSPLAY_SITE } from "constants/index";
import {
	MetadataAttributeInput,
	Post,
	PublicationMainFocus,
	PublicationMetadataDisplayTypes,
	PublicationMetadataMediaInput,
	PublicationMetadataV2Input,
	PublicationTypes,
	useCreatePostViaDispatcherMutation,
	useProfilePostsQuery,
} from "customTypes/generated";
import { RootStackScreenProps } from "customTypes/navigation";
import React, { useState } from "react";
import { Platform, Pressable, SafeAreaView, ScrollView, View } from "react-native";
import { useAuthStore, useProfile, useToast } from "store/Store";
import { useUploadStore } from "store/UploadStore";
import getCollectModule from "utils/getCollectModule";
import getImageBlobFromUri from "utils/getImageBlobFromUri";
import getReferenceModule from "utils/getReferenceModule";
import Logger from "utils/logger";
import uploadImageToIPFS from "utils/uploadImageToIPFS";
import uploadToArweave from "utils/uploadToArweave";
import getFileMimeType from "utils/video/getFileType";
import getUploadURLForLivePeer from "utils/video/getUploadURLForLivepeer";
import uploadToTus, { TusUploadRequestOptions } from "utils/video/uploadToTUS";
import { v4 as uuidV4 } from "uuid";

const Types: string[] = [
	"Arts & Entertainment",
	"Business",
	"Technology",
	"Health & Fitness",
	"Food & Drink",
	"Hobbies & Interests",
	"News",
	"Family & Parenting",
	"Law, Government and Politics",
	"Lens",
	"Education",
	"Career",
	"Home & Garden",
	"Crypto",
];

export default function VideoTypes({ navigation }: RootStackScreenProps<"VideoTypes">) {
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const { setUploadingStatus, setUploadProgress, setClearStore } = useUploadStore();
	const toast = useToast();
	const uploadStore = useUploadStore();
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();

	function Tag({ name }: { name: string }) {
		return (
			<View
				style={{
					paddingHorizontal: 16,
					paddingVertical: 8,
					marginVertical: 4,
					marginRight: 4,
					borderRadius: 50,
					backgroundColor: `${selectedTags.includes(name) ? "white" : black[500]}`,
				}}
			>
				<StyledText
					title={name}
					style={{
						fontSize: 16,
						color: `${selectedTags.includes(name) ? "black" : "white"}`,
						fontWeight: "500",
					}}
				/>
			</View>
		);
	}

	const QueryRequest = {
		profileId: currentProfile?.id,
		publicationTypes: [PublicationTypes.Post],
		metadata: {
			mainContentFocus: [PublicationMainFocus.Video],
		},
		sources: ["lenstube"],
		limit: 50,
	};

	const {
		data: AllVideosData,
		error: AllVideoError,
		loading: AllVideosLoading,
	} = useProfilePostsQuery({
		variables: {
			request: QueryRequest,
			reactionRequest: {
				profileId: currentProfile?.id,
			},
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});

	const [createPost, { data, error }] = useCreatePostViaDispatcherMutation({
		onCompleted: () => {
			toast.success("Video uploaded successfully");
			setClearStore();
		},
		onError(error, clientOptions?) {
			toast.error("Something went wrong !");
		},
	});

	const uploadViaTus = async () => {
		navigation.navigate("UploadIndicator");
		return;

		toast.success("Upload started");
		if (selectedTags.length === 0) return toast.error("Please select atleast tag");
		try {
			// navigation.replace("YourVideos", {
			//   title: "Your Videos",
			//   videos: AllVideosData?.publications?.items as Post[],
			// });
			setUploadingStatus("UPLOADING");
			const { tusEndpoint, assetId } = await getUploadURLForLivePeer();

			const localVideoBlob = await getImageBlobFromUri(uploadStore.videoURL!);

			const uploadRequest: TusUploadRequestOptions = {
				videoBlob: localVideoBlob!,
				tusEndPoint: tusEndpoint,
				onSucessCallBack: () => {
					handleUpload(assetId);
				},
				onError: function (): void {
					toast.error("Something went wrong");
				},
				onProgress: function (_sentBytes, _totalBytes): void {
					const percentage = ((_sentBytes / _totalBytes) * 100).toFixed(2);
					setUploadProgress(parseFloat(percentage));
				},
			};
			uploadToTus(uploadRequest);
		} catch (error) {
			if (error instanceof Error) {
				// console.log(error);
			}
		}
	};

	const handleUpload = async (assetId: string) => {
		try {
			setUploadingStatus("PROCCESSING");
			const imageBlob = await getImageBlobFromUri(uploadStore.coverURL!);

			const coverImageURI = await uploadImageToIPFS(imageBlob);
			console.log("coverrrr ", coverImageURI);

			const videoBlob = await getImageBlobFromUri(uploadStore.videoURL!);
			const ipfsVideoUrl = await uploadImageToIPFS(videoBlob);
			console.log("videourl ipfs ", ipfsVideoUrl);

			const attributes: MetadataAttributeInput[] = [
				{
					displayType: PublicationMetadataDisplayTypes.String,
					traitType: "handle",
					value: `${currentProfile?.handle}`,
				},
				{
					displayType: PublicationMetadataDisplayTypes.String,
					traitType: "app",
					value: APP_ID,
				},
				// {
				//   displayType: PublicationMetadataDisplayTypes.String,
				//   traitType: "assetId",
				//   value: assetId,
				// },
				{
					displayType: PublicationMetadataDisplayTypes.String,
					traitType: "durationInSeconds",
					value: Math.floor(uploadStore.duration! / 1000)?.toString()!,
				},
			];
			const media: Array<PublicationMetadataMediaInput> = [
				{
					item: `ipfs://${ipfsVideoUrl}`,
					type: `video/${getFileMimeType(uploadStore.videoURL!)}`,
					cover: `ipfs://${coverImageURI}`,
				},
			];

			const metadata: PublicationMetadataV2Input = {
				version: "2.0.0",
				metadata_id: uuidV4(),
				description: uploadStore.description,
				content: `${uploadStore.title}\n\n${uploadStore.description}`,
				locale: "en-US",
				tags: selectedTags ? selectedTags : [],
				mainContentFocus: PublicationMainFocus.Video,
				external_url: `${LENSPLAY_SITE}/channel/${currentProfile?.handle}`,
				animation_url: `ipfs://${ipfsVideoUrl}`,
				image: `ipfs://${coverImageURI}`,
				imageMimeType: `image/${getFileMimeType(uploadStore.coverURL!)}`,
				name: uploadStore.title,
				attributes,
				media,
				appId: APP_ID,
			};
			const metadataUri = await uploadToArweave(metadata);
			createPost({
				variables: {
					request: {
						collectModule: getCollectModule(),
						contentURI: `ar://${metadataUri}`,
						profileId: currentProfile?.id,
						referenceModule: getReferenceModule(uploadStore.referenceModule),
					},
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
						"origin": LENSPLAY_SITE,
					},
				},
			});
			Logger.Log("metadata he bhai: ", metadataUri);
		} catch (error) {
			console.log(error);
		}
	};

	Logger.Warn("Collect MOdule is ", getCollectModule(uploadStore.collectModule));

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
		>
			<View
				style={{
					paddingHorizontal: 16,
					marginVertical: 24,
					alignItems: "center",
				}}
			>
				<Heading
					title={"Select your video content types"}
					style={{
						color: "white",
						fontSize: 20,
						fontWeight: "600",
						textAlign: "center",
					}}
				/>
				<StyledText
					title={"You can select max five types"}
					style={{
						color: "gray",
						fontSize: 14,
						fontWeight: "600",
						textAlign: "center",
					}}
				/>
			</View>
			<Pressable
				style={{
					alignItems: "flex-end",
					justifyContent: "flex-end",
					width: "100%",
					paddingHorizontal: 16,
					marginTop: 24,
				}}
				onPress={() => {
					setSelectedTags([]);
				}}
			>
				<StyledText
					title={"CLEAR ALL"}
					style={{
						fontSize: 12,
						color: "gray",
						fontWeight: "600",
					}}
				/>
			</Pressable>
			<ScrollView
				style={{
					padding: 16,
				}}
				contentContainerStyle={{
					flexDirection: "row",
					flexWrap: "wrap",
					alignItems: "center",
				}}
			>
				{Types.map((type) => {
					return (
						<Pressable
							key={type}
							onPress={() => {
								if (selectedTags.includes(type)) {
									const index = selectedTags.indexOf(type);
									selectedTags.splice(index, 1);
									setSelectedTags([...selectedTags]);
									return;
								}
								if (selectedTags.length === 5) return;
								setSelectedTags([...selectedTags, type]);
							}}
						>
							<Tag name={type} />
						</Pressable>
					);
				})}
			</ScrollView>
			<View
				style={{
					position: "absolute",
					bottom: Platform.OS === "ios" ? 48 : 16,
					paddingHorizontal: 16,
					width: "100%",
				}}
			>
				<Button
					title={"Upload"}
					width={"100%"}
					py={12}
					textStyle={{
						fontSize: 16,
						fontWeight: "600",
					}}
					onPress={uploadViaTus}
				/>
			</View>
		</SafeAreaView>
	);
}
