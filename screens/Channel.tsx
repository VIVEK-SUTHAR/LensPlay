import {
  Image,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import getIPFSLink from "../utils/getIPFSLink";
import { SafeAreaView } from "react-native-safe-area-context";
import Heading from "../components/UI/Heading";
import StyledText from "../components/UI/StyledText";
import VideoCard from "../components/VideoCard";
import { useAuthStore, useThemeStore, useToast } from "../store/Store";
import { client } from "../apollo/client";
import getUserProfile from "../apollo/Queries/getUserProfile";
import getPublications from "../apollo/Queries/getPublications";
import Avatar from "../components/UI/Avatar";
import AnimatedLottieView from "lottie-react-native";
import extractURLs from "../utils/extractURL";
import { RootStackScreenProps } from "../types/navigation/types";
import Button from "../components/UI/Button";
import { Profile } from "../types/Lens";
import { LensPublication } from "../types/Lens/Feed";
import getMirrorVideos from "../apollo/Queries/getMirrorVideos";
import getCollectVideos from "../apollo/Queries/getCollectVideos";
import ProfileSkeleton from "../components/UI/ProfileSkeleton";
import { createFreeSubscribe } from "../api";
import { ToastType } from "../types/Store";
import VERIFIED_CHANNELS from "../constants/Varified";
import VerifiedIcon from "../components/svg/VerifiedIcon";
import { STATIC_ASSET } from "../constants";
import Icon from "../components/Icon";
import formatHandle from "../utils/formatHandle";

const Channel = ({ navigation, route }: RootStackScreenProps<"Channel">) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [allVideos, setallVideos] = useState<LensPublication[]>([]);
  const [mirrorVideos, setmirrorVideos] = useState<LensPublication[]>([]);
  const [collectVideos, setcollectVideos] = useState<LensPublication[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [alreadyFollowing, setAlreadyFollowing] = useState<boolean | undefined>(
    route.params.isFollowdByMe
  );
  const [links, setLinks] = useState({
    twitter: "",
    insta: "",
    yt: "",
    site: "",
  });
  const theme = useThemeStore();
  const authStore = useAuthStore();
  const toast = useToast();

  useEffect(() => {
    let profileId = "";
    Linking.addEventListener("url", (event) => {
      const id = event.url.split("=")[1];
      profileId = id;
      getProfleInfo(id);
      return;
    });
    Linking.getInitialURL().then((res) => {
      const id = res?.split("=")[1];
      profileId = id ? id : "";
      getProfleInfo(id);
      return;
    });

    setAlreadyFollowing(route.params.isFollowdByMe);
    getProfleInfo(profileId || route.params.profileId);
  }, []);

  const getProfleInfo = async (profileId: string | undefined) => {
    try {
      const profiledata = await client.query({
        query: getUserProfile,
        variables: {
          id: profileId,
        },
      });
      setProfile(profiledata.data.profile);
      getLinks(profiledata.data.profile);
      const getUserVideos = await client.query({
        query: getPublications,
        variables: {
          id: profileId,
        },
        context: {
          headers: {
            "x-access-token": authStore.accessToken
              ? `Bearer ${authStore.accessToken}`
              : "",
          },
        },
      });
      setallVideos(getUserVideos.data.publications.items);
      await getUserMirrors(profileId);
      await getUserCollects();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const getUserMirrors = async (id: string | undefined) => {
    try {
      const getMirrorVideo = await client.query({
        query: getMirrorVideos,
        variables: {
          id: id,
        },
        context: {
          headers: {
            "x-access-token": authStore.accessToken
              ? `Bearer ${authStore.accessToken}`
              : "",
          },
        },
      });
      setmirrorVideos(getMirrorVideo.data.publications.items);
    } catch (err) {
      setmirrorVideos([]);
    }
  };
  const getUserCollects = async () => {
    try {
      const getCollectVideo = await client.query({
        query: getCollectVideos,
        variables: {
          ethAddress: route.params.ethAddress,
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${authStore.accessToken}`,
          },
        },
      });
      setcollectVideos(getCollectVideo.data.publications.items);
    } catch (err) {
      setcollectVideos([]);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProfleInfo(route.params.profileId).then(() => {
      if (profile == profile) {
        ToastAndroid.show("Channel is Up-to date", ToastAndroid.SHORT);
      }
      setRefreshing(false);
    });
  }, []);

  function getLinks(profile) {
    const twitter = profile?.attributes?.find((item) => item.key === "twitter")
      ?.value;
    const youtube = profile?.attributes?.find((item) => item.key === "youtube")
      ?.value;

    const insta = profile?.attributes?.find((item) => item.key === "instagram")
      ?.value;
    const website = profile?.attributes?.find((item) => item.key === "website")
      ?.value;

    setLinks({
      insta: insta,
      site: website,
      twitter: twitter,
      yt: youtube,
    });
  }

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
          <ProfileSkeleton />
        ) : (
          <>
            {Boolean(!isLoading) && (
              <View>
                <Pressable
                  onPress={(e) => {
                    e.preventDefault();
                    navigation.navigate("FullImage", {
                      url: profile?.coverPicture?.original.url || STATIC_ASSET,
                    });
                  }}
                >
                  <View
                    style={{
                      height: 180,
                      marginBottom: 34,
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
                </Pressable>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginLeft: 16,
                    marginTop: "-20%",
                    zIndex: 12,
                  }}
                >
                  <Avatar
                    src={profile?.picture?.original?.url}
                    height={90}
                    width={90}
                    borderRadius={50}
                  />
                  <View
                    style={{
                      justifyContent: "flex-end",
                      marginRight: 16,
                      top: 0,
                    }}
                  >
                    <Button
                      title={alreadyFollowing ? "Unsubscribe" : "Subscribe"}
                      width={"auto"}
                      px={16}
                      py={8}
                      type={"filled"}
                      bg={theme.PRIMARY}
                      textStyle={{
                        fontSize: 16,
                        fontWeight: "600",
                        marginHorizontal: 4,
                        color: "black",
                      }}
                      onPress={async () => {
                        try {
                          const data = await createFreeSubscribe(
                            route.params.profileId,
                            authStore.accessToken
                          );
                          if (data.data === null) {
                            toast.show(
                              "Currently not supported",
                              ToastType.ERROR,
                              true
                            );
                          }
                          if (data.data.proxyAction) {
                            toast.show("Subscribed", ToastType.SUCCESS, true);
                            setAlreadyFollowing(true);
                          }
                        } catch (error) {
                          if (error instanceof Error) {
                            console.log(error);
                          }
                        }
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    marginHorizontal: 16,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Heading
                          title={profile?.name || profile?.id}
                          style={{
                            fontSize: 16,
                            marginTop: 8,
                            fontWeight: "bold",
                            color: "white",
                          }}
                        />
                        {VERIFIED_CHANNELS.includes(profile?.id) && (
                          <View
                            style={{
                              backgroundColor: "transparent",
                              height: "auto",
                              width: "auto",
                              padding: 1,
                              borderRadius: 8,
                              marginTop: 8,
                              marginHorizontal: 4,
                            }}
                          >
                            <Icon
                              name="verified"
                              size={18}
                              color={theme.PRIMARY}
                            />
                          </View>
                        )}
                      </View>
                      <StyledText
                        title={formatHandle(profile?.handle)}
                        style={{
                          fontSize: 12,
                          fontWeight: "500",
                          color: "gray",
                        }}
                      />
                    </View>
                  </View>
                  {profile?.bio ? (
                    <StyledText
                      title={extractURLs(profile?.bio)}
                      style={{
                        fontSize: 16,
                        color: "#E9E8E8",
                        textAlign: "left",
                        marginTop: 4,
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  <View
                    style={{
                      // backgroundColor:"red",
                      marginVertical: 4,
                      // height:45,
                      width: "100%",
                      flexDirection: "row",
                    }}
                  >
                    {links.twitter?.length > 0 ? (
                      <Pressable
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        onPress={(e) => {
                          e.preventDefault();
                          Linking.openURL(
                            `https://twitter.com/${links.twitter}`
                          );
                        }}
                      >
                        <Icon name="twitter" size={16} color="#1DA1F2" />
                        <StyledText
                          style={{ color: theme.PRIMARY, marginRight: 4 }}
                          title={`@${links.twitter}`}
                        ></StyledText>
                      </Pressable>
                    ) : (
                      <></>
                    )}
                    {links.yt?.length > 0 ? (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {/* <YouTube height={24} width={24} filled={true} /> */}
                        <Icon name="youtube" size={16} color="#FF0000" />

                        <StyledText
                          style={{ color: theme.PRIMARY, marginRight: 4 }}
                          title={links.yt}
                        ></StyledText>
                      </View>
                    ) : (
                      <></>
                    )}
                  </View>
                  <View
                    style={{
                      // backgroundColor:"red",
                      marginVertical: 4,
                      // height:45,
                      width: "100%",
                      flexDirection: "row",
                    }}
                  >
                    {links.insta?.length > 0 ? (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Icon name="instagram" size={16} color="#405DE6" />

                        <StyledText
                          style={{ color: theme.PRIMARY, marginRight: 4 }}
                          title={links.insta}
                        ></StyledText>
                      </View>
                    ) : (
                      <></>
                    )}
                    {links.site?.length > 0 ? (
                      <Pressable
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={(e) => {
                          e.preventDefault();
                          Linking.openURL(links.site);
                        }}
                      >
                        <Icon name="link" size={16} color="white" />
                        <StyledText
                          style={{ color: theme.PRIMARY, marginLeft: 4 }}
                          title={links.site}
                        ></StyledText>
                      </Pressable>
                    ) : (
                      <></>
                    )}
                  </View>
                  <View
                    style={{
                      backgroundColor: "white",
                      borderRadius: 8,
                      paddingVertical: 8,
                      marginTop: 16,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        paddingHorizontal: 16,
                      }}
                    >
                      <StyledText
                        title={`${profile?.stats?.totalFollowers} • Subscribers`}
                        style={{ fontSize: 16, fontWeight: "600" }}
                      />
                      <View
                        style={{
                          height: 24,
                          backgroundColor: "black",
                          width: 2,
                        }}
                      ></View>
                      <StyledText
                        title={`${allVideos?.length} • Videos`}
                        style={{ fontSize: 16, fontWeight: "600" }}
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 24 }}>
                    <View>
                      <Pressable
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Heading
                          title={"Videos"}
                          style={{
                            fontSize: 20,
                            color: "white",
                            fontWeight: "600",
                          }}
                        />
                        <Pressable
                          onPress={() => {
                            navigation.navigate("YourVideos", {
                              videos: allVideos,
                              title: `Videos by ${
                                profile?.name || profile?.handle
                              } `,
                            });
                          }}
                        >
                          <Icon name="arrowForward" />
                        </Pressable>
                      </Pressable>
                      <ScrollView
                        horizontal={true}
                        style={{ marginLeft: -12, marginTop: 8 }}
                        showsHorizontalScrollIndicator={false}
                      >
                        {Boolean(allVideos) &&
                          allVideos.map((item: LensPublication) => {
                            return (
                              <VideoCard
                                // key={item?.id}
                                id={item?.id}
                                publication={item}
                                height={150}
                              width={300}
                                // date={item?.createdAt}
                                // banner={item?.metadata?.cover}
                                // title={item?.metadata?.name}
                                // avatar={item?.profile?.picture?.original?.url}
                                // playbackId={
                                //   item?.metadata?.media[0]?.original?.url
                                // }
                                // uploadedBy={item?.profile?.name}
                                // profileId={item?.profile?.id}
                                // stats={item?.stats}
                                // isFollowdByMe={item.profile.isFollowedByMe}
                                // reaction={item?.reaction}
                                // width={300}
                                // height={150}
                                // description={item?.metadata?.description}
                                // ethAddress={item?.profile.ownedBy}
                                // attributes={item?.metadata?.attributes}
                              />
                            );
                          })}
                      </ScrollView>
                      {allVideos?.length === 0 && (
                        <View style={{ height: 50, justifyContent: "center" }}>
                          <Heading
                            title={`Looks like ${
                              profile?.name || profile?.handle?.split(".")[0]
                            } has not posted  any video`}
                            style={{
                              color: "gray",
                              fontSize: 14,
                              // textAlign: "center",
                            }}
                          ></Heading>
                        </View>
                      )}
                    </View>
                    <View style={{ marginTop: 16 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Heading
                          title={"Mirrored Videos"}
                          style={{
                            fontSize: 20,
                            color: "white",
                            fontWeight: "600",
                          }}
                        />
                        <Pressable
                          onPress={() => {
                            navigation.navigate("YourVideos", {
                              videos: mirrorVideos,
                              title: `Mirror by ${
                                profile?.name || profile?.handle
                              } `,
                            });
                          }}
                        >
                          <Icon name="arrowForward" />
                        </Pressable>
                      </View>
                      <ScrollView
                        horizontal={true}
                        style={{ marginLeft: -12, marginTop: 8 }}
                        showsHorizontalScrollIndicator={false}
                      >
                        {Boolean(mirrorVideos) &&
                          mirrorVideos.map((item: any) => {
                            if (item?.appId?.includes("lenstube")) {
                              return (
                                <VideoCard
                                  // key={item?.id}
                                  // id={item?.id}
                                  // date={item?.createdAt}
                                  // banner={item?.metadata?.cover}
                                  // title={item?.metadata?.name}
                                  // avatar={item?.profile?.picture?.original?.url}
                                  // playbackId={
                                  //   item?.metadata?.media[0]?.original?.url
                                  // }
                                  // uploadedBy={item?.profile?.name}
                                  // profileId={item?.profile?.id}
                                  // stats={item?.stats}
                                  // isFollowdByMe={item.profile.isFollowedByMe}
                                  // reaction={item?.reaction}
                                  // width={300}
                                  // height={150}
                                  // ethAddress={item?.profile.ownedBy}
                                  // description={item?.metadata?.description}
                                  // attributes={item?.metadata?.attributes}
                                  id={item?.id}
                                publication={item}
                                height={150}
                              width={300}
                                />
                              );
                            }
                          })}
                      </ScrollView>
                      {mirrorVideos?.length === 0 && (
                        <View style={{ height: 50, justifyContent: "center" }}>
                          <Heading
                            title={`Seems like ${
                              profile?.name || profile?.handle?.split(".")[0]
                            } has not mirrored any video`}
                            style={{
                              color: "gray",
                              fontSize: 14,
                            }}
                          ></Heading>
                        </View>
                      )}
                    </View>
                  </View>
                  <View style={{ marginTop: 16 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Heading
                        title={"Collected Videos"}
                        style={{
                          fontSize: 20,
                          color: "white",
                          fontWeight: "600",
                        }}
                      />
                      <Pressable
                        onPress={() => {
                          navigation.navigate("YourVideos", {
                            videos: collectVideos,
                            title: `Collects by ${
                              profile?.name || profile?.handle
                            } `,
                          });
                        }}
                      >
                        <Icon name="arrowForward" />
                      </Pressable>
                    </View>
                    <ScrollView
                      horizontal={true}
                      style={{ marginLeft: -12, marginTop: 8 }}
                      showsHorizontalScrollIndicator={false}
                    >
                      {Boolean(collectVideos) &&
                        collectVideos.map((item: LensPublication) => {
                          return (
                            <VideoCard
                              // key={item?.id}
                              // id={item?.id}
                              // date={item?.createdAt}
                              // banner={item?.metadata?.cover}
                              // title={item?.metadata?.name}
                              // avatar={item?.profile?.picture?.original?.url}
                              // playbackId={
                              //   item?.metadata?.media[0]?.original?.url
                              // }
                              // uploadedBy={item?.profile?.name}
                              // profileId={item?.profile?.id}
                              // stats={item?.stats}
                              // isFollowdByMe={item.profile.isFollowedByMe}
                              // reaction={item?.reaction}
                              // width={300}
                              // height={150}
                              // description={item?.metadata?.description}
                              // ethAddress={item?.profile.ownedBy}
                              // attributes={item?.metadata?.attributes}
                              id={item?.id}
                              publication={item}
                              height={150}
                              width={300}
                            />
                          );
                        })}
                    </ScrollView>
                    {collectVideos?.length === 0 && (
                      <View style={{ height: 50, justifyContent: "center" }}>
                        <Heading
                          title={`Looks like ${
                            profile?.name || profile?.handle?.split(".")[0]
                          } has not collected any video`}
                          style={{
                            color: "gray",
                            fontSize: 15,
                          }}
                        ></Heading>
                      </View>
                    )}
                  </View>
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
              source={require("../assets/loader.json")}
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
