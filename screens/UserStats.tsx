import React, { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  FlatList, SafeAreaView,
  StyleSheet, View
} from "react-native";
import Icon from "../components/Icon";
import ProfileCard from "../components/ProfileCard";
import Heading from "../components/UI/Heading";
import ProfileCardSkeleton from "../components/UI/ProfileCardSkeleton";
import Tabs, { Tab } from "../components/UI/Tabs";
import { useFollowers, useFollowing } from "../hooks/useFeed";
import { useProfile, useThemeStore } from "../store/Store";
import { RootStackScreenProps } from "../types/navigation/types";

const UserStats = ({
  navigation,
  route,
}: RootStackScreenProps<"UserStats">) => {
  const [headerTitle, setHeaderTitle] = useState<string>("Subscribers");
  const theme = useThemeStore();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="arrowLeft" color={theme.PRIMARY} />
            <Heading
              title={`Your ${headerTitle}`}
              style={{
                color: theme.PRIMARY,
                fontSize: 16,
                fontWeight: "600",
                marginHorizontal: 16,
              }}
            />
          </View>
        );
      },
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <Tabs>
        <Tab.Screen
          name="Subscribers"
          component={SuscriberList}
          listeners={{
            focus: () => {
              setHeaderTitle("Subscribers");
            },
          }}
          options={{
            tabBarLabel: "Subscribers",
          }}
        />
        <Tab.Screen
          name="Subscriptions"
          component={SubscriptionsList}
          listeners={{
            focus: () => {
              setHeaderTitle("Subscriptions");
            },
          }}
          options={{
            tabBarLabel: "Subscriptions",
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

const Suscribers = () => {
  const { currentProfile } = useProfile();
  const { data, error, loading } = useFollowers(currentProfile?.id);
  if (loading) return <Loader />;

  if (data) {
    return (
      <View style={{ backgroundColor: "black", minHeight: "100%" }}>
        <FlatList
          data={data?.followers?.items}
          keyExtractor={(_, index) => index.toString()}
          style={{
            padding: 8,
          }}
          renderItem={({ item }) => (
            <ProfileCard
              profileIcon={item?.wallet?.defaultProfile?.picture?.original?.url}
              profileName={item?.wallet?.defaultProfile?.name}
              handle={item?.wallet?.defaultProfile?.handle}
              profileId={item?.wallet?.defaultProfile?.id}
              owner={item?.wallet?.address}
              isFollowed={false}
            />
          )}
        />
      </View>
    );
  }
  return <></>;
};
const SuscriberList = React.memo(Suscribers);

const Subscriptions = () => {
  const { currentProfile } = useProfile();
  const { data, error, loading } = useFollowing(currentProfile?.ownedBy);
  if (loading) return <Loader />;
  if (data) {
    return (
      <View style={{ backgroundColor: "black", minHeight: "100%" }}>
        <FlatList
          data={data.following.items}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <ProfileCard
                handle={item?.profile?.handle}
                profileName={item?.profile?.name}
                profileIcon={item?.profile?.picture?.original?.url}
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
  return <></>;
};

const SubscriptionsList = React.memo(Subscriptions);

const Loader = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
      <ProfileCardSkeleton />
    </View>
  );
};

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
