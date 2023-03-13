import React from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useState } from "react";
import VideoCard from "../components/VideoCard";
import { useThemeStore } from "../store/Store";
import { RootTabScreenProps } from "../types/navigation/types";
import VideoCardSkeleton from "../components/UI/VideoCardSkeleton";
import AnimatedLottieView from "lottie-react-native";
import Heading from "../components/UI/Heading";
import Button from "../components/UI/Button";
import { useFeed } from "../hooks/useFeed";
import { StatusBar } from "expo-status-bar";
import { useGuestStore } from "../store/GuestStore";
import PleaseLogin from "../components/PleaseLogin";

const Feed = ({ navigation }: RootTabScreenProps<"Home">) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const theme = useThemeStore();
  const { isGuest } = useGuestStore();

  const { data: Feeddata, error, loading, refetch } = useFeed();

  if (isGuest) return <PleaseLogin />;
  if (loading) return <Loader />;
  if (error) return <NotFound navigation={navigation} />;
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
              onRefresh={() => {}}
              colors={[theme.PRIMARY]}
              progressBackgroundColor={"black"}
            />
          }
          renderItem={({ item }) => {
            return <VideoCard publication={item?.root} id={item?.root?.id} />;
          }}
        />
      </SafeAreaView>
    );
  }
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
          source={require("../assets/notfound.json")}
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
