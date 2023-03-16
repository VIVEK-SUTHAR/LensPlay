import AnimatedLottieView from "lottie-react-native";
import * as React from "react";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";
import { client } from "../apollo/client";
import getTrendingPublication from "../apollo/Queries/getTrendingPublication";
import StyledText from "../components/UI/StyledText";
import VideoCardSkeleton from "../components/UI/VideoCardSkeleton";
import VideoCard from "../components/VideoCard";
import { dark_primary } from "../constants/Colors";
import { useGuestStore } from "../store/GuestStore";
import { useAuthStore, useProfile, useThemeStore } from "../store/Store";
import { LensPublication } from "../types/Lens/Feed";
import { RootTabScreenProps } from "../types/navigation/types";
const Trending: React.FC<RootTabScreenProps<"Trending">> = () => {
  const tags = [
    {
      name: "LATEST",
      active: true,
    },
    {
      name: "TOP_COMMENTED",
      active: false,
    },
    {
      name: "TOP_COLLECTED",
      active: false,
    },
    {
      name: "TOP_MIRRORED",
      active: false,
    },
    {
      name: "CURATED_PROFILES",
      active: false,
    },
  ];

  const [currentTag, setCurrentTag] = useState<{
    name: string;
    active: boolean;
  }>(tags[0]);
  const [TrendingItems, setTrendingItems] = useState<LensPublication[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const theme = useThemeStore();
  const authStore = useAuthStore();
  const userStore = useProfile();
  const { isGuest, profileId } = useGuestStore();

  async function getTrendingData() {
    try {
        const trendingData = await client.query({
          query: getTrendingPublication,
          variables: {
            id: isGuest?profileId:userStore.currentProfile?.id,
            sortBy: currentTag.name,
          },
        });
        setTrendingItems(trendingData.data.explorePublications.items);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Something went wrong", { cause: error.cause });
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getTrendingData();
  }, [currentTag]);

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
                // setTrendingItems([]);
                // setIsLoading(true);
                // getTrendingData();
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
                  color: `${currentTag.name === item.name ? "black" : "white"}`,
                }}
              />
            </Pressable>
          );
        })}
      </ScrollView>
      <ScrollView>
        <View>
          {!isLoading && TrendingItems.length === 0 ? (
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
                source={require("../assets/loader.json")}
              />
            </Pressable>
          ) : isLoading ? (
            <>
              <VideoCardSkeleton />
              <VideoCardSkeleton />
              <VideoCardSkeleton />
              <VideoCardSkeleton />
              <VideoCardSkeleton />
            </>
          ) : (
            <></>
          )}
          {TrendingItems &&
            TrendingItems?.map((item: LensPublication, index) => {
              return <VideoCard publication={item} id={item?.id} />;
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Trending;
