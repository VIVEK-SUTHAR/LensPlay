import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { RootStackScreenProps } from "../types/navigation/types";
import { useProfile, useThemeStore } from "../store/Store";
import { useFollowers } from "../hooks/useFeed";
import ProfileCard from "../components/ProfileCard";

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
  const { currentProfile } = useProfile();
  const { data, error, loading } = useFollowers(currentProfile?.id);

  const [headerTitle, setHeaderTitle] = useState<string>("Subscribers");
  const [isSubscribers, setIsSubscribers] = useState<boolean>(true);
//   console.log(data);
//   var profileIconUrl=(data.followers.items[0].wallet.defaultProfile.picture?.original.url);
  
  
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
      {isSubscribers ? (
        <View style={{ width: "100%", height: "100%", backgroundColor: "red" }}>
          <FlatList
            data={data?.followers?.items}
            keyExtractor={(index) => index}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={refreshing}
            //     onRefresh={() => {}}
            //     colors={[theme.PRIMARY]}
            //     progressBackgroundColor={"black"}
            //   />
            // }
            renderItem={({ item }) => (
              <ProfileCard profileIcon={item?.wallet?.defaultProfile.picture?.original.url} profileName={item?.wallet?.defaultProfile?.name} handle={item?.wallet?.defaultProfile?.handle}
			   />
            )}
          />
        </View>
      ) : (
        <View style={{ width: 400, height: 400, backgroundColor: "green" }} />
      )}
    </SafeAreaView>
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
});

export default UserStats;
