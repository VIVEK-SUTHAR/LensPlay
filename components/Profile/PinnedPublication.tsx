import { useNavigation } from "@react-navigation/native";
import { default as React, useEffect } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { v4 as uuidV4 } from "uuid";
import { black, white } from "../../constants/Colors";
import {
  useActivePublication,
  useAuthStore,
  useProfile,
  useToast,
} from "../../store/Store";
import usePinStore from "../../store/pinStore";
import { ProfileMetaDataV1nput } from "../../types";
import {
  Attribute,
  Post,
  Profile,
  useCreateSetProfileMetadataViaDispatcherMutation,
  usePublicationDetailsLazyQuery,
} from "../../types/generated";
import getDifference from "../../utils/getDifference";
import getIPFSLink from "../../utils/getIPFSLink";
import getRawurl from "../../utils/getRawUrl";
import uploadToArweave from "../../utils/uploadToArweave";
import Sheet from "../Bottom";
import Icon from "../Icon";
import Heading from "../UI/Heading";
import Ripple from "../UI/Ripple";
import StyledText from "../UI/StyledText";
import { SheetProps } from "../common/MyVideoCard";
import TrackAction from "../../utils/Track";
import { PUBLICATION } from "../../constants/tracking";

export function UnPinSheet({ sheetRef }: Pick<SheetProps, "sheetRef">) {
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();
  const { setHasPinned } = usePinStore();
  const toast = useToast();

  const [
    createSetProfileMetadataViaDispatcherMutation,
  ] = useCreateSetProfileMetadataViaDispatcherMutation({
    onCompleted: () => {
      setHasPinned(false);
      toast.success("video unpined successfully");
      TrackAction(PUBLICATION.PIN_PUBLICATION);
    },
    onError: () => {
      toast.error("Some error occured please try again");
    },
  });

  const RemovepinPublication = async () => {
    let currentAttributes = currentProfile?.attributes;
    let attr = [...currentAttributes!];
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

  return (
    <Sheet
      ref={sheetRef}
      snapPoints={[100]}
      enablePanDownToClose={true}
      enableOverDrag={true}
      bottomInset={32}
      style={{
        marginHorizontal: 8,
      }}
      detached={true}
      backgroundStyle={{
        backgroundColor: black[600]
      }}
      >
        <Ripple
          onTap={() => {
            RemovepinPublication();
            sheetRef?.current?.close();
          }}
        >
          <View
            style={{
              width: "100%",
              height: "auto",
              paddingVertical: 16,
              paddingHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon name={"unpin"} color={"white"} />
            <StyledText
              title={"Remove pin"}
              style={{
                fontSize: 16,
                marginHorizontal: 8,
                color: "white",
              }}
            />
          </View>
        </Ripple>
      </Sheet>
  );
}

export default function PinnedPublication({
  sheetRef,
  profile,
}: {
  sheetRef: Pick<SheetProps, "sheetRef">;
  profile: Profile;
}) {
  const activeProfile = useProfile();
  const { accessToken } = useAuthStore();
  const pinStore = usePinStore();
  const navigation = useNavigation();
  const { setActivePublication } = useActivePublication();

  useEffect(() => {
    getPinnedPublication();
  }, [pinStore.publicationId]);

  const getPinnedPublication = () => {
    const attributes = profile?.attributes;

    const pinnedPublication = attributes?.find(
      (attr: Attribute) =>
        attr.traitType === "pinnedPublicationId" ||
        attr.key === "pinnedPublicationId"
    );
    if (pinnedPublication) {
      pinStore.setHasPinned(true);
      pinStore.setPinnedPubId(pinnedPublication.value);
      fetchPinnedPublication({
        variables: {
          request: {
            publicationId: pinnedPublication.value,
          },
          reactionRequest: {
            profileId: activeProfile?.currentProfile?.id,
          },
        },
      });
    }
  };

  const [
    fetchPinnedPublication,
    { data, loading, error },
  ] = usePublicationDetailsLazyQuery({
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });

  if (error) return <></>;
  if (data && pinStore.hasPinned) {
    return (
      <View
        style={{
          marginTop: 24,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon name="pin" size={12} color={white[200]} />
          <StyledText
            title="Pinned video"
            style={{
              color: white[200],
              fontSize: 12,
              marginLeft: 8,
            }}
          />
        </View>
        <Pressable
          style={{
            flexDirection: "row",
            maxWidth: Dimensions.get("window").width,
            marginTop: 16,
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
                //@ts-ignore Ref as it may be undefined
                sheetRef?.current?.snapToIndex(0);
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
      </View>
    );
  }
  return null;
}
