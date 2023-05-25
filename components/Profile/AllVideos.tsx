import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React from "react";
import { Share, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { v4 as uuidV4 } from "uuid";
import { PUBLICATION } from "../../constants/tracking";
import {
  useAuthStore,
  useProfile,
  useThemeStore,
  useToast,
} from "../../store/Store";
import usePinStore from "../../store/pinStore";
import { ProfileMetaDataV1nput } from "../../types";
import {
  Attribute,
  Post,
  PublicationMainFocus,
  PublicationMetadataDisplayTypes,
  PublicationTypes,
  Scalars,
  useCreateSetProfileMetadataViaDispatcherMutation,
  useProfilePostsQuery,
} from "../../types/generated";
import TrackAction from "../../utils/Track";
import getRawurl from "../../utils/getRawUrl";
import uploadToArweave from "../../utils/uploadToArweave";
import Sheet from "../Bottom";
import Icon from "../Icon";
import Ripple from "../UI/Ripple";
import StyledText from "../UI/StyledText";
import DeleteVideo from "../VIdeo/DeleteVideo";
import MyVideoCard, { SheetProps, actionListType } from "../common/MyVideoCard";
import { black } from "../../constants/Colors";

const AllVideos = () => {
  const { accessToken } = useAuthStore();
  const { PRIMARY } = useThemeStore();
  const { currentProfile } = useProfile();
  const AllVideoSheetRef = React.useRef<BottomSheetMethods>(null);

  const QueryRequest = {
    profileId: currentProfile?.id,
    publicationTypes: [PublicationTypes.Post],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: ["lenstube", "lensplay"],
  };

  const { data, error, loading } = useProfilePostsQuery({
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

  const AllVideos = data?.publications?.items;

  const [pubId, setPubId] = React.useState("");

  const handlePubId = React.useCallback((pubId: string) => {
    setPubId(pubId);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingVertical: 8,
      }}
    >
      <FlatList
        data={AllVideos as Post[]}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={NoVideosFound}
        refreshControl={
          <RefreshControl
            refreshing={false}
            colors={[PRIMARY]}
            progressBackgroundColor={"black"}
          />
        }
        renderItem={({ item }) => (
          <MyVideoCard
            publication={item}
            id={item.id}
            sheetRef={AllVideoSheetRef}
            setPubId={handlePubId}
          />
        )}
      />
      <AllVideoSheet sheetRef={AllVideoSheetRef} pubId={pubId} />
    </View>
  );
};

export const AllVideoSheet = ({ sheetRef, pubId }: SheetProps) => {
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

  const actionList: actionListType[] = [
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

  return (
    <>
      <Sheet
        ref={sheetRef}
        snapPoints={[220]}
        enablePanDownToClose={true}
        enableOverDrag={true}
        bottomInset={32}
        style={{
          marginHorizontal: 8,
        }}
        detached={true}
        children={
          <FlatList
            data={actionList}
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

const _NoVideosFound = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 32,
        paddingHorizontal: 16,
      }}
    >
      <StyledText
        title={"No videos found"}
        style={{
          color: black[100],
          fontSize: 16,
          fontWeight: "500",
        }}
      />
    </View>
  );
};

export const NoVideosFound = React.memo(_NoVideosFound);

export default React.memo(AllVideos);
