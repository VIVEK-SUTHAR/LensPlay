import AnimatedLottieView from "lottie-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  RefreshControl,
  SafeAreaView,
  View,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useGuestStore } from "../../store/GuestStore";
import { useAuthStore, useProfile, useThemeStore } from "../../store/Store";
import {
  Mirror,
  Post,
  PublicationMainFocus,
  PublicationSortCriteria,
  PublicationTypes,
  useExploreQuery,
} from "../../types/generated";
import Heading from "../UI/Heading";
import SingleByte from "./SingleByte";

export type ShotsPublication = Post | Mirror;

const ByteCard = ({ navigation }: { navigation: any }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { currentProfile } = useProfile();
  const { isGuest, profileId } = useGuestStore();
  const { PRIMARY } = useThemeStore();
  const { accessToken } = useAuthStore();
  const handleChangeIndexValue = ({ index }: { index: number }) => {
    setCurrentIndex(index);
  };

  const QueryRequest = {
    sortCriteria: PublicationSortCriteria.Latest,
    publicationTypes: [PublicationTypes.Mirror, PublicationTypes.Post],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: ["lensplay", "lenstube", "lenstube-bytes"],
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

  const onRefresh = React.useCallback(() => {
    refetch({
      request: QueryRequest,
    });
  }, []);
  if (loading) return <Loading />;
  if (error) console.log(error);
  if (shotsData) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        {shotsData?.explorePublications?.items ? (
          <SwiperFlatList
            refreshControl={
              <RefreshControl
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                colors={[PRIMARY]}
                progressBackgroundColor={"black"}
              />
            }
            vertical={true}
            keyExtractor={(item, index) => index.toString()}
            onChangeIndex={handleChangeIndexValue}
            data={shotsData?.explorePublications?.items}
            renderItem={({
              item,
              index,
            }: {
              item: ShotsPublication;
              index: number;
            }) => {
              return (
                <View
                  style={{
                    height: Dimensions.get("window").height,
                  }}
                >
                  <SingleByte
                    item={item}
                    index={index}
                    currentIndex={currentIndex}
                  />
                </View>
              );
            }}
          />
        ) : (
          <></>
        )}
      </SafeAreaView>
    );
  }
};

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        style={{
          height: 500,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimatedLottieView
          autoPlay
          style={{
            height: "auto",
          }}
          source={require("../../assets/loader.json")}
        />
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Heading
            title="Getting Shots for you"
            style={{
              fontSize: 16,
              color: "white",
              marginVertical: 5,
              marginHorizontal: 15,
              fontWeight: "600",
              alignSelf: "flex-start",
            }}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default ByteCard;
