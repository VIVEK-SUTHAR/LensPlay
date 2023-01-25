import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useThemeStore } from "../store/Store";
import NewVideoCard from "../components/NewVideoCard";
import VideoCard from "../components/VideoCard";

const UserVideos = ({ navigation, route }) => {
  const videos = route.params.videos;
  const theme = useThemeStore();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.title,
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={false}
            colors={[theme.PRIMARY]}
            progressBackgroundColor={"black"}
          />
        }
        renderItem={({ item }) => (
          <>
            <VideoCard
              id={item?.id}
              title={item?.metadata?.name}
              date={item.createdAt}
              playbackId={item?.metadata?.media[0]?.original?.url}
              banner={item?.metadata?.cover}
              avatar={item?.profile?.picture?.original?.url}
              uploadedBy={item?.profile?.name || item.root.profile.handle}
              stats={item?.stats}
              isFollowdByMe={item.profile.isFollowedByMe}
              profileId={item?.profile?.id}
              reaction={item?.reaction}
              description={item?.metadata?.description}
              attributes={item?.metadata?.attributes}
            />
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default UserVideos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
