import React from "react";
import { FlatList, RefreshControl, Share, View } from "react-native";
import { useAuthStore, useProfile, useThemeStore } from "../../store/Store";
import {
  Mirror,
  PublicationMainFocus,
  PublicationTypes,
  Scalars,
  useProfileMirrorsQuery,
} from "../../types/generated";
import MyVideoCard, { SheetProps, actionListType } from "../common/MyVideoCard";
import Sheet from "../Bottom";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Ripple from "../UI/Ripple";
import StyledText from "../UI/StyledText";
import Icon from "../Icon";
import DeleteVideo from "../VIdeo/DeleteVideo";
import { NoVideosFound } from "./AllVideos";
import { SOURCES } from "../../constants";

type MirroredVideosProps = {
  channelId?: string;
};

const MirroredVideos: React.FC<MirroredVideosProps> = ({ channelId }) => {
  const { accessToken } = useAuthStore();
  const { PRIMARY } = useThemeStore();
  const { currentProfile } = useProfile();
  const MirroredVideoSheetRef = React.useRef<BottomSheetMethods>(null);

  const QueryRequest = {
    profileId: channelId ? channelId : currentProfile?.id,
    publicationTypes: [PublicationTypes.Mirror],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: SOURCES,
    limit: 10,
  };

  const { data, error, loading } = useProfileMirrorsQuery({
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

  const AllMirrorVideos = data?.publications?.items;

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
        data={AllMirrorVideos as Mirror[]}
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
            sheetRef={MirroredVideoSheetRef}
            setPubId={handlePubId}
          />
        )}
      />
      <MirroredVideoSheet sheetRef={MirroredVideoSheetRef} pubId={pubId} />
    </View>
  );
};

export const MirroredVideoSheet = ({ sheetRef, pubId }: SheetProps) => {
  const deleteRef = React.useRef<BottomSheetMethods>(null);

  const actionList: actionListType[] = [
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
        snapPoints={[150]}
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

export default React.memo(MirroredVideos);
