import * as React from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { client } from "../apollo/client";
import getUserProfile from "../apollo/Queries/getUserProfile";
import useStore, {
  useAuthStore,
  useProfile,
  useThemeStore,
} from "../store/Store";
import getPublications from "../apollo/Queries/getPublications";
import VideoCard from "../components/VideoCard";
import convertDate from "../utils/formateDate";
import getIPFSLink from "../utils/getIPFSLink";
import Heading from "../components/UI/Heading";
import SubHeading from "../components/UI/SubHeading";
import Avatar from "../components/UI/Avatar";
import extractURLs from "../utils/extractURL";
import { RootTabScreenProps } from "../types/navigation/types";
import AnimatedLottieView from "lottie-react-native";
import Skleton from "../components/Skleton";
import ProfileSkeleton from "../components/UI/ProfileSkeleton";
import { primary, secondary } from "../constants/Colors";
const Profile = ({ navigation }: RootTabScreenProps<"Account">) => {
  const [profile, setProfile] = useState<{}>({});
  const [allVideos, setallVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const store = useStore();
  const theme = useThemeStore();
  const authStore = useAuthStore();
  const userStore = useProfile();
  useEffect(() => {
    getProfleInfo();
  }, [navigation]);
  const getProfleInfo = async () => {
    // setIsLoading(true);
    try {
      const profiledata = await client.query({
        query: getUserProfile,
        variables: {
          id: userStore.currentProfile?.id,
        },
      });
      setProfile(profiledata.data);
      store.setProfiledata(profiledata.data);
      const getUserVideos = await client.query({
        query: getPublications,
        variables: {
          id: userStore.currentProfile?.id,
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${authStore.accessToken}`,
          },
        },
      });
      setallVideos(getUserVideos.data.publications.items);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProfleInfo().then(() => {
      if (profile == profile) {
        ToastAndroid.show("Profile is Up-to date", ToastAndroid.SHORT);
      }
      setRefreshing(false);
    });
  }, []);
  console.log(profile?.profile?.stats);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={[theme.PRIMARY]}
            progressBackgroundColor={"black"}
            onRefresh={onRefresh}
          />
        }
      >
        {isLoading ? (
          <>
            <ProfileSkeleton />
          </>
        ) : (
          <>
            {Boolean(!isLoading) && (
              <View style={{ paddingHorizontal: 10, marginVertical: 10 }}>
                <View
                  style={{
                    height: 200,
                    alignItems: "flex-start",
                    marginBottom: 30,
                  }}
                >
                  <Image
                    source={{
                      uri: getIPFSLink(
                        profile?.profile?.coverPicture?.original?.url
                      ),
                    }}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      resizeMode: "cover",
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: 'flex-start',
                    marginLeft: 8,
                    marginTop: "-20%",
                  }}
                >
                  <Avatar
                    src={getIPFSLink(profile?.profile?.picture?.original?.url)}
                    height={100}
                    width={100}
                    borderRadius={25}
                    borderColor={primary}
                    borderWidth={2}
                  />
                  <View style={{ marginTop: '14%', marginLeft: 16 }}>
                    <Heading
                      title={profile?.profile?.name}
                      style={{ fontSize: 24, fontWeight: "bold", color: "white" }}
                    />
                    <SubHeading
                      title={`@${profile?.profile?.handle}`}
                      style={{ fontSize: 14, color: "white", opacity: 0.95 }}
                    />
                  </View>
                </View>
                <View style={{ padding: 8, alignItems: "flex-start", marginLeft: 8, marginTop: 4 }}>

                </View>
                <View style={{ padding: 4, alignItems: "center" }}>
                  <Heading
                    title={profile?.profile?.name}
                    style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                  />
                  <SubHeading
                    title={`@${profile?.profile?.handle} · ${profile?.profile?.stats?.totalFollowers
                      } Subscribers · ${allVideos?.length} Video${allVideos.length > 1 ? "s" : ""
                      } `}
                    style={{ fontSize: 12, color: "white", marginTop: 2 }}
                  />
                  <SubHeading
                    title={extractURLs(profile?.profile?.bio)}
                    style={{ fontSize: 16, color: "gray", textAlign: "left" }}
                  />
                  <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                    <View>
                      <SubHeading title={profile?.profile?.stats?.totalFollowers} style={{ color: primary, fontSize: 24, textAlign: 'center', fontWeight: '800' }} />
                      <SubHeading title='Subscribers' style={{ color: secondary, textAlign: 'center', marginTop: 2, fontWeight: '800', fontSize: 16, opacity: 0.7 }} />
                    </View>
                    <View style={{
                      height: '100%',
                      width: 1,
                      backgroundColor: primary,
                    }}></View>
                    <View>
                      <SubHeading title={allVideos?.length} style={{ color: primary, fontSize: 24, textAlign: 'center', fontWeight: '800' }} />
                      <SubHeading title='Video' style={{ color: secondary, textAlign: 'center', marginTop: 2, fontWeight: '800', fontSize: 16, opacity: 0.7 }} />
                    </View>
                    <View style={{
                      height: '100%',
                      width: 1,
                      backgroundColor: primary,
                    }}></View>
                    <View>
                      <SubHeading title={profile?.profile?.stats?.totalFollowing} style={{ color: primary, fontSize: 24, textAlign: 'center', fontWeight: '800' }} />
                      <SubHeading title='Following' style={{ color: secondary, textAlign: 'center', marginTop: 2, fontWeight: '800', fontSize: 16, opacity: 0.7 }} />
                    </View>
                  </View>
                </View>
                <View style={{ paddingVertical: 10 }}>
                  <Heading
                    title="Videos"
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      color: "white",
                    }}
                  />
                  {Boolean(allVideos) &&
                    allVideos.map((item: any) => {
                      if (item?.appId?.includes("lenstube")) {
                        return (
                          <VideoCard
                            key={item?.id}
                            id={item?.id}
                            date={convertDate(item?.createdAt)}
                            banner={item?.metadata?.cover}
                            title={item?.metadata?.name}
                            avatar={item?.profile?.picture?.original?.url}
                            playbackId={item?.metadata?.media[0]?.original?.url}
                            uploadedBy={item?.profile?.name}
                            profileId={item?.profile?.id}
                            stats={item?.stats}
                            isFollowdByMe={item.profile.isFollowedByMe}
                            reaction={item?.reaction}
                          />
                        );
                      }
                    })}
                </View>
              </View>
            )}
          </>
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
            {/* <Skleton />
            <Skleton />
            <Skleton /> */}
          </View>
        )}
        {!allVideos && (
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
              title={`Seems like ${profile?.profile?.name ||
              title={`Seems like ${profile?.profile?.name ||
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
        {/* <ProfileSkeleton/> */}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;
