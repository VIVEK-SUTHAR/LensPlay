import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Share,
  View,
} from "react-native";
import { SOURCES } from "../../constants";
import { useAuthStore, useProfile, useThemeStore } from "../../store/Store";
import {
  Mirror,
  PublicationMainFocus,
  PublicationTypes,
  PublicationsQueryRequest,
  Scalars,
  useProfileMirrorsQuery,
} from "../../types/generated";
import Sheet from "../Bottom";
import Icon from "../Icon";
import Ripple from "../UI/Ripple";
import StyledText from "../UI/StyledText";
import DeleteVideo from "../VIdeo/DeleteVideo";
import MyVideoCard, { SheetProps, actionListType } from "../common/MyVideoCard";
import { NoVideosFound } from "./AllVideos";
import { FlashList } from "@shopify/flash-list";
import { black } from "../../constants/Colors";

type MirroredVideosProps = {
  channelId?: string;
};

const MirroredVideos: React.FC<MirroredVideosProps> = ({ channelId }) => {
  const { accessToken } = useAuthStore();
  const { PRIMARY } = useThemeStore();
  const { currentProfile } = useProfile();
  const MirroredVideoSheetRef = React.useRef<BottomSheetMethods>(null);
  const [pubId, setPubId] = React.useState("");
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const handlePubId = React.useCallback((pubId: string) => {
    setPubId(pubId);
  }, []);

  const QueryRequest: PublicationsQueryRequest = {
    profileId: channelId ? channelId : currentProfile?.id,
    publicationTypes: [PublicationTypes.Mirror],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: SOURCES,
    limit: 10,
  };

  const { data, error, loading, refetch, fetchMore } = useProfileMirrorsQuery({
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
  const pageInfo = data?.publications?.pageInfo;

  const keyExtractor = (item: Mirror) => item.id;

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingVertical: 8,
      }}
    >
      <FlashList
        data={AllMirrorVideos as Mirror[]}
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
            sheetRef={MirroredVideoSheetRef}
            setPubId={handlePubId}
          />
        )}
      />
      <MirroredVideoSheet
        sheetRef={MirroredVideoSheetRef}
        pubId={pubId}
        profileId={channelId}
      />
    </View>
  );
};

export const MirroredVideoSheet = ({
  sheetRef,
  pubId,
  profileId,
}: SheetProps) => {
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

  const channelActionList: actionListType[] = [
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
    <>
      <Sheet
        ref={sheetRef}
        snapPoints={[profileId ? 100 : 150]}
        enablePanDownToClose={true}
        enableOverDrag={true}
        bottomInset={32}
        style={{
          marginHorizontal: 8,
        }}
        backgroundStyle={{
          backgroundColor: black[600]
        }}
        detached={true}
        >
          <FlatList
            data={profileId ? channelActionList : actionList}
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
        </Sheet>
      <DeleteVideo sheetRef={deleteRef} pubId={pubId} />
    </>
  );
};

export default React.memo(MirroredVideos);
