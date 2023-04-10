import { default as React } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { black } from "../../constants/Colors";
import {
  useActivePublication,
  useAuthStore,
  useProfile,
  useToast,
} from "../../store/Store";
import {
  Post,
  PublicationMetadataDisplayTypes,
  useCreateSetProfileMetadataViaDispatcherMutation,
  usePublicationDetailsQuery,
} from "../../types/generated";
import getDifference from "../../utils/getDifference";
import getIPFSLink from "../../utils/getIPFSLink";
import getRawurl from "../../utils/getRawUrl";
import Icon from "../Icon";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import { useNavigation } from "@react-navigation/native";
import TrackAction from "../../utils/Track";
import { SETTINGS } from "../../constants/tracking";
import { ProfileMetaDataV1nput } from "../../types";
import { v4 as uuidV4 } from "uuid";
import uploadToArweave from "../../utils/uploadToArweave";

export function PinnedPublicationSheet({ pubId }: { pubId: string }) {
  const toast = useToast();
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();

  const [
    createSetProfileMetadataViaDispatcherMutation,
  ] = useCreateSetProfileMetadataViaDispatcherMutation({
    onCompleted: (data) => {
      toast.success("pinned video removed successfully");
      TrackAction(SETTINGS.PROFILE.UPDATE_DETAILS);
    },
    onError: () => {
      toast.error("Some error occured please try again");
    },
  });

  const RemovepinPublication = async () => {
    const attr = currentProfile?.attributes;
    const isAlreadyPinned = attr?.find(
      (attr) =>
        attr.traitType === "pinnedPublicationId" ||
        attr.key === "pinnedPublicationId"
    );

    if (isAlreadyPinned) {
      const index = attr?.indexOf(isAlreadyPinned);
      attr?.splice(index!, 1);
    }

    const newMetaData: ProfileMetaDataV1nput = {
      version: "1.0.0",
      metadata_id: uuidV4(),
      name: currentProfile?.name || "",
      bio: currentProfile?.bio || "",
      cover_picture: getRawurl(currentProfile?.coverPicture),
      attributes: attr,
    };

    const hash = await uploadToArweave(newMetaData);
    createSetProfileMetadataViaDispatcherMutation({
      variables: {
        request: {
          metadata: `ar://${hash}`,
          profileId: currentProfile?.id,
        },
      },
      context: {
        headers: {
          "x-access-token": `Bearer ${accessToken}`,
        },
      },
    });
  };

  return <View></View>;
}

export default function PinnedPublication({ pubId }: { pubId: string }) {
  const activeProfile = useProfile();
  const { accessToken } = useAuthStore();
  const navigation = useNavigation();
  const { setActivePublication } = useActivePublication();

  const { data, loading, error } = usePublicationDetailsQuery({
    variables: {
      request: {
        publicationId: pubId,
      },
      reactionRequest: {
        profileId: activeProfile?.currentProfile?.id,
      },
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });

  if (error) return <></>;
  if (data) {
    return (
      <Pressable
        android_ripple={{
          color: black[400],
        }}
        style={{
          flexDirection: "row",
          maxWidth: Dimensions.get("window").width,
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
        onPress={() => {
          setActivePublication(data?.publication as Post);
          navigation.navigate("VideoPage");
        }}
      >
        <View>
          <Image
            source={{
              uri: getIPFSLink(getRawurl(data?.publication?.metadata?.cover)),
            }}
            style={{
              width: 160,
              height: 100,
              borderRadius: 8,
            }}
          />
        </View>
        <View
          style={{
            height: "100%",
            width: "50%",
            marginLeft: 8,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "80%",
            }}
          >
            <Heading
              title={data?.publication?.metadata?.name}
              style={{ color: "white", fontSize: 16, fontWeight: "500" }}
              numberOfLines={3}
            />
            <View
              style={{
                marginTop: 4,
              }}
            >
              <StyledText
                title={
                  data?.publication?.metadata?.content ||
                  data?.publication?.metadata?.description
                }
                numberOfLines={1}
                style={{ color: "gray", fontSize: 12 }}
              />
            </View>
            <View
              style={{
                marginTop: 2,
              }}
            >
              <StyledText
                title={getDifference(data?.publication?.createdAt)}
                style={{ color: "gray", fontSize: 12 }}
              />
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              // sheetRef?.current?.snapToIndex(0);
            }}
            style={{
              padding: 4,
              height: "30%",
            }}
          >
            <Icon name="more" size={16} />
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  }
  return <></>;
}
