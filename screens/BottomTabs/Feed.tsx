import { StatusBar } from "expo-status-bar";
import AnimatedLottieView from "lottie-react-native";
import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import PleaseLogin from "../../components/PleaseLogin";
import Button from "../../components/UI/Button";
import Heading from "../../components/UI/Heading";
import VideoCardSkeleton from "../../components/UI/VideoCardSkeleton";
import VideoCard from "../../components/VideoCard";
import { useGuestStore } from "../../store/GuestStore";
import { useAuthStore, useProfile, useThemeStore } from "../../store/Store";
import {
  FeedItemRoot,
  PublicationMainFocus,
  useFeedQuery,
} from "../../types/generated";
import { RootTabScreenProps } from "../../types/navigation/types";

const Feed = ({ navigation }: RootTabScreenProps<"Home">) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const theme = useThemeStore();
  const { accessToken } = useAuthStore();
  const { isGuest } = useGuestStore();
  const { currentProfile } = useProfile();

  const QueryRequest = {
    profileId: currentProfile?.id,
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: ["lenstube"],
    limit: 50,
  };

  const { data: Feeddata, error, loading, refetch } = useFeedQuery({
    variables: {
      request: QueryRequest,
      reactionRequest: {
        profileId: currentProfile?.id,
      },
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });

  if (error) {
    console.log(error);
    refetch({
      request: QueryRequest,
    });
  }

  const onRefresh = () => {
    setRefreshing(true);
    try {
      refetch({
        request: QueryRequest,
      }).then((res) => {
        setRefreshing(false);
      });
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };

  if (isGuest) return <PleaseLogin />;
  if (loading) return <Loader />;
  if (error) return <NotFound navigation={navigation} />;
  if (Feeddata?.feed?.items?.length === 0)
    return <NotFound navigation={navigation} />;
  if (!Feeddata && !loading) return <NotFound navigation={navigation} />;

  if (Feeddata) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={"black"}></StatusBar>
        <FlatList
          data={Feeddata.feed.items}
          keyExtractor={(item) => item.root.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.PRIMARY]}
              progressBackgroundColor={"black"}
            />
          }
          renderItem={({ item }) => {
            return (
              <VideoCard
                publication={item?.root as FeedItemRoot}
                id={item?.root?.id}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  }
  return <SafeAreaView style={styles.container}></SafeAreaView>;
};
export default Feed;

const NotFound = ({ navigation }: { navigation: any }) => {
  const theme = useThemeStore();
  return (
    <SafeAreaView style={styles.container}>
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
          source={require("../../assets/notfound.json")}
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
    </SafeAreaView>
  );
};

const Loader = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <VideoCardSkeleton />
      <VideoCardSkeleton />
      <VideoCardSkeleton />
      <VideoCardSkeleton />
      <VideoCardSkeleton />
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
