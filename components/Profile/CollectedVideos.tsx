import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React from "react";
import { FlatList, Share, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useAuthStore, useProfile, useThemeStore } from "../../store/Store";
import {
  Post,
  PublicationMainFocus,
  PublicationTypes,
  PublicationsQueryRequest,
  Scalars,
  useProfileCollectsQuery,
} from "../../types/generated";
import Sheet from "../Bottom";
import Icon from "../Icon";
import Ripple from "../UI/Ripple";
import StyledText from "../UI/StyledText";
import MyVideoCard, { SheetProps, actionListType } from "../common/MyVideoCard";
import { NoVideosFound } from "./AllVideos";

const CollectedVideos = () => {
  const { accessToken } = useAuthStore();
  const { currentProfile } = useProfile();
  const { PRIMARY } = useThemeStore();
  const CollectedVideoSheetRef = React.useRef<BottomSheetMethods>(null);

  const QueryRequest: PublicationsQueryRequest = {
    collectedBy: currentProfile?.ownedBy,
    publicationTypes: [PublicationTypes.Post, PublicationTypes.Mirror],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: ["lenstube"],
    limit: 10,
  };

  const { data, error, loading } = useProfileCollectsQuery({
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

  const [pubId, setPubId] = React.useState("");

  const handlePubId = React.useCallback((pubId: string) => {
    setPubId(pubId);
  }, []);

  if (error) return <></>;
  if (loading) return <></>;
  if (data) {
    const collectVideos = data?.publications?.items;
    return (
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          paddingVertical: 16,
        }}
      >
        <FlatList
          data={collectVideos as Post[]}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<NoVideosFound />}
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
              sheetRef={CollectedVideoSheetRef}
              setPubId={handlePubId}
            />
          )}
        />
        <CollectedVideoSheet sheetRef={CollectedVideoSheetRef} pubId={pubId} />
      </View>
    );
  }
  return <></>;
};

export const CollectedVideoSheet = ({ sheetRef, pubId }: SheetProps) => {
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
  ];

  return (
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
  );
};

export default React.memo(CollectedVideos);
