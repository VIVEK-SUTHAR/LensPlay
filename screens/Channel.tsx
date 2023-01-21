import {
  Image,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import getIPFSLink from "../utils/getIPFSLink";
import { SafeAreaView } from "react-native-safe-area-context";
import { dark_secondary, primary } from "../constants/Colors";
import Heading from "../components/UI/Heading";
import SubHeading from "../components/UI/SubHeading";
import VideoCard from "../components/VideoCard";
import { useAuthStore } from "../store/Store";
import { client } from "../apollo/client";
import getUserProfile from "../apollo/Queries/getUserProfile";
import getPublications from "../apollo/Queries/getPublications";
import Avatar from "../components/UI/Avatar";
import convertDate from "../utils/formateDate";
import { STATIC_ASSET } from "../constants";
import AnimatedLottieView from "lottie-react-native";
import Skleton from "../components/Skleton";
import extractURLs from "../utils/extractURL";
import createSubScribe from "../api/freeSubScribe";
import { RootStackScreenProps } from "../types/navigation/types";
import Button from "../components/UI/Button";
import { ResizeMode } from "expo-av";
import { Profile } from "../types/Lens";
import { LensPublication } from "../types/Lens/Feed";

const Channel = ({ navigation, route }: RootStackScreenProps<"Channel">) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [allVideos, setallVideos] = useState([]);
  const [alreadyFollowing, setAlreadyFollowing] = useState<boolean | undefined>(
    route.params.isFollowdByMe
  );
  const [isLoading, setIsLoading] = useState(true);
  const authStore = useAuthStore();
  useEffect(() => {
    getProfleInfo();
    navigation.setOptions({
      headerTitle: route.params.name,
    });
  }, []);

  const getProfleInfo = async () => {
    try {
      setIsLoading(true);
      const profiledata = await client.query({
        query: getUserProfile,
        variables: {
          id: route.params.profileId,
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${authStore.accessToken}`,
          },
        },
      });
      setProfile(profiledata.data.profile);
      setAlreadyFollowing(profiledata.data.profile.isFollowedByMe);
      const getUserVideos = await client.query({
        query: getPublications,
        variables: {
          id: route.params.profileId,
        },
      });
      setallVideos(getUserVideos.data.publications.items);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProfleInfo().then(() => {
      if (profile == profile) {
        ToastAndroid.show("Channel is Up-to date", ToastAndroid.SHORT);
      }
      setRefreshing(false);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={[primary]}
            progressBackgroundColor={dark_secondary}
            onRefresh={onRefresh}
          />
        }
      >
        {Boolean(!isLoading) && (
          <View style={{ paddingHorizontal: 10 }}>
            <View
              style={{
                height: 150,
                alignItems: "flex-start",
                marginBottom: 30,
              }}
            >
              <Image
                source={{
                  uri:
                    getIPFSLink(profile?.coverPicture?.original.url) ||
                    STATIC_ASSET,
                }}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 10,
                  resizeMode: ResizeMode.STRETCH,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
                marginTop: "-20%",
              }}
            >
              <Avatar
                src={getIPFSLink(profile?.picture.original.url)}
                height={100}
                width={100}
              />
            </View>
            <View style={{ padding: 4, alignItems: "center" }}>
              <Heading
                title={profile?.name}
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              />
              <SubHeading
                title={`@${profile?.handle} · ${profile?.stats?.totalFollowing} Subscribers · ${allVideos.length} Videos`}
                style={{ fontSize: 12, color: "white", marginTop: 2 }}
              />
              <SubHeading
                title={extractURLs(profile?.bio)}
                style={{ fontSize: 14, color: "gray", textAlign: "center" }}
              />
            </View>
            <Button
              title={alreadyFollowing ? "Unsubscribe" : "Subscribe"}
              width={"auto"}
              px={12}
              my={4}
              type={alreadyFollowing ? "outline" : "filled"}
              bg={alreadyFollowing ? "transparent" : "white"}
              textStyle={{
                fontSize: 16,
                fontWeight: "700",
                color: alreadyFollowing ? "white" : "black",
              }}
              borderColor={alreadyFollowing ? primary : "white"}
              onPress={async () => {
                try {
                  const data = await createSubScribe(
                    route.params.profileId,
                    authStore.accessToken
                  );
                  if (data.data === null) {
                    console.log(data.errors[0].message);

                    ToastAndroid.show(
                      "Currenctly not supported",
                      ToastAndroid.SHORT
                    );
                  }
                  if (data.data.proxyAction) {
                    ToastAndroid.show(
                      "Subscribed Successfully",
                      ToastAndroid.SHORT
                    );
                  }
                } catch (error) {
                  if (error instanceof Error) {
                  }
                }
              }}
            />
            <View style={{ paddingVertical: 10 }}>
              <Heading
                title="Videos"
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "white",
                }}
              />
              {allVideos?.map((item: LensPublication) => {
                return (
                  <VideoCard
                    key={item?.id}
                    id={item?.id}
                    date={convertDate(item?.createdAt.toString())}
                    banner={item?.metadata?.cover}
                    title={item?.metadata?.name}
                    avatar={item?.profile?.picture?.original?.url}
                    playbackId={item?.metadata?.media[0]?.original?.url}
                    uploadedBy={item?.profile?.name || item?.profile?.handle}
                    profileId={item?.profile?.id}
                    stats={item?.stats}
                    isFollowdByMe={item?.profile.isFollowedByMe}
                    reaction={item?.reaction}
                  />
                );
              })}
            </View>
          </View>
        )}
        {Boolean(isLoading) && (
          <View
            style={{
              height: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AnimatedLottieView
              autoPlay
              style={{
                height: "auto",
              }}
              source={require("../assets/skeleton.json")}
            />

            <Skleton />
            <Skleton />
            <Skleton />
          </View>
        )}
        {allVideos.length === 0 && (
          <View style={{ maxHeight: 250 }}>
            <AnimatedLottieView
              autoPlay
              hardwareAccelerationAndroid={true}
              style={{
                height: "90%",
                alignSelf: "center",
              }}
              source={require("../assets/notfound.json")}
            />
            <Heading
              title={`Seems like ${
                profile?.name || profile?.handle?.split(".")[0]
              } has not uploaded any video`}
              style={{
                color: "gray",
                fontSize: 12,
                textAlign: "center",
              }}
            ></Heading>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Channel;
