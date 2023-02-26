import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { RootStackScreenProps } from "../types/navigation/types";
import { useProfile, useThemeStore } from "../store/Store";
import { useFollowers } from "../hooks/useFeed";
import ProfileCard from "../components/ProfileCard";
import { useFollowing } from "../hooks/useFeed";
import Heading from "../components/UI/Heading";
import { Feather } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileCardSkeleton from "../components/UI/ProfileCardSkeleton";
const StatsTab = createMaterialTopTabNavigator();

const UserStats = ({ navigation }: RootStackScreenProps<"UserStats">) => {
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
            <Feather
              name="arrow-left"
              color={theme.PRIMARY}
              size={24}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Heading
              title={`Your ${headerTitle}`}
              style={{
                color: theme.PRIMARY,
                fontSize: 24,
                fontWeight: "500",
                marginHorizontal: 4,
                marginBottom: 4
              }}
            />
          </View>
        );
      },
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatsTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.PRIMARY,
          tabBarStyle: {
            backgroundColor: "black",
          },
          tabBarPressColor: theme.PRIMARY,
          tabBarIndicatorStyle: {
            borderRadius: 4,
            backgroundColor: theme.PRIMARY,
          },
          tabBarLabelStyle: {
            textTransform: "capitalize",
            fontSize: 14,
          },
        }}
      >
        <StatsTab.Screen
          name="Subscribers"
          component={SuscriberList}
          options={{
            tabBarLabel: "Subscribers",
          }}
        />
        <StatsTab.Screen
          name="Subscriptions"
          component={SubscriptionsList}
          options={{
            tabBarLabel: "Subscriptions",
          }}
        />
      </StatsTab.Navigator>
    </SafeAreaView>
  );
};
const SuscriberList = () => {
  const { currentProfile } = useProfile();
  const { data, error, loading } = useFollowers(currentProfile?.id);
  if (loading) return <Loader />;

  if (data) {
    return (
      <View style={{ backgroundColor: "black", minHeight: '100%' }}>
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

const SubscriptionsList = () => {
  const { currentProfile } = useProfile();
  const { data, error, loading } = useFollowing(currentProfile?.ownedBy);
  if (loading) return <Loader />;
  if (data) {
    return (
      <View style={{ backgroundColor: "black", minHeight: '100%' }}>
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


const Loader = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <ProfileCardSkeleton/>
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
