import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import * as React from "react";
import VideoCard from "../components/VideoCard";
import useStore from "../store/Store";
import { StatusBar } from "expo-status-bar";
import { client } from "../apollo/client";
import getFeed from "../apollo/Queries/getFeed";
import Skleton from "../components/Skleton";

const Feed = ({ navigation }: { navigation: any }): React.ReactElement => {
  const store = useStore();
  const [feedData, setfeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const profileId = store.profileId;
  const setUserFeed = store.setUserFeed;
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getFeedData().then(() => {
      setRefreshing(false);
    });
  }, []);
  useEffect(() => {
    getFeedData().then((res) => {
      setfeedData(res.data.feed.items);
      setUserFeed(res.data.feed.items);
      setIsLoading(false);
    });
  }, []);
  async function getFeedData() {
    const feed = await client.query({
      query: getFeed,
      variables: {
        id: profileId,
      },
    });
    return feed;
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar style="light" backgroundColor="#1A202C" />
      {!isLoading ? (
        <>
          {feedData.map((item, index) => {
            return (
              <VideoCard
                key={index}
                id={index}
                navigation={navigation}
                title={item?.root?.metadata?.name}
                playbackId={item?.root?.metadata?.media[0]?.original?.url}
                banner={item?.root?.metadata?.media[0]?.original?.url}
                avatar={item?.root?.profile?.picture?.original?.url}
                uploadedBy={item?.root?.profile?.handle}
              />
            );
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

const styles = StyleSheet.create({});
