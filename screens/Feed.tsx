import React, { useEffect } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useState } from "react";
import VideoCard from "../components/VideoCard";
import useStore, {
  useAuthStore,
  useProfile,
  useThemeStore,
} from "../store/Store";
import { RootTabScreenProps } from "../types/navigation/types";
import VideoCardSkeleton from "../components/UI/VideoCardSkeleton";
import AnimatedLottieView from "lottie-react-native";
import Heading from "../components/UI/Heading";
import Button from "../components/UI/Button";
import { useFeed } from "../hooks/useFeed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { client } from "../apollo/client";
import verifyToken from "../apollo/Queries/verifyToken";
import getProfile from "../apollo/Queries/getProfile";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import refreshCurrentToken from "../apollo/mutations/refreshCurrentToken";
import storeData from "../utils/storeData";
import searchUser from "../api/zooTools/searchUser";
import { StatusBar } from "expo-status-bar";
const Feed = ({ navigation }: RootTabScreenProps<"Home">) => {
  const connector = useWalletConnect();
  const authStore = useAuthStore();
  const userStore = useProfile();
  const [callData, setCallData] = useState(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const theme = useThemeStore();
  const { hasAccess } = useStore();

  useEffect(() => {
    if (callData) {
      if (!hasAccess) {
        navigation.replace("Loader");
      } else {
        getData().then(() => {
          setCallData(false);
          setInterval(() => {
            updateTokens();
          }, 840000);
        });
      }
    }
  }, []);

  const updateTokens = async () => {
    const jsonValue = await AsyncStorage.getItem("@storage_Key");
    if (jsonValue) {
      const tokens = JSON.parse(jsonValue);
      const generatedTime = tokens.generatedTime;
      const currentTime = new Date().getTime();

      const minute = Math.floor(
        ((currentTime - generatedTime) % (1000 * 60 * 60)) / (1000 * 60)
      );
      if (minute < 25) {
        return;
      } else {
        const refreshToken = await client.mutate({
          mutation: refreshCurrentToken,
          variables: {
            rtoken: tokens.refreshToken,
          },
        });
        authStore.setAccessToken(refreshToken.data.refresh.accessToken);
        storeData(
          refreshToken.data.refresh.accessToken,
          refreshToken.data.refresh.refreshToken
        );
      }
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      if (jsonValue) {
        const tokens = JSON.parse(jsonValue);
        const isvaild = await client.query({
          query: verifyToken,
          variables: {
            token: tokens.accessToken,
          },
        });
        if (isvaild.data.verify) {
          authStore.setAccessToken(tokens.accessToken);
          const data = await client.query({
            query: getProfile,
            variables: {
              ethAddress: connector.accounts[0],
            },
          });
          if (!data.data.defaultProfile) {
            return;
          }
          userStore.setCurrentProfile(data.data.defaultProfile);
          //   setIsloading(false);
          //   navigation.navigate("Root");
        }
        if (isvaild.data.verify === false) {
          const refreshToken = await client.mutate({
            mutation: refreshCurrentToken,
            variables: {
              rtoken: tokens.refreshToken,
            },
          });
          authStore.setAccessToken(refreshToken.data.refresh.accessToken);
          storeData(
            refreshToken.data.refresh.accessToken,
            refreshToken.data.refresh.refreshToken
          );
          const data = await client.query({
            query: getProfile,
            variables: {
              ethAddress: connector.accounts[0],
            },
          });
          if (!data.data.defaultProfile) {
            return;
          }
          userStore.setCurrentProfile(data.data.defaultProfile);
        }
      } else {
        // setIsloading(false);
        navigation.replace("Login");
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log("Something went wrong", e);
      }
    }
  };

  const { data: Feeddata, error, loading } = useFeed();
  if (callData) return <Loader />;
  if (!callData && loading) return <Loader />;

  if (error) return <NotFound navigation={navigation} />;

  if (!Feeddata) return <NotFound navigation={navigation} />;

  if (Feeddata) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="black"></StatusBar>
        <FlatList
          data={Feeddata.feed.items}
          keyExtractor={(item) => item.root.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {}}
              colors={[theme.PRIMARY]}
              progressBackgroundColor={"black"}
            />
          }
          renderItem={({ item }) => {
            return (
              <VideoCard
                id={item?.root?.id}
                title={item?.root?.metadata?.name}
                date={item.root.createdAt}
                playbackId={item?.root?.metadata?.media[0]?.original?.url}
                banner={item?.root?.metadata?.cover}
                avatar={item?.root?.profile?.picture?.original?.url}
                uploadedBy={
                  item?.root?.profile?.name || item.root.profile.handle
                }
                stats={item?.root?.stats}
                isFollowdByMe={item.root.profile.isFollowedByMe}
                profileId={item?.root?.profile?.id}
                reaction={item?.root?.reaction}
                description={item?.root?.metadata?.description}
                attributes={item?.root?.metadata?.attributes}
                ethAddress={item?.root?.profile?.ownedBy}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  }
};
export default Feed;

const NotFound = ({ navigation }: { navigation: any }) => {
  const theme = useThemeStore();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimatedLottieView
          autoPlay
          style={{
            height: "auto",
          }}
          source={require("../assets/notfound.json")}
        />
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Heading
            title="Looks like you just landed,follow some profile to view your feed"
            style={{
              fontSize: 16,
              color: "white",
              marginVertical: 5,
              marginHorizontal: 15,
              fontWeight: "600",
              alignSelf: "flex-start",
              textAlign: "center",
            }}
          />
          <Button
            title="Explore Feed"
            width={"auto"}
            type="outline"
            borderColor={theme.PRIMARY}
            px={16}
            my={8}
            textStyle={{
              color: "white",
              fontSize: 20,
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

const Loader = () => (
  <SafeAreaView style={styles.container}>
    <VideoCardSkeleton />
    <VideoCardSkeleton />
    <VideoCardSkeleton />
    <VideoCardSkeleton />
    <VideoCardSkeleton />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
