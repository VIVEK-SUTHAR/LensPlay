import React, { useLayoutEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import ErrorMessage from "../../../components/common/ErrorMesasge";
import Skeleton from "../../../components/common/Skeleton";
import ProfileCard from "../../../components/ProfileCard";
import ProfileCardSkeleton from "../../../components/UI/ProfileCardSkeleton";
import Tabs, { Tab } from "../../../components/UI/Tabs";
import { useAuthStore, useProfile, useThemeStore } from "../../../store/Store";
import {
  Follower,
  MediaSet,
  useAllFollowersQuery,
  useAllFollowingQuery,
} from "../../../types/generated";
import { RootStackScreenProps } from "../../../types/navigation/types";
import getRawurl from "../../../utils/getRawUrl";

const UserStats = ({ navigation }: RootStackScreenProps<"UserStats">) => {
  const { currentProfile } = useProfile();

  useLayoutEffect(
    React.useCallback(() => {
      navigation.setOptions({
        title: currentProfile?.name || currentProfile?.handle,
      });
    }, []),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <Tabs>
        <Tab.Screen
          name="Subscribers"
          component={SuscriberList}
          options={{
            tabBarLabel: "Subscribers",
          }}
        />
        <Tab.Screen
          name="Subscriptions"
          component={SubscriptionsList}
          options={{
            tabBarLabel: "Subscriptions",
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

const ITEM_HEIGHT = 70;

const getItemLayout = (_: any, index: number) => {
  return {
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  };
};

const Suscribers = () => {
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();
  const { PRIMARY } = useThemeStore();
  const request = { profileId: currentProfile?.id, limit: 30 };

  const { data, error, loading, fetchMore } = useAllFollowersQuery({
    variables: {
      request,
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });

  const subscribers = data?.followers?.items as Follower[];
  const pageInfo = data?.followers?.pageInfo;

  const keyExtractor = (item: Follower) =>
    item?.wallet?.defaultProfile?.id || item?.wallet?.address;

  const onEndCallBack = React.useCallback(() => {
    if (!pageInfo?.next) {
      return;
    }
    fetchMore({
      variables: {
        request: {
          ...request,
          cursor: pageInfo?.next,
        },
      },
    }).catch((err) => {});
  }, [pageInfo?.next]);
  const _MoreLoader = () => {
    return pageInfo?.next ? (
      <View
        style={{
          height: ITEM_HEIGHT,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"small"} color={PRIMARY} />
      </View>
    ) : (
      <ErrorMessage message="No more Videos to load" withImage={false} />
    );
  };

  const MoreLoader = React.memo(_MoreLoader);

  const renderItem = ({ item }: { item: Follower }) => {
    return (
      <ProfileCard
        profileIcon={getRawurl(item?.wallet?.defaultProfile?.picture)}
        profileName={item?.wallet?.defaultProfile?.name}
        handle={item?.wallet?.defaultProfile?.handle}
        profileId={item?.wallet?.defaultProfile?.id}
        owner={item?.wallet?.address}
        isFollowed={false}
      />
    );
  };

  if (loading)
    return <Skeleton children={<ProfileCardSkeleton />} number={10} />;
  if (data?.followers?.items?.length === 0)
    return (
      <ErrorMessage
        message="Looks like you don't have any subscribers"
        withImage
      />
    );
  if (data) {
    return (
      <View style={{ backgroundColor: "black", minHeight: "100%", padding: 8 }}>
        <FlatList
          data={subscribers}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          ListFooterComponent={<MoreLoader />}
          onEndReached={onEndCallBack}
          onEndReachedThreshold={0.1}
          removeClippedSubviews={true}
          renderItem={renderItem}
        />
      </View>
    );
  }
  return null;
};

const SuscriberList = React.memo(Suscribers);

const Subscriptions = () => {
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();

  const { data, error, loading } = useAllFollowingQuery({
    variables: {
      request: {
        address: currentProfile?.ownedBy,
      },
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });

  if (loading)
    return <Skeleton children={<ProfileCardSkeleton />} number={10} />;

  if (data) {
    return (
      <View style={{ backgroundColor: "black", minHeight: "100%" }}>
        <FlatList
          data={data.following.items}
          getItemLayout={getItemLayout}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <ProfileCard
                handle={item?.profile?.handle}
                profileName={item?.profile?.name}
                profileIcon={getRawurl(item?.profile?.picture as MediaSet)}
                profileId={item?.profile?.id}
                owner={item?.profile?.handle}
                isFollowed={item?.profile?.isFollowedByMe}
              />
            );
          }}
        />
      </View>
    );
  }
  return null;
};

const SubscriptionsList = React.memo(Subscriptions);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  topBarTab: {
    height: Dimensions.get("window").height * 0.05,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.5,
  },
  SkletonContainer: {
    backgroundColor: "black",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 4,
  },
  SkletonAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#232323",
  },
  SkletonText: {
    marginLeft: 8,
    width: "40%",
    height: 16,
    borderRadius: 3,
    backgroundColor: "#232323",
  },
});
export default UserStats;
