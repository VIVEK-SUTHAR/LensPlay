import React from "react";
import { RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import useStore, { useAuthStore, useThemeStore } from "../store/Store";
import { StatusBar } from "expo-status-bar";
import { client } from "../apollo/client";
import Skleton from "../components/Skleton";
import convertDate from "../utils/formateDate";
import getFeed from "../apollo/Queries/getFeed";
import { RootTabScreenProps } from "../types/navigation/types";
import VideoCardSkeleton from "../components/UI/VideoCardSkeleton";

const Feed = ({
  navigation,
}: RootTabScreenProps<"Home">): React.ReactElement => {
  const store = useStore();
  const theme = useThemeStore();
  const authStore = useAuthStore();
  
  const [feedData, setfeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    const updatedFeedData = await getFeedData();
    setfeedData(updatedFeedData?.data.feed.items);
    setRefreshing(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const updatedFeedData = await getFeedData();
      setfeedData(updatedFeedData?.data.feed.items);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getFeedData().then((res) => {
      setfeedData(res.data.feed.items);
      setIsLoading(false);
    });
  }, []);

  async function getFeedData() {
    try {
      const feed = await client.query({
        query: getFeed,
        variables: {
          id: store.profileId,
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${authStore.accessToken}`,
          },
        },
      });
      return feed;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Something went wrong", { cause: error });
      }
    }
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.PRIMARY]}
          progressBackgroundColor={"black"}
        />
      }
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <StatusBar style="light" backgroundColor={"black"} />
      {!isLoading ? (
        <>
          {feedData.map((item, index) => {
            if (!item?.root?.hidden) {
              return (
                <VideoCard
                  key={item?.root?.id}
                  id={item?.root?.id}
                  navigation={navigation}
                  title={item?.root?.metadata?.name}
                  date={convertDate(item?.root?.createdAt)}
                  playbackId={item?.root?.metadata?.media[0]?.original?.url}
                  banner={item?.root?.metadata?.cover}
                  avatar={item?.root?.profile?.picture?.original?.url}
                  uploadedBy={item?.root?.profile?.handle}
                  comments={item?.comments}
                  stats={item?.root?.stats}
                  isFollowdByMe={item.root.profile.isFollowedByMe}
                  profileId={item?.root?.profile?.id}
                  reaction={item?.root?.reaction}
                />
              );
            }
          })}
        </>
      ) : (
        <>
          <VideoCardSkeleton />
          <VideoCardSkeleton />
          <VideoCardSkeleton />
          <VideoCardSkeleton />
        </>
      )}
    </ScrollView>
  );
};
export default Feed;
