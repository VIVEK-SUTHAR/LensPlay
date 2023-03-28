import * as React from "react";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Skeleton from "../components/common/Skeleton";
import NotFound from "../components/Profile/NotFound";
import StyledText from "../components/UI/StyledText";
import VideoCardSkeleton from "../components/UI/VideoCardSkeleton";
import VideoCard from "../components/VideoCard";
import { dark_primary } from "../constants/Colors";
import { useGuestStore } from "../store/GuestStore";
import { useAuthStore, useProfile, useThemeStore } from "../store/Store";
import {
  Mirror,
  Post,
  PublicationMainFocus,
  PublicationSortCriteria,
  PublicationTypes,
  useExploreQuery,
} from "../types/generated";
import { LensPublication } from "../types/Lens/Feed";
import { RootTabScreenProps } from "../types/navigation/types";

type Explore = Post | Mirror;

export default function Trending({
  navigation,
}: RootTabScreenProps<"Trending">) {
  const tags = [
    {
      name: PublicationSortCriteria.Latest,
      active: true,
    },
    {
      name: PublicationSortCriteria.TopCommented,
      active: false,
    },
    {
      name: PublicationSortCriteria.TopCollected,
      active: false,
    },
    {
      name: PublicationSortCriteria.TopMirrored,
      active: false,
    },
    {
      name: PublicationSortCriteria.CuratedProfiles,
      active: false,
    },
  ];

  const [currentTag, setCurrentTag] = useState<{
    name: PublicationSortCriteria;
    active: boolean;
  }>(tags[0]);
  const [TrendingItems, setTrendingItems] = useState<LensPublication[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const theme = useThemeStore();
  const { accessToken } = useAuthStore();
  const { currentProfile } = useProfile();
  const { isGuest, profileId } = useGuestStore();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const QueryRequest = {
    sortCriteria: currentTag.name,
    publicationTypes: [PublicationTypes.Mirror, PublicationTypes.Post],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: ["lenstube"],
  };

  const { data: ExploreData, error, loading, refetch } = useExploreQuery({
    variables: {
      request: QueryRequest,
      reactionRequest: {
        profileId: isGuest ? profileId : currentProfile?.id,
      },
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });

  useEffect(() => {
    refetch({
      request: QueryRequest,
    });
  }, [currentTag]);

  if (loading) return <Skeleton children={<VideoCardSkeleton />} number={10} />;
  if (error) return <NotFound />;
  if (ExploreData) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <ScrollView
          style={{
            height: 60,
            paddingVertical: 8,
            maxHeight: 60,
            marginLeft: 10,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {tags.map((item, index) => {
            return (
              <Pressable
                android_ripple={{
                  color: "transparent",
                }}
                onTouchEndCapture={() => {
                  setCurrentTag(tags[index]);
                }}
                key={index}
                style={{
                  marginHorizontal: 4,
                  backgroundColor: `${
                    currentTag.name === item.name ? theme.PRIMARY : dark_primary
                  }`,
                  width: "auto",
                  maxHeight: 34,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <StyledText
                  title={item.name.replace(/_/g, " ")}
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: `${
                      currentTag.name === item.name ? "black" : "white"
                    }`,
                  }}
                />
              </Pressable>
            );
          })}
        </ScrollView>
        <FlatList
          data={ExploreData.explorePublications.items as Explore[]}
          // keyExtractor={(index) => `${index}`}
          ListEmptyComponent={() => {
            return <NotFound />;
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                refetch({
                  request: QueryRequest,
                }).then(() => setRefreshing(false));
              }}
              colors={[theme.PRIMARY]}
              progressBackgroundColor={"black"}
            />
          }
          renderItem={({ item }: { item: Explore }) => {
            if (item?.appId === "lenstube") {
              return <VideoCard publication={item as Explore} id={item.id} />;
            }
            return <></>;
          }}
        />
      </SafeAreaView>
    );
  }
}
