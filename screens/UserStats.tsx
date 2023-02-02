import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { RootStackScreenProps } from "../types/navigation/types";
import { useProfile, useThemeStore } from "../store/Store";
import { useFollowers } from "../hooks/useFeed";
import ProfileCard from "../components/ProfileCard";
import { useFollowing } from "../hooks/useFeed";
import { dark_primary } from "../constants/Colors";

const UserStats = ({
  navigation,
  route,
}: RootStackScreenProps<"UserStats">) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Your " + headerTitle,
    });
  });
  const theme = useThemeStore();
  const [headerTitle, setHeaderTitle] = useState<string>("Subscribers");
  const [isSubscribers, setIsSubscribers] = useState<boolean>(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarTab}>
        <Pressable
          android_ripple={{
            radius: 10,
            color: "gray",
          }}
          style={[
            styles.tab,
            {
              borderBottomWidth: isSubscribers ? 1 : 0,

              borderBottomColor: isSubscribers ? theme.PRIMARY : "red",
            },
          ]}
          onPress={() => {
            setIsSubscribers(true);
            setHeaderTitle("Subscribers");
          }}
        >
          <Text
            style={{
              color: isSubscribers ? theme.PRIMARY : "white",
              fontWeight: isSubscribers ? "700" : "400",
            }}
          >
            Subscribers
          </Text>
        </Pressable>
        <Pressable
          android_ripple={{
            radius: 10,
            color: "gray",
          }}
          style={[
            styles.tab,
            {
              borderBottomWidth: !isSubscribers ? 1 : 0,
              borderBottomColor: !isSubscribers ? theme.PRIMARY : "transparent",
            },
          ]}
          onPress={() => {
            setIsSubscribers(false);
            setHeaderTitle("Subscriptions");
          }}
        >
          <Text
            style={{
              color: !isSubscribers ? theme.PRIMARY : "white",
              fontWeight: !isSubscribers ? "700" : "400",
            }}
          >
            Subscriptions
          </Text>
        </Pressable>
      </View>
      {isSubscribers ? <SuscriberList /> : <SubscriptionsList />}
    </SafeAreaView>
  );
};

const SuscriberList = () => {
  const { currentProfile } = useProfile();
  const { data, error, loading } = useFollowers(currentProfile?.id);

  if (loading) {
    return (
      <>
        <ProfileCardSkeleton/>
        <ProfileCardSkeleton/>
        <ProfileCardSkeleton/>
        <ProfileCardSkeleton/>
        <ProfileCardSkeleton/>
        <ProfileCardSkeleton/>
        <ProfileCardSkeleton/>
        <ProfileCardSkeleton/>
        <ProfileCardSkeleton/>
      </>
    );
  }
  if (data) {
    return (
      <FlatList
        data={data?.followers?.items}
        keyExtractor={(_, index) => index.toString()}
        style={{
          padding: 8,
        }}
        renderItem={({ item }) => (
          <ProfileCard
            profileIcon={item?.wallet?.defaultProfile.picture?.original.url}
            profileName={item?.wallet?.defaultProfile?.name}
            handle={item?.wallet?.defaultProfile?.handle}
          />
        )}
      />
    );
  }
  return <></>;
};

const SubscriptionsList = () => {
  const { currentProfile } = useProfile();
  const { data, error, loading } = useFollowing(currentProfile?.ownedBy);

  if (loading) {
    return (
      <>
        <ProfileCardSkeleton/>
        <ProfileCardSkeleton/>
        <ProfileCardSkeleton/>
        <ProfileCardSkeleton/>
        <ProfileCardSkeleton/>
        <ProfileCardSkeleton/>
        <ProfileCardSkeleton/>
        <ProfileCardSkeleton/>
        <ProfileCardSkeleton/>
      </>
    );
  }

  if (data) {
    return (
      <>
        <FlatList
          data={data.following.items}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <ProfileCard
                handle={item.profile.handle}
                profileName={item.profile?.name}
                profileIcon={item.profile?.picture?.original?.url}
              />
            );
          }}
        />
      </>
    );
  }
  return <></>;
};

const ProfileCardSkeleton=()=>{
  return <>
              <View
            style={{
              backgroundColor: 'black',
              borderRadius: 16,
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              marginVertical: 4,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                backgroundColor: "#232323",
              }}
            />
            <View
              style={{
                marginLeft: 8,
                width:"40%",
                height:16,
                borderRadius:3,
                backgroundColor:'#232323'
              }}
            ></View>
          </View>
  </>
}

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
});

export default UserStats;
