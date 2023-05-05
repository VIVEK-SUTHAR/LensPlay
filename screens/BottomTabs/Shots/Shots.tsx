import React, { useState } from "react";
import { useWindowDimensions, View } from "react-native";
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

const Bytes = ({ navigation }: RootTabScreenProps<"Bytes">) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { currentProfile } = useProfile();
  const { isGuest, profileId } = useGuestStore();
  const { accessToken } = useAuthStore();
  const { height, width } = useWindowDimensions();

  const QueryRequest: ExplorePublicationRequest = {
    sortCriteria: PublicationSortCriteria.Latest,
    publicationTypes: [PublicationTypes.Post],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: ["lensplay", "lenstube-bytes"],
  };

  const { data: shotsData, error, loading, refetch } = useExploreQuery({
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

  const bytesData = shotsData?.explorePublications?.items as ShotsPublication[];

  const handleChangeIndexValue = ({ index }: { index: number }) => {
    setCurrentIndex(index);
  };

  const singleShotComponent = ({
    item,
    index,
  }: {
    item: ShotsPublication;
    index: number;
  }) => {
    return (
      <View style={{ height: height }}>
        <SingleShot item={item} index={index} currentIndex={currentIndex} />
      </View>
    );
  };

  const _singleShot = React.memo(singleShotComponent);

  return (
    <View
      style={{
        // flex: 1,
        height: height,
        width: width,
      }}
    >
      <SwiperFlatList
        vertical={true}
        keyExtractor={(item, index) => index.toString()}
        onChangeIndex={handleChangeIndexValue}
        data={bytesData}
        initialNumToRender={2}
        renderItem={({ item, index }) => (
          <_singleShot item={item} index={index} />
        )}
      />
    </View>
  );
};

export default Bytes;
