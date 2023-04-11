import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import Icon from "../../../components/Icon";
import PleaseLogin from "../../../components/PleaseLogin";
import Button from "../../../components/UI/Button";
import Heading from "../../../components/UI/Heading";
import VideoCardSkeleton from "../../../components/UI/VideoCardSkeleton";
import VideoCard from "../../../components/VideoCard";
import Skeleton from "../../../components/common/Skeleton";
import { black, white } from "../../../constants/Colors";
import { useGuestStore } from "../../../store/GuestStore";
import { useAuthStore, useProfile, useThemeStore } from "../../../store/Store";
import {
  FeedItemRoot,
  PublicationMainFocus,
  useFeedQuery,
} from "../../../types/generated";
import { RootTabScreenProps } from "../../../types/navigation/types";

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
    sources: ["lensplay", "lenstube"],
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
  if (loading) return <Skeleton children={<VideoCardSkeleton />} number={10} />;
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
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            height: 300,
            width: 300,
          }}
          resizeMode="contain"
          source={require("../../../assets/images/home.png")}
        />
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 24,
          }}
        >
          <Heading
            title="Looks like you just landed,follow some profile to explore feed"
            style={{
              fontSize: 16,
              color: white[200],
              fontWeight: "600",
              alignSelf: "flex-start",
              textAlign: "center",
              marginBottom: 24,
            }}
          />
          <Button
            title="Explore"
            icon={<Icon name="arrowForward" size={16} color={black[500]} />}
            iconPosition="right"
            width={"auto"}
            bg={white[800]}
            px={24}
            py={8}
            textStyle={{
              color: black[500],
              fontSize: 16,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
