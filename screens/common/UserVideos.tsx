import React, { useLayoutEffect } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import VideoCard from "../../components/VideoCard";
import UploadCard from "../../components/common/UploadCard";
import { useThemeStore } from "../../store/Store";
import { useUploadStore } from "../../store/UploadStore";
import { Post } from "../../types/generated";
import { RootStackScreenProps } from "../../types/navigation/types";
import MyVideoCard, {
  VideoActionSheet,
} from "../../components/common/MyVideoCard";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

const UserVideos = ({
  navigation,
  route,
}: RootStackScreenProps<"YourVideos">) => {
  const videos = route.params.videos;
  const theme = useThemeStore();
  const { uploadingStatus } = useUploadStore();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.title,
      headerTitleStyle: {
        fontSize: 16,
        fontWeight: "600",
      },
    });
  }, []);

  const actionSheetRef = React.useRef<BottomSheetMethods>(null);

  const [pubId, setPubId] = React.useState("");

  const handlePubId = React.useCallback((pubId: string) => {
    setPubId(pubId);
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        {uploadingStatus && <UploadCard />}
        <FlatList
          data={videos as Post[]}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={false}
              colors={[theme.PRIMARY]}
              progressBackgroundColor={"black"}
            />
          }
          renderItem={({ item }) => (
            <MyVideoCard
              publication={item}
              id={item.id}
              sheetRef={actionSheetRef}
              setPubId={handlePubId}
            />
          )}
        />
        <VideoActionSheet
          sheetRef={actionSheetRef}
          pubId={pubId}
          route={route}
        />
      </SafeAreaView>
    </>
  );
};

export default UserVideos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
