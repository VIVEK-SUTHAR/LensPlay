import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import { ShotsPublication } from "../../../components/Bytes/ByteCard";
import SingleByte from "../../../components/Bytes/SingleByte";
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
import SingleShot from "../../../components/Shots/SingleShot";
import { Player } from "@livepeer/react-native";

const Bytes = ({ navigation }: RootTabScreenProps<"Bytes">) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { currentProfile } = useProfile();
  const { isGuest, profileId } = useGuestStore();
  const { accessToken } = useAuthStore();

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

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SwiperFlatList
        vertical={true}
        keyExtractor={(item, index) => index.toString()}
        onChangeIndex={handleChangeIndexValue}
        data={bytesData}
        renderItem={({ item, index }) => (
          <SingleShot item={item} index={index} currentIndex={currentIndex} />
        )}
      />
    </View>
  );
};

export default Bytes;
