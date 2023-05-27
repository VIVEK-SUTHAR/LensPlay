import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React from "react";
import { ActivityIndicator, FlatList, Share, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useAuthStore, useProfile, useThemeStore } from "../../store/Store";
import {
  Mirror,
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
import { SOURCES } from "../../constants";
import { FlashList } from "@shopify/flash-list";

type CollectedVideosProps = {
  ethAddress?: string;
};

const CollectedVideos: React.FC<CollectedVideosProps> = ({ ethAddress }) => {
  const { accessToken } = useAuthStore();
  const { currentProfile } = useProfile();
  const { PRIMARY } = useThemeStore();
  const CollectedVideoSheetRef = React.useRef<BottomSheetMethods>(null);
  const [pubId, setPubId] = React.useState("");
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const handlePubId = React.useCallback((pubId: string) => {
    setPubId(pubId);
  }, []);

  const QueryRequest: PublicationsQueryRequest = {
    collectedBy: ethAddress ? ethAddress : currentProfile?.ownedBy,
    publicationTypes: [PublicationTypes.Post, PublicationTypes.Mirror],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: SOURCES,
    limit: 10,
  };

  const { data, error, loading, refetch, fetchMore } = useProfileCollectsQuery({
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

  const collectVideos = data?.publications?.items;
  const pageInfo = data?.publications?.pageInfo;

  const keyExtractor = (item: Post | Mirror) => item.id;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    try {
      refetch({
        request: QueryRequest,
      })
        .then(() => {
          setRefreshing(false);
        })
        .catch((err) => {});
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  }, []);

  const _MoreLoader = () => {
    return (
      <>
        {pageInfo?.next ? (
          <View
            style={{
              height: 200,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"large"} color={PRIMARY} />
          </View>
        ) : (
          <></>
        )}
      </>
    );
  };

  const MoreLoader = React.memo(_MoreLoader);

  const _RefreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[PRIMARY]}
      progressBackgroundColor={"black"}
    />
  );

  const onEndCallBack = React.useCallback(() => {
    if (!pageInfo?.next) {
      return;
    }
    fetchMore({
      variables: {
        request: {
          ...QueryRequest,
          cursor: pageInfo?.next,
        },
      },
    }).catch((err) => {});
  }, [pageInfo?.next]);

  if (error) return <></>;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingVertical: 8,
      }}
    >
      {loading ? (
        <></>
      ) : (
        <FlashList
          data={collectVideos as Post[] | Mirror[]}
          keyExtractor={keyExtractor}
          ListEmptyComponent={NoVideosFound}
          removeClippedSubviews={true}
          estimatedItemSize={110}
          refreshControl={_RefreshControl}
          ListFooterComponent={<MoreLoader />}
          onEndReachedThreshold={0.7}
          onEndReached={onEndCallBack}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <MyVideoCard
              publication={item}
              id={item.id}
              sheetRef={CollectedVideoSheetRef}
              setPubId={handlePubId}
            />
          )}
        />
      )}
      <CollectedVideoSheet sheetRef={CollectedVideoSheetRef} pubId={pubId} />
    </View>
  );
};

export const CollectedVideoSheet = ({
  sheetRef,
  pubId,
}: {
  sheetRef: React.RefObject<BottomSheetMethods>;
  pubId: Scalars["InternalPublicationId"];
}) => {
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
