import React, { useState } from "react";
import { Dimensions, View, useWindowDimensions } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import SingleShot from "../../../components/Shots/SingleShot";
import { useGuestStore } from "../../../store/GuestStore";
import { useAuthStore, useProfile } from "../../../store/Store";
import {
  ExplorePublicationRequest,
  PublicationMainFocus,
  PublicationSortCriteria,
  PublicationTypes,
  useExploreQuery,
} from "../../../types/generated";
import { RootTabScreenProps } from "../../../types/navigation/types";
import { ShotsPublication } from "../../../types";
import Loader from "../../common/Loader";
import NotFound from "../../../components/common/NotFound";

const Shots = ({ navigation }: RootTabScreenProps<"Shots">) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { currentProfile } = useProfile();
  const { isGuest, profileId } = useGuestStore();
  const { accessToken } = useAuthStore();
  const {height, width} = useWindowDimensions();

  const QueryRequest: ExplorePublicationRequest = {
    sortCriteria: PublicationSortCriteria.Latest,
    publicationTypes: [PublicationTypes.Post],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: ["lensplay", "lenstube-bytes"],
    limit: 20
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
  if (loading) return <NotFound message="Getting shots for you"/>

  return (
    <View
      style={{
        height: height,
        width: width
      }}
    >
      <SwiperFlatList
        vertical={true}
        keyExtractor={(item, index) => index.toString()}
        onChangeIndex={handleChangeIndexValue}
        data={bytesData}
        renderItem={({ item, index }) => (
          <View style={{height: height}}>
            <SingleShot item={item} index={index} currentIndex={currentIndex} />
          </View>
        )}
      />
    </View>
  );
};

export default Shots;
