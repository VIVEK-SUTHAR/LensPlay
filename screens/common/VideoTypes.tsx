import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { v4 as uuidV4 } from "uuid";
import Button from "../../components/UI/Button";
import Heading from "../../components/UI/Heading";
import StyledText from "../../components/UI/StyledText";
import { APP_ID, LENSPLAY_SITE } from "../../constants";
import { dark_primary } from "../../constants/Colors";
import { useAuthStore, useProfile, useToast } from "../../store/Store";
import { useUploadStore } from "../../store/UploadStore";
import {
  MetadataAttributeInput,
  PublicationMainFocus,
  PublicationMetadataDisplayTypes,
  PublicationMetadataMediaInput,
  PublicationMetadataV2Input,
  useCreatePostViaDispatcherMutation,
} from "../../types/generated";
import { RootStackScreenProps } from "../../types/navigation/types";
import { ToastType } from "../../types/Store";
import getCollectModule from "../../utils/getCollectModule";
import getImageBlobFromUri from "../../utils/getImageBlobFromUri";
import getReferenceModule from "../../utils/getReferenceModule";
import uploadImageToIPFS from "../../utils/uploadImageToIPFS";
import uploadToArweave from "../../utils/uploadToArweave";
import getFileMimeType from "../../utils/video/getFileType";
import getUploadURLForLivePeer from "../../utils/video/getUploadURLForLivepeer";
import uploadToTus, {
  TusUploadRequestOptions,
} from "../../utils/video/uploadToTUS";
const Types: string[] = [
  "Arts & Entertainment",
  "Business",
  "Technology",
  "Health & Fitness",
  "Food & Drink",
  "Hobbies & Interests",
  "News",
  "Family & Parenting",
  "Education",
  "Law, Government and Politics",
  "Career",
  "Home & Garden",
  "Crypto",
  "Lens",
  "NSFW",
];

function Tag({ name }: { name: string }) {
  return (
    <View
      style={{
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: "#1c1c1c",
        marginVertical: 4,
        marginRight: 8,
        borderRadius: 4,
        backgroundColor: dark_primary,
      }}
    >
      <StyledText
        title={name}
        style={{
          fontSize: 14,
          color: "white",
        }}
      />
    </View>
  );
}

export default function VideoTypes({
  navigation,
}: RootStackScreenProps<"VideoTypes">) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const uploadStore = useUploadStore();
  const { currentProfile } = useProfile();

  const [content, setContent] = useState("GM!");

  const [createPost, { data, error }] = useCreatePostViaDispatcherMutation({
    onCompleted: () => {
      setShow(true);
      toast.success("Post Submitted !");
    },
    onError(error, clientOptions?) {
      toast.error("Something went wrong !");
    },
  });

  const [show, setShow] = useState(false);

  useEffect(() => {
    Alert.alert(
      "clicking upload will trigger a sample text post,",
      `Video upload is ready,next commit ,And Sample text is gm,
      `
    );
  }, []);

  const toast = useToast();
  const { accessToken } = useAuthStore();
  const testSamplePost = async () => {
    try {
      const metadata: PublicationMetadataV2Input = {
        version: "2.0.0",
        metadata_id: "dd9e3adf-ffd6-40f6-aa3a-c41fc9ba9fdd",
        content: content,
        external_url: `https://testnet.lenster.xyz/u/${currentProfile?.handle}`,
        image: null,
        imageMimeType: null,
        name: `Post by ${currentProfile?.handle}`,
        tags: [],
        animation_url: null,
        mainContentFocus: PublicationMainFocus.TextOnly,
        contentWarning: null,
        attributes: [
          {
            traitType: "type",
            displayType: PublicationMetadataDisplayTypes.String,
            value: "text_only",
          },
        ],
        media: [],
        locale: "en-US",
        appId: "LensPlay",
      };
      console.log("Called");
      const reqMetadataUri = await uploadToArweave(metadata);
      const metadataUri = `ar://${reqMetadataUri}`;
      createPost({
        variables: {
          request: {
            collectModule: getCollectModule(uploadStore.collectModule),
            contentURI: metadataUri,
            profileId: currentProfile?.id,
            referenceModule: getReferenceModule(uploadStore.referenceModule),
          },
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${accessToken}`,
          },
        },
      });
    } catch (error) {}
  };

  const prepareRequest = () => {
    const data = getCollectModule(uploadStore.collectModule);
    console.log("Collect Module", data);
    const ref = getReferenceModule(uploadStore.referenceModule);
    console.log("Reference Module", ref);
  };

  const uploadViaTus = async () => {
    try {
      const { tusEndpoint, assetId } = await getUploadURLForLivePeer();

      const localVideoBlob = await getImageBlobFromUri(uploadStore.videoURL!);

      const uploadRequest: TusUploadRequestOptions = {
        videoBlob: localVideoBlob!,
        tusEndPoint: tusEndpoint,
        onSucessCallBack: () => {
          //This will be fired when upload is finished succesfully
          handleUpload(assetId);
        },
        onError: function (): void {
          //Handle Errors Here
        },
        onProgress: function (_sentBytes, _totalBytes): void {
          //SET LOGIC HERE TO UPDATE UI ACCORDINGLY
        },
      };
      uploadToTus(uploadRequest);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };

  const handleUpload = async (assetId: string) => {
    try {
      console.log(assetId);

      const imageBlob = await getImageBlobFromUri(uploadStore.coverURL!);

      const coverImageURI = await uploadImageToIPFS(imageBlob);
      console.log("Cover uploaded", coverImageURI);

      const videoBlob = await getImageBlobFromUri(uploadStore.videoURL!);
      const ipfsVideoUrl = await uploadImageToIPFS(videoBlob);
      console.log("Video uploaded to ipfs", ipfsVideoUrl);

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
        {
          displayType: PublicationMetadataDisplayTypes.String,
          traitType: "assetId",
          value: assetId,
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
        imageMimeType: getFileMimeType(uploadStore.coverURL!),
        name: uploadStore.title,
        attributes,
        media,
        appId: APP_ID,
      };
      const metadataUri = await uploadToArweave(metadata);
      console.log("Metadata uploaded to arweave", metadataUri);
      console.log("Collect Module of Post", uploadStore.collectModule);
      console.log("Reference Module of Post", uploadStore.referenceModule);
    } catch (error) {
      console.log(error);
    }
  };

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
          marginTop: 24,
        }}
      >
        <Heading
          title={"Please select video type"}
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "600",
          }}
        />
        <StyledText
          title={"Max 5 type"}
          style={{
            color: "gray",
            fontSize: 14,
            fontWeight: "600",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 16,
            height: 120,
          }}
        >
          {selectedTags.map((type) => (
            <Pressable
              key={type}
              onPress={() => {
                const index = selectedTags.indexOf(type);
                selectedTags.splice(index, 1);
              }}
            >
              <Tag name={type} />
            </Pressable>
          ))}
        </View>
      </View>
      <Pressable
        style={{
          alignItems: "flex-end",
          justifyContent: "flex-end",
          width: "100%",
          borderBottomWidth: 1,
          borderBottomColor: "gray",
          padding: 16,
          marginBottom: 24,
        }}
        onPress={() => {
          setSelectedTags([]);
        }}
      >
        <StyledText
          title={"CLEAR"}
          style={{
            fontSize: 12,
            color: "gray",
            fontWeight: "600",
          }}
        />
      </Pressable>
      <ScrollView
        style={{
          paddingHorizontal: 16,
        }}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {Types.map((type) => {
          if (!selectedTags.includes(type)) {
            return (
              <Pressable
                key={type}
                onPress={() => {
                  if (selectedTags.length === 5) {
                    return;
                  }
                  setSelectedTags([...selectedTags, type]);
                }}
              >
                <Tag name={type} />
              </Pressable>
            );
          }
        })}
      </ScrollView>
      {show && (
        <View
          style={{
            position: "absolute",
            bottom: 100,
            paddingHorizontal: 16,
            width: "100%",
          }}
        >
          <Button
            title={"Show Post"}
            width={"100%"}
            py={12}
            my={16}
            textStyle={{
              fontSize: 16,
              fontWeight: "600",
            }}
            onPress={() => {
              Linking.openURL(
                `https://testnet.lenster.xyz/u/${currentProfile?.handle}`
              );
            }}
          />
        </View>
      )}
      <View
        style={{
          position: "absolute",
          bottom: 16,
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
          onPress={testSamplePost}
        />
      </View>
    </SafeAreaView>
  );
}
