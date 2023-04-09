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
import Icon from "../../../components/Icon";
import PleaseLogin from "../../../components/PleaseLogin";
import AllVideos from "../../../components/Profile/AllVideos";
import CollectedVideos from "../../../components/Profile/CollectedVideos";
import Cover from "../../../components/Profile/Cover";
import MirroredVideos from "../../../components/Profile/MirroredVideos";
import Avatar from "../../../components/UI/Avatar";
import Button from "../../../components/UI/Button";
import Heading from "../../../components/UI/Heading";
import ProfileSkeleton from "../../../components/UI/ProfileSkeleton";
import StyledText from "../../../components/UI/StyledText";
import { STATIC_ASSET } from "../../../constants";
import { primary, white } from "../../../constants/Colors";
import { PROFILE } from "../../../constants/tracking";
import VERIFIED_CHANNELS from "../../../constants/Varified";
import { useGuestStore } from "../../../store/GuestStore";
import { useAuthStore, useProfile, useThemeStore } from "../../../store/Store";
import {
  Attribute,
  Maybe,
  MediaSet,
  Post,
  Profile,
  PublicationMainFocus,
  PublicationTypes,
  useProfilePostsQuery,
  useProfileQuery,
} from "../../../types/generated";
import { RootTabScreenProps } from "../../../types/navigation/types";
import extractURLs from "../../../utils/extractURL";
import formatHandle from "../../../utils/formatHandle";
import getIPFSLink from "../../../utils/getIPFSLink";
import getRawurl from "../../../utils/getRawUrl";
import TrackAction from "../../../utils/Track";
import SocialLinks from "../../../components/common/SocialLinks";
import PinnedPublication from "../../../components/Profile/PinnedPublication";

type SocialLinks = {
  twitter: Maybe<string> | undefined;
  insta: Maybe<string> | undefined;
  yt: Maybe<string> | undefined;
  site: Maybe<string> | undefined;
};

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Account">) => {
  const [afterScroll, setafterScroll] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [pinnedPublicationId, setPinnedPublicationId] = useState<string | null>(
    null
  );
  const theme = useThemeStore();
  const userStore = useProfile();
  const { isGuest } = useGuestStore();
  const { accessToken } = useAuthStore();

  const { data: Profile, loading, error, refetch } = useProfileQuery({
    variables: {
      request: {
        profileId: userStore?.currentProfile?.id,
      },
    },
  });

  const QueryRequest = {
    profileId: userStore?.currentProfile?.id,
    publicationTypes: [PublicationTypes.Post],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: ["lenstube", "lensplay"],
  };

  const {
    data: AllVideosData,
    error: AllVideoError,
    loading: AllVideosLoading,
  } = useProfilePostsQuery({
    variables: {
      request: QueryRequest,
      reactionRequest: {
        profileId: userStore?.currentProfile?.id,
      },
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });

  const [links, setLinks] = useState<SocialLinks>({
    twitter: "",
    insta: "",
    yt: "",
    site: "",
  });

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch({
      request: {
        profileId: userStore?.currentProfile?.id,
      },
    });
    getPinnedPublication();
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

  const getPinnedPublication = () => {
    const attributes = Profile?.profile?.attributes;
    const pinnedPublication = attributes?.find(
      (attr: Attribute) =>
        attr.traitType === "pinnedPublicationId" ||
        attr.key === "pinnedPublicationId"
    );
    if (pinnedPublication) {
      setPinnedPublicationId(pinnedPublication.value);
    }
  };

  useEffect(() => {
    getLinks();
    getPinnedPublication();
  }, []);

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
            event.preventDefault();
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
                  url: getRawurl(userStore?.currentProfile?.coverPicture),
                  source: "cover",
                });
                TrackAction(PROFILE.FULL_IMAGE);
              }}
            >
              <Cover
                navigation={navigation}
                url={getIPFSLink(
                  getRawurl(userStore.currentProfile?.coverPicture)
                )}
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
                    url: getIPFSLink(getRawurl(profile?.picture as MediaSet)),
                    source: "avatar",
                  });
                  TrackAction(PROFILE.FULL_IMAGE);
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
                  title={"Edit Channel"}
                  width={"auto"}
                  type="outline"
                  borderColor={white[100]}
                  px={24}
                  py={8}
                  bg={primary}
                  textStyle={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "white",
                  }}
                  onPress={() => {
                    navigation.navigate("EditProfile");
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
                      title={profile?.name || formatHandle(profile?.handle)}
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
                      activeTab: "Subscription",
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
              <SocialLinks
                instagram={links.insta}
                website={links.site}
                twitter={links.twitter}
                youtube={links.yt}
              />
              <View style={{ marginVertical: 24 }}>
                {pinnedPublicationId ? (
                  <PinnedPublication pubId={pinnedPublicationId} />
                ) : (
                  <></>
                )}
                {AllVideosData && (
                  <AllVideos
                    Videos={AllVideosData?.publications?.items as Post[]}
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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}></SafeAreaView>
  );
};

export default ProfileScreen;
