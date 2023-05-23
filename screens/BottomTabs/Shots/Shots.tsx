import * as ScreenOrientation from "expo-screen-orientation";
import React, { useState } from "react";
import { Platform, View, useWindowDimensions } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import SingleShot from "../../../components/Shots/SingleShot";
import { useGuestStore } from "../../../store/GuestStore";
import { useAuthStore, useProfile } from "../../../store/Store";
import { ShotsPublication } from "../../../types";
import {
  ExplorePublicationRequest,
  PublicationMainFocus,
  PublicationSortCriteria,
  PublicationTypes,
  useExploreQuery,
} from "../../../types/generated";
import { RootTabScreenProps } from "../../../types/navigation/types";

const Shots = ({ navigation }: RootTabScreenProps<"Shots">) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { currentProfile } = useProfile();
  const { isGuest, profileId } = useGuestStore();
  const { accessToken } = useAuthStore();

  const { height, width } = useWindowDimensions();

  const isAndroid = Platform.OS === "android";

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

  const QueryRequest: ExplorePublicationRequest = {
    sortCriteria: PublicationSortCriteria.Latest,
    publicationTypes: [PublicationTypes.Post],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: ["lensplay", "lenstube-bytes"],
    limit: 3,
  };

  const {
    data: shotsData,
    error,
    loading,
    refetch,
    fetchMore,
  } = useExploreQuery({
    variables: {
      request: QueryRequest,
      reactionRequest: {
        profileId: isGuest ? profileId : currentProfile?.id,
      },
    },
    context: {
      headers: {
        "x-access-token": `${!isGuest ? `Bearer ${accessToken}` : ""}`,
      },
    },
  });

  const data = shotsData?.explorePublications?.items as ShotsPublication[];

  const pageInfo = shotsData?.explorePublications.pageInfo;

  const handleChangeIndexValue = ({ index }: { index: number }) => {
    setCurrentIndex(index);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ShotsPublication;
    index: number;
  }) => {
    if (!item.hidden) {
      return (
        <View style={{ height: isAndroid ? height : "auto" }}>
          <SingleShot
            item={item}
            key={item.id}
            index={index}
            currentIndex={currentIndex}
          />
        </View>
      );
    }
    return <></>;
  };

  const keyExtractor = (item: ShotsPublication) => item.id.toString();

  const onEndCallBack = () => {
    if (!pageInfo?.next) {
      return;
    }
    fetchMore({
      variables: {
        request: {
          cursor: pageInfo?.next,
          ...QueryRequest,
        },
      },
    }).catch((err) => {});
  };

  return (
    <>
      {isAndroid ? (
        <View
          style={{
            backgroundColor: "black",
            height: height,
            width: width,
          }}
        >
          <SwiperFlatList
            vertical={true}
            keyExtractor={keyExtractor}
            onChangeIndex={handleChangeIndexValue}
            data={data}
            renderItem={renderItem}
            initialNumToRender={3}
            maxToRenderPerBatch={5}
            onEndReachedThreshold={1}
            onEndReached={onEndCallBack}
          />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "black",
            flex: 1,
          }}
        >
          <SwiperFlatList
            vertical={true}
            keyExtractor={keyExtractor}
            onChangeIndex={handleChangeIndexValue}
            data={data}
            renderItem={renderItem}
            initialNumToRender={3}
            maxToRenderPerBatch={5}
            onEndReachedThreshold={1}
            onEndReached={onEndCallBack}
          />
        </View>
      )}
    </>
  );
};

export default Shots;
