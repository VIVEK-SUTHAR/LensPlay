import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useThemeStore } from "../store/Store";
import VideoCard from "../components/VideoCard";
import { RootStackScreenProps } from "../types/navigation/types";

const UserVideos = ({
  navigation,
  route,
}: RootStackScreenProps<"YourVideos">) => {
  const videos = route.params.videos;
  const theme = useThemeStore();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.title,
      headerTitleStyle: {
        fontSize: 16,
        fontWeight: "600",
      },
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
            <VideoCard publication={item} id={item?.id} />
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
