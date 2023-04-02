import React, { useState } from "react";
import { RootStackScreenProps } from "../../types/navigation/types";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";
import Heading from "../../components/UI/Heading";
import StyledText from "../../components/UI/StyledText";
import { dark_primary } from "../../constants/Colors";
import Button from "../../components/UI/Button";
import {
  MetadataAttributeInput,
  PublicationMainFocus,
  PublicationMetadataDisplayTypes,
  PublicationMetadataMediaInput,
  PublicationMetadataV2Input,
} from "../../types/generated";
import { v4 as uuidV4 } from "uuid";
import { useUploadStore } from "../../store/UploadStore";
import { APP_ID, LENSPLAY_SITE } from "../../constants";
import { useProfile } from "../../store/Store";
import uploadToArweave from "../../utils/uploadToArweave";
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
}: RootStackScreenProps<"AddDetails">) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const uploadStore = useUploadStore();
  const { currentProfile } = useProfile();

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
  ];
  const media: Array<PublicationMetadataMediaInput> = [
    {
      item: "IPFS_LINK",
      type: "VIDEO_TYPE_UTIL_IWILL_DO",
      cover: "COVER_IMAGE_UTIL",
    },
  ];

  const metadata: PublicationMetadataV2Input = {
    version: "2.0.0",
    metadata_id: uuidV4(),
    description: uploadStore.description,
    content: `${uploadStore.title}\n\n${uploadStore.description}`,
    locale: "en-US",
    tags: [],
    mainContentFocus: PublicationMainFocus.Video,
    external_url: `${LENSPLAY_SITE}/channel/${currentProfile?.handle}`,
    animation_url: "IPFS_LINK_YAHA",
    image: "COVER_IMAGE_KA_LINK_YAHA",
    imageMimeType: "IMAHE_TYPE_KA_UTIL_ME ADD KRDUNGA",
    name: uploadStore.title,
    attributes,
    media,
    appId: APP_ID,
  };

  const handleUpload = async () => {
    try {
      const metadataUri = await uploadToArweave(metadata);
      console.log(metadataUri);
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
          onPress={handleUpload}
        />
      </View>
    </SafeAreaView>
  );
}
