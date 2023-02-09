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
import StyledText from "../components/UI/StyledText";
import Heading from "../components/UI/Heading";
import { Feather } from "@expo/vector-icons";

const UserStats = ({ navigation }: RootStackScreenProps<"UserStats">) => {
  const [headerTitle, setHeaderTitle] = useState<string>("Subscribers");
  const [isSubscribers, setIsSubscribers] = useState<boolean>(true);

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
              size={22}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Heading
              title={`Your ${headerTitle}`}
              style={{
                color: theme.PRIMARY,
                fontSize: 22,
                fontWeight: "500",
                marginHorizontal: 4,
              }}
            />
          </View>
        );
      },
    });
  });

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
          <StyledText
            title="Subscribers"
            style={{
              color: isSubscribers ? theme.PRIMARY : "white",
              fontWeight: isSubscribers ? "700" : "400",
            }}
          ></StyledText>
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
          <StyledText
            title="Subscriptions"
            style={{
              color: !isSubscribers ? theme.PRIMARY : "white",
              fontWeight: !isSubscribers ? "700" : "400",
            }}
          />
        </Pressable>
      </View>
      {isSubscribers ? (
        <SuscriberList
          isSubscribers={isSubscribers}
          setScreen={setIsSubscribers}
        />
      ) : (
        <SubscriptionsList
          isSubscribers={isSubscribers}
          setScreen={setIsSubscribers}
        />
      )}
    </SafeAreaView>
  );
};

type TabProps = {
  isSubscribers: boolean;
  setScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SuscriberList = ({ isSubscribers, setScreen }: TabProps) => {
  const { currentProfile } = useProfile();
  const { data, error, loading } = useFollowers(currentProfile?.id);
  const [pagey, setPagey] = useState<number>(0);
  if (loading) {
    return (
      <>
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
      </>
    );
  }
  if (data) {
    return (
      <View
        onTouchStart={(e) => {
          setPagey(e.nativeEvent.pageX);
        }}
        onTouchEnd={(e) => {
          if (pagey - e.nativeEvent.pageX > 10) {
            if (isSubscribers) {
              setScreen(false);
            }
          }
        }}
      >
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

const SubscriptionsList = ({ isSubscribers, setScreen }: TabProps) => {
  const { currentProfile } = useProfile();
  const { data, error, loading } = useFollowing(currentProfile?.ownedBy);
  const [pagex, setPagex] = useState(0);

  if (loading) {
    return (
      <>
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
      </>
    );
  }

  if (data) {
    return (
      <>
        <View
          onTouchStart={(e) => {
            setPagex(e.nativeEvent.pageX);
          }}
          onTouchEnd={(e) => {
            if (
              pagex - e.nativeEvent.pageX > 0 ||
              pagex - e.nativeEvent.pageX < 0
            ) {
              if (!isSubscribers) {
                setScreen(true);
              }
            }
          }}
        >
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
      </>
    );
  }
  return <></>;
};

const ProfileCardSkeleton = () => {
  return (
    <View style={styles.SkletonContainer}>
      <View style={styles.SkletonAvatar} />
      <View style={styles.SkletonText}></View>
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
