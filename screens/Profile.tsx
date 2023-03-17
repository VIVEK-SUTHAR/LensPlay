import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Linking,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import Icon from "../components/Icon";
import PleaseLogin from "../components/PleaseLogin";
import AllVideos from "../components/Profile/AllVideos";
import CollectedVideos from "../components/Profile/CollectedVideos";
import Cover from "../components/Profile/Cover";
import MirroredVideos from "../components/Profile/MirroredVideos";
import Avatar from "../components/UI/Avatar";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import ProfileSkeleton from "../components/UI/ProfileSkeleton";
import StyledText from "../components/UI/StyledText";
import { STATIC_ASSET } from "../constants";
import { primary } from "../constants/Colors";
import VERIFIED_CHANNELS from "../constants/Varified";
import { useUserProfile, useUserPublication } from "../hooks/useFeed";
import { useGuestStore } from "../store/GuestStore";
import { useProfile, useThemeStore } from "../store/Store";
import { RootTabScreenProps } from "../types/navigation/types";
import extractURLs from "../utils/extractURL";
import formatHandle from "../utils/formatHandle";
import getIPFSLink from "../utils/getIPFSLink";

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Account">) => {
  const [afterScroll, setafterScroll] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useThemeStore();
  const userStore = useProfile();
  const { isGuest } = useGuestStore();

  const { loading, data: Profile, error, refetch } = useUserProfile(
    userStore?.currentProfile?.id
  );

  const {
    data: AllVideosData,
    error: AllVideoError,
    loading: AllVideosLoading,
  } = useUserPublication(userStore?.currentProfile?.id);
  const [links, setLinks] = useState({
    twitter: "",
    insta: "",
    yt: "",
    site: "",
  });
  useEffect(() => {
    getLinks();
  }, []);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch({
      id: userStore?.currentProfile?.id,
    });
    setRefreshing(false);
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
  }

  if (isGuest) return <PleaseLogin />;
  if (loading) return <ProfileSkeleton />;
  if (Profile) {
    const profile = Profile?.profile;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <StatusBar
          backgroundColor={afterScroll > 5 ? "black" : "transparent"}
        />
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
          <View>
            <Pressable
              onPress={(e) => {
                navigation.navigate("FullImage", {
                  url:
                    userStore.currentProfile?.coverPicture?.original.url ||
                    STATIC_ASSET,
                  source: "cover",
                });
              }}
            >
              <Cover
                navigation={navigation}
                url={
                  getIPFSLink(
                    userStore.currentProfile?.coverPicture?.original.url
                  ) || STATIC_ASSET
                }
              />
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginLeft: 8,
                marginTop: "-20%",
                zIndex: 12,
              }}
            >
              <Pressable
                onPress={(e) => {
                  navigation.navigate("FullImage", {
                    url: getIPFSLink(profile?.picture.original.url),
                    source: "avatar",
                  });
                }}
              >
                <Avatar
                  src={getIPFSLink(profile?.picture.original.url)}
                  height={90}
                  width={90}
                  borderRadius={100}
                />
              </Pressable>
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
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Heading
                      title={profile?.name}
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
                        <Icon name="verified" size={18} color={theme.PRIMARY} />
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
                  marginVertical: 4,
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
                      Linking.openURL(`https://twitter.com/${links.twitter}`);
                    }}
                  >
                    <Icon name="twitter" color="#1DA1F2" size={16} />
                    <StyledText
                      style={{
                        color: primary,
                        marginRight: 4,
                        fontSize: 12,
                      }}
                      title={`@${links.twitter}`}
                    />
                  </Pressable>
                ) : (
                  <></>
                )}
                {links.yt?.length > 0 ? (
                  <Pressable
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={(e) => {
                      e.preventDefault();
                      Linking.openURL(`https://www.youtube.com/@${links.yt}`);
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon name="youtube" color="#FF0000" size={16} />
                      <StyledText
                        style={{
                          color: primary,
                          marginLeft: 4,
                          fontSize: 12,
                        }}
                        title={links.yt}
                      />
                    </View>
                  </Pressable>
                ) : (
                  <></>
                )}
              </View>
              <View
                style={{
                  // backgroundColor:"red",
                  marginVertical: 2,
                  // height:45,
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                {links.insta?.length > 0 ? (
                  <Pressable
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={(e) => {
                      e.preventDefault();
                      Linking.openURL(
                        `https://www.instagram.com/${links.insta}`
                      );
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Icon name="instagram" color="#405DE6" size={16} />
                      <StyledText
                        style={{
                          color: primary,
                          marginRight: 4,
                          fontSize: 12,
                        }}
                        title={links.insta}
                      />
                    </View>
                  </Pressable>
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
                    <Icon name="link" color="white" size={16} />
                    <StyledText
                      style={{
                        color: primary,
                        marginLeft: 4,
                        fontSize: 12,
                      }}
                      title={links.site}
                    />
                  </Pressable>
                ) : (
                  <></>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    navigation.navigate("UserStats", {
                      profileId: userStore.currentProfile?.id,
                      activeTab: "subscriber",
                    });
                  }}
                >
                  <StyledText
                    title={profile?.stats?.totalFollowers}
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "white",
                    }}
                  />
                  <StyledText
                    title={"subscribers"}
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: "gray",
                      marginLeft: 4,
                    }}
                  />
                </Pressable>
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 8,
                  }}
                  onPress={() => {
                    navigation.navigate("UserStats", {
                      profileId: userStore.currentProfile?.id,
                      activeTab: "subscription",
                    });
                  }}
                >
                  <StyledText
                    title={profile?.stats?.totalFollowing}
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "white",
                    }}
                  />
                  <StyledText
                    title={"subscription"}
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: "gray",
                      marginLeft: 4,
                    }}
                  />
                </Pressable>
              </View>
              <View style={{ marginVertical: 24 }}>
                {AllVideosData && (
                  <AllVideos
                    Videos={AllVideosData?.publications?.items}
                    profileId={userStore.currentProfile?.id}
                    navigation={navigation}
                  />
                )}
                <MirroredVideos
                  navigation={navigation}
                  profileId={userStore.currentProfile?.id}
                  handle={userStore.currentProfile?.handle}
                />
                <CollectedVideos
                  ethAddress={userStore.currentProfile?.ownedBy}
                  handle={userStore.currentProfile?.handle || ""}
                  navigation={navigation}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};
export default ProfileScreen;
