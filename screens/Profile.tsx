import * as React from "react";
import {
  Linking,
  Pressable,
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
import getIPFSLink from "../utils/getIPFSLink";
import Heading from "../components/UI/Heading";
import StyledText from "../components/UI/StyledText";
import Avatar from "../components/UI/Avatar";
import extractURLs from "../utils/extractURL";
import { RootTabScreenProps } from "../types/navigation/types";
import ProfileSkeleton from "../components/UI/ProfileSkeleton";
import { LensPublication } from "../types/Lens/Feed";
import { Profile } from "../types/Lens";
import Button from "../components/UI/Button";
import { StatusBar } from "expo-status-bar";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { primary } from "../constants/Colors";
import Cover from "../components/Profile/Cover";
import { STATIC_ASSET } from "../constants";
import AllVideos from "../components/Profile/AllVideos";
import MirroredVideos from "../components/Profile/MirroredVideos";
import getPublications from "../apollo/Queries/getPublications";
import CollectedVideos from "../components/Profile/CollectedVideos";
import { Entypo, Feather } from "@expo/vector-icons";
import VERIFIED_CHANNELS from "../constants/Varified";
import formatHandle from "../utils/formatHandle";
import Twitter from "../components/svg/Twitter";
import BackIcon from "../components/svg/BackIcon";
import YouTube from "../components/svg/YouTube";
import Instagram from "../components/svg/Instagram";
import Website from "../components/svg/Website";
const ProfileScreen = ({
  navigation,
  route,
}: RootTabScreenProps<"Account">) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [allVideos, setallVideos] = useState<LensPublication[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [afterScroll, setafterScroll] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const wallet = useWalletConnect();
  const theme = useThemeStore();
  const authStore = useAuthStore();
  const userStore = useProfile();

  const [links, setLinks] = useState({
    twitter: "",
    insta: "",
    yt: "",
    site: "",
  });
  useEffect(() => {
    getLinks();
  }, []);
  function getLinks() {
    const twitter = userStore.currentProfile?.attributes?.find(
      (item) => item.key === "twitter"
    )?.value;
    const youtube = userStore.currentProfile?.attributes?.find(
      (item) => item.key === "youtube"
    )?.value;

    const insta = userStore.currentProfile?.attributes?.find(
      (item) => item.key === "instagram"
    )?.value;
    const website = userStore.currentProfile?.attributes?.find(
      (item) => item.key === "website"
    )?.value;

    setLinks({
      insta: insta,
      site: website,
      twitter: twitter,
      yt: youtube,
    });

    console.log(links);
  }

  useEffect(() => {
    getProfleInfo();
  }, [navigation]);

  const getProfleInfo = async () => {
    setIsLoading(true);
    try {
      const profiledata = await client.query({
        query: getUserProfile,
        variables: {
          id: userStore.currentProfile?.id,
        },
      });
      setProfile(profiledata.data.profile);
      getAllVideos();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getAllVideos = async () => {
    try {
      const data = await client.query({
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
      setallVideos(data.data.publications.items);
    } catch (error) {
      setallVideos([]);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProfleInfo().then(() => {
      if (profile == profile) {
        ToastAndroid.show("Profile is Up-to date", ToastAndroid.SHORT);
      }
      setRefreshing(false);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar backgroundColor={afterScroll > 5 ? "black" : "transparent"} />
      <ScrollView
        onScroll={(event) => {
          setafterScroll(event.nativeEvent.contentOffset.y);
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
                <Pressable
                  onPress={() => {
                    navigation.navigate("FullImage", {
                      url:
                        userStore.currentProfile?.coverPicture?.original.url ||
                        STATIC_ASSET,
                    });
                  }}
                >
                  <Cover
                    navigation={navigation}
                    url={
                      userStore.currentProfile?.coverPicture?.original.url ||
                      STATIC_ASSET
                    }
                  />
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
                    src={getIPFSLink(profile?.picture.original.url)}
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
                      title={"Edit Channel"}
                      width={"auto"}
                      px={16}
                      py={8}
                      bg={primary}
                      textStyle={{
                        fontSize: 16,
                        fontWeight: "600",
                        marginHorizontal: 4,
                        color: "black",
                      }}
                      onPress={() => {
                        navigation.navigate("EditProfile", {
                          profile: profile,
                        });
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
                          title={profile?.name}
                          style={{
                            fontSize: 20,
                            marginTop: 8,
                            fontWeight: "600",
                            color: "white",
                          }}
                        />
                        {VERIFIED_CHANNELS.includes(profile?.id) && (
                          <View
                            style={{
                              backgroundColor: theme.PRIMARY,
                              height: 15,
                              width: 15,
                              padding: 1,
                              borderRadius: 8,
                              marginTop: 8,
                              marginHorizontal: 4,
                            }}
                          >
                            <Entypo name="check" color={"white"} />
                          </View>
                        )}
                      </View>
                      <StyledText
                        title={formatHandle(profile?.handle)}
                        style={{
                          fontSize: 14,
                          lineHeight: 16,
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
                        <Twitter height={24} width={24} filled={true} />
                        <StyledText
                          style={{ color: "white", marginRight: 4 }}
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
                        <YouTube height={24} width={24} filled={true} />
                        <StyledText
                          style={{ color: "white", marginRight: 4 }}
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
                        <Instagram height={24} width={24} filled={true} />
                        <StyledText
                          style={{ color: "white", marginRight: 4 }}
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
                        <Website height={24} width={24} filled={true} />
                        <StyledText
                          style={{ color: "white", marginLeft: 4 }}
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
                      <Pressable
                        android_ripple={{
                          radius: 45,
                          color: "gray",
                        }}
                        onPress={() => {
                          navigation.navigate("UserStats", {
                            profileId: userStore.currentProfile?.id,
                          });
                        }}
                      >
                        <StyledText
                          title={`${profile?.stats?.totalFollowers} • Subscribers`}
                          style={{ fontSize: 16, fontWeight: "600" }}
                        />
                      </Pressable>
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
                    <AllVideos
                      Videos={allVideos}
                      profileId={userStore.currentProfile?.id}
                      navigation={navigation}
                    />
                    <MirroredVideos
                      navigation={navigation}
                      profileId={userStore.currentProfile?.id}
                      handle={userStore.currentProfile?.handle}
                    />
                    <CollectedVideos
                      ethAddress={wallet.accounts[0]}
                      handle={userStore.currentProfile?.handle || ""}
                      navigation={navigation}
                    />
                  </View>
                </View>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileScreen;
