import React from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import useStore from "../store/Store";
import { StatusBar } from "expo-status-bar";
import { client } from "../apollo/client";
import Skleton from "../components/Skleton";
import { dark_primary, dark_secondary, primary } from "../constants/Colors";
import convertDate from "../utils/formateDate";
import getFeed from "../apollo/Queries/getFeed";

const Feed = ({ navigation }: { navigation: any }): React.ReactElement => {
  const store = useStore();
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
            "x-access-token": `Bearer ${store.accessToken}`,
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
          colors={[primary]}
          progressBackgroundColor={dark_secondary}
        />
      }
      style={{
        flex: 1,
        backgroundColor:"black",
      }}
    >
      <StatusBar style="light" backgroundColor={dark_secondary} />
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
          <Skleton />
          <Skleton />
          <Skleton />
          <Skleton />
          <Skleton />
        </>
      )}
    </ScrollView>
  );
};
export default Feed;
