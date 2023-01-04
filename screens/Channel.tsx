import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import getIPFSLink from "../utils/getIPFSLink";
import { SafeAreaView } from "react-native-safe-area-context";
import { dark_primary, dark_secondary, primary } from "../constants/Colors";
import Heading from "../components/UI/Heading";
import SubHeading from "../components/UI/SubHeading";
import VideoCard from "../components/VideoCard";
import useStore from "../store/Store";
import { client } from "../apollo/client";
import getUserProfile from "../apollo/Queries/getUserProfile";
import getPublications from "../apollo/Queries/getPublications";
import Avatar from "../components/UI/Avatar";
import convertDate from "../utils/formateDate";
import { STATIC_ASSET } from "../constants";
import AnimatedLottieView from "lottie-react-native";
import Skleton from "../components/Skleton";
import extractURLs from "../utils/extractURL";
import isFollowedByMe from "../api/isFollowedByMe";
import createSubScribe from "../api/freeSubScribe";
import { RootStackScreenProps } from "../types/navigation/types";
import Button from "../components/UI/Button";
import { ResizeMode } from "expo-av";

const Channel = ({ navigation, route }: RootStackScreenProps<"Channel">) => {
  const [profile, setProfile] = useState<{}>({});
  const [allVideos, setallVideos] = useState([]);
  const [isVideoAvilable, setIsVideoAvilable] = useState<boolean>(true);
  const [alreadyFollowing, setAlreadyFollowing] = useState<boolean | undefined>(
    false
  );
  const [isLoading, setIsLoading] = useState(true);
  const store = useStore();

  useEffect(() => {
    getProfleInfo();
    console.log(route.params.isFollowdByMe);
    setAlreadyFollowing(route.params.isFollowdByMe)
  }, [navigation, route.params.profileId]);
  async function checkFollowed(): Promise<void> {
    const data = await isFollowedByMe(
      route.params.profileId,
      store.accessToken
    );
    if (data.data.profile.isFollowedByMe) {
      setAlreadyFollowing(true);
      return;
    }
  }

  const getProfleInfo = async () => {
    try {
      setIsLoading(true);
      const profiledata = await client.query({
        query: getUserProfile,
        variables: {
          id: route.params.profileId,
        },
      });
      setProfile(profiledata.data);
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
      console.log(error);
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
                    getIPFSLink(
                      profile?.profile?.coverPicture?.original?.url
                    ) || STATIC_ASSET,
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
                src={getIPFSLink(profile?.profile?.picture?.original?.url)}
                height={100}
                width={100}
              />
            </View>
            <View style={{ padding: 4, alignItems: "center" }}>
              <Heading
                title={profile?.profile?.name}
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              />
              <SubHeading
                title={`@${profile?.profile?.handle} · ${profile?.profile?.stats?.totalFollowers} Subscribers · ${allVideos.length} Videos`}
                style={{ fontSize: 12, color: "white", marginTop: 2 }}
              />
              <SubHeading
                title={extractURLs(profile?.profile?.bio)}
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
                    store.accessToken
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
              {allVideos?.map((item, index) => {
                if (item.appId.includes("lenstube")) {
                  return (
                    <VideoCard
                      navigation={navigation}
                      key={item?.id}
                      id={item?.id}
                      date={convertDate(item?.createdAt)}
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
                }
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
                profile?.profile?.name ||
                profile?.profile?.handle?.split(".")[0]
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

const styles = StyleSheet.create({});
