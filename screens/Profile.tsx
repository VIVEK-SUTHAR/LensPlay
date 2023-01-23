import * as React from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { client } from "../apollo/client";
import getUserProfile from "../apollo/Queries/getUserProfile";
import {
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
import ProfileSkeleton from "../components/UI/ProfileSkeleton";
import { primary, secondary } from "../constants/Colors";
import { LensPublication } from "../types/Lens/Feed";
import { Profile } from "../types/Lens";
import Button from "../components/UI/Button";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
const ProfileScreen = ({ navigation }: RootTabScreenProps<"Account">) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [allVideos, setallVideos] = useState<LensPublication[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      setProfile(profiledata.data.profile);
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
  const tags = ['Videos', 'Collected', 'Mirrored', 'Liked'];
  const currentTag = useState(['Videos']);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProfleInfo().then(() => {
      if (profile == profile) {
        ToastAndroid.show("Profile is Up-to date", ToastAndroid.SHORT);
      }
      setRefreshing(false);
    });
  }, []);

  const [afterScroll, setafterScroll] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar backgroundColor={afterScroll>5?'black':'transparent'} />
      <ScrollView
      onScroll={(event)=>{
        setafterScroll(event.nativeEvent.contentOffset.y)
      }}
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
              <View style={{}}>
                <View
                  style={{
                    height: 180,
                    marginBottom: 30,
                  }}
                >
                  <Image
                    source={{
                      uri: getIPFSLink(profile?.coverPicture?.original.url),
                    }}
                    style={{
                      height: "100%",
                      width: "100%",
                      resizeMode: "cover",
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginLeft: 18,
                    marginTop: "-25%",
                  }}
                >
                  <Avatar
                    src={getIPFSLink(profile?.picture.original.url)}
                    height={100}
                    width={100}
                    borderRadius={50}
                  />

                </View>
                <View style={{ marginHorizontal: 15, marginTop: 4 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Heading
                        title={profile?.name}
                        style={{
                          fontSize: 26,
                          fontWeight: "bold",
                          color: "#FAF7F7",
                        }}
                      />
                      <SubHeading
                        title={`@${profile?.handle}`}
                        style={{ fontSize: 14, color: "white", opacity: 0.7, marginTop: -4 }}
                      />
                    </View>
                    <View>
                      <Button
                        title={"Subscribe"}
                        width={"auto"}
                        px={28}
                        py={8}
                        bg={'#2AD95C'}
                        textStyle={{
                          fontSize: 16,
                          fontWeight: "700",
                          color: "black"
                        }}
                        // mx={12}
                        onPress={async () => {
                        }}
                      />
                    </View>
                  </View>
                  <SubHeading
                    title={extractURLs(profile?.bio)}
                    style={{ fontSize: 16, color: "#E9E8E8", textAlign: "left", marginTop: 4 }}
                  />
                  <View style={{ backgroundColor: 'white', borderRadius: 20, height: 38, marginTop: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%', justifyContent: 'space-around', paddingHorizontal: 16 }}>
                      <SubHeading title={`${profile?.stats?.totalFollowers} • Subscribers`} style={{ fontSize: 16, fontWeight: '600' }} />
                      <View style={{ height: 24, backgroundColor: 'black', width: 2 }}></View>
                      <SubHeading title={`${allVideos?.length} • Videos`} style={{ fontSize: 16, fontWeight: '600' }} />
                    </View>
                  </View>
                  <View style={{ marginTop: 24 }}>
                    <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Heading title={'Videos'} style={{ fontSize: 20, color: 'white', fontWeight: '600' }} />
                      <Feather
                        name={`chevron-right`}
                        size={24}
                        color="white"
                      />
                    </View>
                    <ScrollView horizontal={true} style={{ marginLeft: -12, marginTop: 8 }} showsHorizontalScrollIndicator={false}>
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
                                width={300}
                                height={150}
                              />
                            );
                          }
                        })}
                    </ScrollView>
                    </View>
                    <View style={{marginTop: 16}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Heading title={'Colllected Videos'} style={{ fontSize: 20, color: 'white', fontWeight: '600' }} />
                      <Feather
                        name={`chevron-right`}
                        size={24}
                        color="white"
                      />
                    </View>
                    <ScrollView horizontal={true} style={{ marginLeft: -12, marginTop: 8 }} showsHorizontalScrollIndicator={false}>
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
                                width={300}
                                height={150}
                              />
                            );
                          }
                        })}
                    </ScrollView>
                    </View>
                  </View>
                </View>


                {/* <View style={{ paddingVertical: 20 }}>
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
                </View> */}
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
              title={`Seems like ${profile?.name || profile?.handle?.split(".")[0]
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
export default ProfileScreen;
