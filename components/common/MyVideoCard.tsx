import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  Share,
  TouchableOpacity,
  View,
} from "react-native";
import { v4 as uuidV4 } from "uuid";
import { black } from "../../constants/Colors";
import { PUBLICATION } from "../../constants/tracking";
import usePinStore from "../../store/pinStore";
import {
  useActivePublication,
  useAuthStore,
  useProfile,
  useToast,
} from "../../store/Store";
import { ProfileMetaDataV1nput } from "../../types";
import {
  Attribute,
  Mirror,
  Post,
  PublicationMetadataDisplayTypes,
  Scalars,
  useCreateSetProfileMetadataViaDispatcherMutation,
} from "../../types/generated";
import getDifference from "../../utils/getDifference";
import getIPFSLink from "../../utils/getIPFSLink";
import getRawurl from "../../utils/getRawUrl";
import TrackAction from "../../utils/Track";
import uploadToArweave from "../../utils/uploadToArweave";
import Sheet from "../Bottom";
import Icon from "../Icon";
import Heading from "../UI/Heading";
import Ripple from "../UI/Ripple";
import StyledText from "../UI/StyledText";
import DeleteVideo from "../VIdeo/DeleteVideo";
import { Image } from "expo-image";
import getPlaceHolderImage from "../../utils/getPlaceHolder";
import getImageProxyURL from "../../utils/getImageProxyURL";

type MyVideoCardProps = {
  publication: Mirror | Post;
  id: string;
  sheetRef?: React.RefObject<BottomSheetMethods>;
  setPubId?: (pubId: Scalars["InternalPublicationId"]) => void;
};

export default function MyVideoCard({
  publication,
  id,
  sheetRef,
  setPubId,
}: MyVideoCardProps) {
  const navigation = useNavigation();
  const { setActivePublication } = useActivePublication();

  return (
    <Pressable
      key={id}
      android_ripple={{
        color: black[400],
      }}
      style={{
        flexDirection: "row",
        maxWidth: Dimensions.get("window").width,
        padding: 8,
      }}
      onPress={() => {
        setActivePublication(publication);
        navigation.navigate("VideoPage");
      }}
    >
      <View>
        <Image
          placeholder={getPlaceHolderImage()}
          contentFit="cover"
          transition={500}
          source={{
            uri: getImageProxyURL({
              formattedLink: getIPFSLink(
                getRawurl(publication?.metadata?.cover)
              ),
            }),
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
          width: "55%",
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
            title={publication?.metadata?.name}
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
                publication?.metadata?.content ||
                publication?.metadata?.description
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
              title={getDifference(publication?.createdAt)}
              style={{ color: "gray", fontSize: 12 }}
            />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            if (setPubId) {
              setPubId(publication.id);
            }
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
  );
}

export type SheetProps = {
  sheetRef: React.RefObject<BottomSheetMethods>;
  pubId: Scalars["InternalPublicationId"];
  route: any;
};

export const VideoActionSheet = ({ sheetRef, pubId, route }: SheetProps) => {
  const toast = useToast();
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();
  const deleteRef = React.useRef<BottomSheetMethods>(null);
  const pinStore = usePinStore();
  const [
    createSetProfileMetadataViaDispatcherMutation,
  ] = useCreateSetProfileMetadataViaDispatcherMutation({
    onCompleted: () => {
      toast.success("Video pinned successfully !");
      TrackAction(PUBLICATION.PIN_PUBLICATION);
    },
    onError: () => {
      toast.error("Some error occured please try again");
    },
  });

  const pinPublication = async () => {
    const attr = currentProfile?.attributes;
    let attrs;
    const isAlreadyPinned = attr?.find(
      (attr) =>
        attr.traitType === "pinnedPublicationId" ||
        attr.key === "pinnedPublicationId"
    );
    if (!isAlreadyPinned) {
      const newAttribute = {
        __typename: "Attribute",
        displayType: PublicationMetadataDisplayTypes.String,
        traitType: "pinnedPublicationId",
        key: "pinnedPublicationId",
        value: pubId,
      };
      attrs = [...attr!, newAttribute];
    }
    if (isAlreadyPinned) {
      isAlreadyPinned.value = pubId;
    }

    const newMetaData: ProfileMetaDataV1nput = {
      version: "1.0.0",
      metadata_id: uuidV4(),
      name: currentProfile?.name || "",
      bio: currentProfile?.bio || "",
      cover_picture: getRawurl(currentProfile?.coverPicture),
      attributes: isAlreadyPinned ? attr : (attrs as Attribute[]),
    };
    toast.success("Video pin submitted");
    pinStore.setHasPinned(true);
    pinStore.setPinnedPubId(pubId);
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

  const actionList = [
    {
      name: "Pin this video to your channel",
      icon: "success",
      onPress: (pubid: Scalars["InternalPublicationId"]) => {
        pinPublication();
      },
    },
    {
      name: "Share",
      icon: "share",
      onPress: (pubid: Scalars["InternalPublicationId"]) => {
        Share.share({
          message: `Let's watch this amazing video on LensPlay, Here's link, https://lensplay.xyz/watch/${pubid}`,
          title: "Watch video on LensPlay",
        });
      },
    },
    {
      name: "Delete",
      icon: "delete",
      onPress: (pubid: Scalars["InternalPublicationId"]) => {
        sheetRef.current?.close();
        deleteRef.current?.snapToIndex(0);
      },
    },
  ];

  const routename = route.params.title;
  const isOwner = route.params.owner;

  let newListItem;
  if (routename.includes("collects") || routename.includes("mirror")) {
    newListItem = [actionList[1], actionList[2]];
  } else {
    newListItem = actionList;
  }

  if (!isOwner) {
    newListItem = [actionList[1]];
  }

  const getSnapPoint = React.useCallback(() => {
    if (!route.params.owner) {

      return [90];
    } else if (routename.includes("collects") || routename.includes("mirror")) {

      return [150];
    } else {
      
      return [220];
    }
  }, []);

  return (
    <>
      <Sheet
        ref={sheetRef}
        snapPoints={getSnapPoint()}
        enablePanDownToClose={true}
        enableOverDrag={true}
        bottomInset={32}
        style={{
          marginHorizontal: 8,
        }}
        detached={true}
        children={
          <FlatList
            data={newListItem}
            renderItem={({ item }) => {
              return (
                <Ripple
                  onTap={() => {
                    item.onPress(pubId);
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
                    <Icon name={item.icon} color={"white"} />
                    <StyledText
                      title={item.name}
                      style={{
                        fontSize: 16,
                        marginHorizontal: 8,
                        color: "white",
                      }}
                    />
                  </View>
                </Ripple>
              );
            }}
          />
        }
      />
      <DeleteVideo sheetRef={deleteRef} pubId={pubId} />
    </>
  );
};