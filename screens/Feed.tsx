import React from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import { useAuthStore, useProfile, useThemeStore } from "../store/Store";
import { StatusBar } from "expo-status-bar";
import { client } from "../apollo/client";
import getFeed from "../apollo/Queries/getFeed";
import { RootTabScreenProps } from "../types/navigation/types";
import VideoCardSkeleton from "../components/UI/VideoCardSkeleton";
import { FeedItem } from "../types/Lens/Feed";
import AnimatedLottieView from "lottie-react-native";
import Heading from "../components/UI/Heading";
import Button from "../components/UI/Button";
import Toast from "../components/Toast";

const Feed = ({ navigation }: RootTabScreenProps<"Home">) => {
  const [feedData, setfeedData] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const theme = useThemeStore();
  const authStore = useAuthStore();
  const userStore = useProfile();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const updatedFeedData = await getFeedData();
      setfeedData(updatedFeedData?.data.feed.items);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getFeedData().then((res) => {
      setfeedData(res?.data.feed.items);
    });
    setfeedData([]);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    const updatedFeedData = await getFeedData();
    setfeedData(updatedFeedData?.data.feed.items);
    setRefreshing(false);
  };

  const getFeedData = async () => {
    setIsLoading(true);
    try {
      const feed = await client.query({
        query: getFeed,
        variables: {
          id: userStore.currentProfile?.id,
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
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <VideoCardSkeleton />
        <VideoCardSkeleton />
        <VideoCardSkeleton />
        <VideoCardSkeleton />
        <VideoCardSkeleton />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={"black"} />
      {feedData.length > 0 ? (
        <FlatList
          data={feedData}
          keyExtractor={(item) => item.root.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.PRIMARY]}
              progressBackgroundColor={"black"}
            />
          }
          renderItem={({ item }) => (
            <>
              <VideoCard
                id={item?.root?.id}
                title={item?.root?.metadata?.name}
                date={item.root.createdAt}
                playbackId={item?.root?.metadata?.media[0]?.original?.url}
                banner={item?.root?.metadata?.cover}
                avatar={item?.root?.profile?.picture?.original?.url}
                uploadedBy={
                  item?.root?.profile?.name || item.root.profile.handle
                }
                stats={item?.root?.stats}
                isFollowdByMe={item.root.profile.isFollowedByMe}
                profileId={item?.root?.profile?.id}
                reaction={item?.root?.reaction}
                description={item?.root?.metadata?.description}
                attributes={item?.root?.metadata?.attributes}
              />

              {/* <NewVideoCard
              id={item?.root?.id}
              title={item?.root?.metadata?.name}
              date={item.root.createdAt}
              playbackId={item?.root?.metadata?.media[0]?.original?.url}
              banner={item?.root?.metadata?.cover}
              avatar={item?.root?.profile?.picture?.original?.url}
              uploadedBy={item?.root?.profile?.name || item.root.profile.handle}
              stats={item?.root?.stats}
              isFollowdByMe={item.root.profile.isFollowedByMe}
              profileId={item?.root?.profile?.id}
              reaction={item?.root?.reaction}
              description={item?.root?.metadata?.description}
              attributes={item?.root?.metadata?.attributes}
              /> */}
            </>
          )}
        />
      ) : (
        <></>
      )}
      {!isLoading && feedData.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AnimatedLottieView
            autoPlay
            style={{
              height: "auto",
            }}
            source={require("../assets/notifications.json")}
          />
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Heading
              title="Looks like you just landed,follow some profile to view your feed"
              style={{
                fontSize: 16,
                color: "white",
                marginVertical: 5,
                marginHorizontal: 15,
                fontWeight: "600",
                alignSelf: "flex-start",
                textAlign: "center",
              }}
            />
            <Button
              title="Explore Feed"
              width={"auto"}
              type="outline"
              borderColor={theme.PRIMARY}
              px={16}
              my={8}
              textStyle={{
                color: "white",
                fontSize: 20,
                fontWeight: "600",
              }}
              onPress={() => {
                navigation.navigate("Trending");
              }}
            />
          </View>
        </View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};
export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
