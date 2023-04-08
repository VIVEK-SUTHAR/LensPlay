import React, { useLayoutEffect } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useThemeStore } from "../store/Store";
import { RootStackScreenProps } from "../types/navigation/types";
import VideoCard from "../components/VideoCard";
import UploadCard from "../components/common/UploadCard";

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
      {/* <FlatList
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
      /> */}
      <UploadCard />
      {/* <MyVideoCard /> */}
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
