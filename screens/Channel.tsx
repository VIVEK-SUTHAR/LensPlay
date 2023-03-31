import React, { useEffect, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createFreeSubscribe } from "../api";
import { client } from "../apollo/client";
import getUserProfile from "../apollo/Queries/getUserProfile";
import Icon from "../components/Icon";
import AllVideos from "../components/Profile/AllVideos";
import CollectedVideos from "../components/Profile/CollectedVideos";
import MirroredVideos from "../components/Profile/MirroredVideos";
import Avatar from "../components/UI/Avatar";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import ProfileSkeleton from "../components/UI/ProfileSkeleton";
import StyledText from "../components/UI/StyledText";
import { PROFILE } from "../constants/tracking";
import VERIFIED_CHANNELS from "../constants/Varified";
import { useGuestStore } from "../store/GuestStore";
import { useAuthStore, useThemeStore, useToast } from "../store/Store";
import {
  Attribute,
  MediaSet,
  Post,
  PublicationMainFocus,
  PublicationTypes,
  useProfilePostsQuery,
  useProfileQuery,
} from "../types/generated";
import { Profile } from "../types/Lens";
import { RootStackScreenProps } from "../types/navigation/types";
import { ToastType } from "../types/Store";
import extractURLs from "../utils/extractURL";
import formatHandle from "../utils/formatHandle";
import getIPFSLink from "../utils/getIPFSLink";
import TrackAction from "../utils/Track";
import getRawurl from "../utils/getRawUrl";

const Channel = ({ navigation, route }: RootStackScreenProps<"Channel">) => {
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
  const { isGuest } = useGuestStore();

  useEffect(() => {
    setAlreadyFollowing(route?.params?.isFollowdByMe);
    getProfleInfo(route?.params?.profileId);
  }, []);

  const QueryRequest = {
    profileId: route?.params?.profileId,
    publicationTypes: [PublicationTypes.Post],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: ["lenstube"],
    limit: 50,
  };

  const {
    data: AllVideosData,
    error: AllVideoError,
    loading: AllVideosLoading,
  } = useProfilePostsQuery({
    variables: {
      request: QueryRequest,
      reactionRequest: {
        profileId: route?.params?.profileId,
      },
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${authStore.accessToken}`,
      },
    },
  });

  const { data: profileData, loading, error, refetch } = useProfileQuery({
    variables: {
      request: {
        profileId: route?.params?.profileId,
      },
    },
  });

  const profile = profileData?.profile;

  const getProfleInfo = async (profileId: string | undefined) => {
    try {
      const profiledata = await client.query({
        query: getUserProfile,
        variables: {
          id: profileId,
        },
      });
      getLinks(profiledata.data.profile);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProfleInfo(route.params.profileId).then(() => {
      setRefreshing(false);
      ToastAndroid.show("Channel is Up-to date", ToastAndroid.SHORT);
    });
  }, []);

  function getLinks(profile: Profile | null) {
    const twitter =
      profile?.attributes?.find((item: Attribute) => item.key === "twitter")
        ?.value || "";
    const youtube =
      profile?.attributes?.find((item: Attribute) => item.key === "youtube")
        ?.value || "";

    const insta =
      profile?.attributes?.find((item: Attribute) => item.key === "instagram")
        ?.value || "";
    const website =
      profile?.attributes?.find((item: Attribute) => item.key === "website")
        ?.value || "";

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
                      url: getRawurl(profile?.coverPicture as MediaSet),
                      source: "cover",
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
                        uri: getIPFSLink(
                          getRawurl(profile?.coverPicture as MediaSet)
                        ),
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
                    marginLeft: 8,
                    marginTop: "-20%",
                    zIndex: 12,
                  }}
                >
                  <Pressable
                    onPress={(e) => {
                      navigation.navigate("FullImage", {
                        url: getIPFSLink(
                          getRawurl(profile?.picture as MediaSet)
                        ),
                        source: "avatar",
                      });
                    }}
                  >
                    <Avatar
                      src={getRawurl(profile?.picture as MediaSet)}
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
                      title={alreadyFollowing ? "Unsubscribe" : "Subscribe"}
                      width={"auto"}
                      px={24}
                      py={8}
                      type={"filled"}
                      bg={"white"}
                      textStyle={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: "black",
                      }}
                      onPress={async () => {
                        if (isGuest) {
                          toast.show("Please Login", ToastType.ERROR, true);
                          return;
                        }
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
                          TrackAction(PROFILE.FOLLOW);
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
                      <Pressable
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        onPress={(e) => {
                          e.preventDefault();
                          Linking.openURL(
                            `https://www.youtube.com/@${links.yt}`
                          );
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Icon name="youtube" size={16} color="#FF0000" />
                          <StyledText
                            style={{ color: theme.PRIMARY, marginRight: 4 }}
                            title={links.yt}
                          ></StyledText>
                        </View>
                      </Pressable>
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
                          <Icon name="instagram" size={16} color="#405DE6" />

                          <StyledText
                            style={{ color: theme.PRIMARY, marginRight: 4 }}
                            title={links.insta}
                          ></StyledText>
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
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 8,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
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
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 8,
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
                    </View>
                  </View>
                  <View style={{ marginTop: 24 }}>
                    {AllVideosData?.publications?.items && (
                      <AllVideos
                        Videos={AllVideosData?.publications?.items as Post[]}
                        profileId={profile?.id}
                        navigation={navigation}
                      />
                    )}
                    <MirroredVideos
                      navigation={navigation}
                      profileId={profile?.id}
                      handle={profile?.handle}
                    />
                    <CollectedVideos
                      ethAddress={profile?.ownedBy}
                      handle={profile?.handle}
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

export default Channel;
