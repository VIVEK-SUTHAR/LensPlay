import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import * as React from "react";
import VideoCard from "../components/VideoCard";
import useStore from "../store/Store";
import { StatusBar } from "expo-status-bar";
import { client } from "../apollo/client";
import getFeed from "../apollo/Queries/getFeed";
import Skleton from "../components/Skleton";
import { dark_primary, dark_secondary, primary } from "../constants/Colors";
import { Feather } from "@expo/vector-icons";
import convertDate from "../utils/formateDate";

const Feed = ({ navigation }: { navigation: any }): React.ReactElement => {
  const store = useStore();
  const [feedData, setfeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const profileId = store.profileId;
  const setUserFeed = store.setUserFeed;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "LensPlay",
      headerStyle: { backgroundColor: dark_secondary, elevation: 0 },
      headerRight: () => (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Search");
          }}
        >
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Feather name="search" size={24} color="white" />
          </View>
        </TouchableWithoutFeedback>
      ),
      headerLeft: () => (
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "600", color: "white" }}>
            LensPlay
          </Text>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              width: "auto",
              height: 20,
              marginHorizontal: 5,
              paddingHorizontal: 5,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.6)",
            }}
          >
            <Text style={{ color: primary, fontSize: 12 }}>Beta</Text>
          </View>
        </View>
      ),
    });
  }, []);
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
      style={{
        flex: 1,
        backgroundColor: dark_primary,
      }}
    >
      <StatusBar style="light" backgroundColor={dark_secondary} />
      {!isLoading ? (
        <>
          {feedData.map((item, index) => {
            console.log(item?.root?.metadata?.cover);
            
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
