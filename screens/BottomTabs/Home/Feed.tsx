import { FlashList } from "@shopify/flash-list";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import ErrorMessage from "../../../components/common/ErrorMesasge";
import Skeleton from "../../../components/common/Skeleton";
import Icon from "../../../components/Icon";
import { data } from "../../../components/Login/data";
import PleaseLogin from "../../../components/PleaseLogin";
import Button from "../../../components/UI/Button";
import Heading from "../../../components/UI/Heading";
import VideoCardSkeleton from "../../../components/UI/VideoCardSkeleton";
import VideoCard from "../../../components/VideoCard";
import { SOURCES } from "../../../constants";
import { black, white } from "../../../constants/Colors";
import { HOME } from "../../../constants/tracking";
import { useGuestStore } from "../../../store/GuestStore";
import { useAuthStore, useProfile, useThemeStore } from "../../../store/Store";
import {
  FeedEventItemType,
  FeedItem,
  FeedItemRoot,
  PublicationMainFocus,
  useFeedQuery,
} from "../../../types/generated";
import { RootTabScreenProps } from "../../../types/navigation/types";
import Logger from "../../../utils/logger";
import TrackAction from "../../../utils/Track";

const Feed = ({ navigation }: RootTabScreenProps<"Home">) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const theme = useThemeStore();
  const { accessToken } = useAuthStore();
  const { isGuest } = useGuestStore();
  const { currentProfile } = useProfile();

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

  const QueryRequest = {
    profileId: currentProfile?.id,
    limit: 10,
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    feedEventItemTypes: [FeedEventItemType.Post],
    sources: SOURCES,
  };

  const { data: Feeddata, error, loading, refetch, fetchMore } = useFeedQuery({
    variables: {
      request: QueryRequest,
      reactionRequest: {
        profileId: currentProfile?.id,
      },
    },
    fetchPolicy: "network-only",
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    try {
      refetch({
        request: QueryRequest,
      })
        .then(() => {
          setRefreshing(false);
        })
        .catch((err) => {});
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  }, []);

  const pageInfo = Feeddata?.feed.pageInfo;

  const keyExtractor = (item: FeedItem) => item?.root?.id?.toString();

  /**
   * This ITEM_HEIGHT refers to The height of rendering Component.
   * By specifying the height upfront, we are eliminating
   * the runtime calculation of item heights which is done By FlatList at runtime,
   * The more this value is accurate, the more optimizations
   * To Get Correct value,
   * 1).Open Dev-Tools
   * 2).Click on toggle Element Inspector
   * 3).Select the FlatList renderItem components
   * 4).See the value in Box-Model and set it accordingly
   */
  const ITEM_HEIGHT = 280;

  const onEndCallBack = React.useCallback(() => {
    if (!pageInfo?.next) {
      return;
    }
    fetchMore({
      variables: {
        request: {
          ...QueryRequest,
          cursor: pageInfo?.next,
        },
      },
    }).catch((err) => {});
  }, [pageInfo?.next]);

  const renderItem = ({ item }: { item: FeedItem }) => {
    if (!item.root.hidden) {
      return (
        <VideoCard
          key={`${item?.root?.id}-${item?.root?.createdAt}`}
          publication={item?.root as FeedItemRoot}
          id={item?.root?.id}
        />
      );
    }
    return null;
  };

  if (data) {
    TrackAction(HOME.SWITCH_HOME_TAB);
  }

  const _MoreLoader = () => {
    return (
      <>
        {pageInfo?.next ? (
          <View
            style={{
              height: 200,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"large"} color={theme.PRIMARY} />
          </View>
        ) : (
          <ErrorMessage message="No more Videos to load" withImage={false} />
        )}
      </>
    );
  };

  const MoreLoader = React.memo(_MoreLoader);

  const _RefreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[theme.PRIMARY]}
      progressBackgroundColor={"black"}
    />
  );

  if (isGuest) return <PleaseLogin />;
  if (error) {
    Logger.Error("e", error);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          refreshControl={_RefreshControl}
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NotFound navigation={navigation} />
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"black"} />
      {loading ? (
        <Skeleton children={<VideoCardSkeleton />} number={10} />
      ) : (
        <FlashList
          data={Feeddata?.feed.items as FeedItem[]}
          keyExtractor={keyExtractor}
          estimatedItemSize={280}
          removeClippedSubviews={true}
          onLoad={({ elapsedTimeInMs }) => {
            Logger.Warn(`Feed List Loading time ${elapsedTimeInMs} ms`);
          }}
          refreshControl={_RefreshControl}
          ListFooterComponent={<MoreLoader />}
          onEndReachedThreshold={0.7}
          onEndReached={onEndCallBack}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
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
