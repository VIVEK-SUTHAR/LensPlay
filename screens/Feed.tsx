import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import getFeed from "../apollo/Queries/getFeed";
import useStore from "../store/Store";
import { client } from "../apollo/client";
import { StatusBar } from "expo-status-bar";

const Feed = ({ navigation }: { navigation: any }) => {
  const store = useStore();
  const [feedData, setfeedData] = useState([]);
  const profileId = store.profileId;
  console.log(profileId);
  useEffect(() => {
    getFeedData();
  }, []);
  async function getFeedData() {
    const feed = await client.query({
      query: getFeed,
      variables: {
        id:profileId
      },
    });
    console.log(feed.data);
    setfeedData(feed.data.feed.items);
  }
  return (
    <ScrollView>
      <StatusBar style="dark"/>
      {feedData &&
        feedData.map((item,index) => {
          return (
            <VideoCard
              key={index}
              navigation={navigation}
              title={item?.root?.metadata?.name}
              banner={item?.root?.metadata?.media[0]?.original?.url}
              avatar={item?.root?.profile?.picture?.original?.url}
            />
          );
        })}
      {/* <VideoCard navigation={navigation}></VideoCard>
      <VideoCard navigation={navigation}></VideoCard>
      <VideoCard navigation={navigation}></VideoCard>
      <VideoCard navigation={navigation}></VideoCard>
      <VideoCard navigation={navigation}></VideoCard>
      <VideoCard navigation={navigation}></VideoCard> */}
    </ScrollView>
  );
};

export default Feed;

const styles = StyleSheet.create({});
