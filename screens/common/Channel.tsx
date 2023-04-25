import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../../components/Icon";
import AllVideos from "../../components/Profile/AllVideos";
import CollectedVideos from "../../components/Profile/CollectedVideos";
import MirroredVideos from "../../components/Profile/MirroredVideos";
import Avatar from "../../components/UI/Avatar";
import Button from "../../components/UI/Button";
import Heading from "../../components/UI/Heading";
import ProfileSkeleton from "../../components/UI/ProfileSkeleton";
import StyledText from "../../components/UI/StyledText";
import { PROFILE } from "../../constants/tracking";
import VERIFIED_CHANNELS from "../../constants/Varified";
import { useGuestStore } from "../../store/GuestStore";
import { useAuthStore, useThemeStore, useToast } from "../../store/Store";
import {
  Attribute,
  CreateUnfollowTypedDataMutationResult,
  MediaSet,
  Post,
  Profile,
  PublicationMainFocus,
  PublicationTypes,
  useBroadcastMutation,
  useCreateUnfollowTypedDataMutation,
  useProfilePostsQuery,
  useProfileQuery,
  useProxyActionMutation,
} from "../../types/generated";
import { RootStackScreenProps } from "../../types/navigation/types";
import { ToastType } from "../../types/Store";
import extractURLs from "../../utils/extractURL";
import formatHandle from "../../utils/formatHandle";
import getIPFSLink from "../../utils/getIPFSLink";
import getRawurl from "../../utils/getRawUrl";
import formatUnfollowTypedData from "../../utils/lens/formatUnfollowTypedData";
import TrackAction from "../../utils/Track";
import SocialLinks from "../../components/common/SocialLinks";

const Channel = ({ navigation, route }: RootStackScreenProps<"Channel">) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
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
  const wallet = useWalletConnect();

  useEffect(() => {
    setAlreadyFollowing(route?.params?.isFollowdByMe);
  }, []);

  const [sendUnFollowTxn] = useBroadcastMutation({
    onCompleted: () => {
      toast.success("Unsubscribed succesfully!");
      setAlreadyFollowing(false);
      TrackAction(PROFILE.UNFOLLOW);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${authStore.accessToken}`,
      },
    },
  });

  const QueryRequest = {
    profileId: route?.params?.profileId,
    publicationTypes: [PublicationTypes.Post],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: ["lensplay", "lenstube"],
  };

  const { data: AllVideosData } = useProfilePostsQuery({
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

  const {
    data: profileData,
    refetch,
    error: profielError,
    loading: profileLoading,
  } = useProfileQuery({
    variables: {
      request: {
        profileId: route?.params?.profileId,
      },
    },
    onCompleted: () => {
      getLinks(profileData?.profile as Profile);
    },
  });

  const profile = profileData?.profile;

  const [subscribeToChannel] = useProxyActionMutation({
    onCompleted: (data) => {
      console.log(data);
      toast.success("Subscribed succesfully!");
      setAlreadyFollowing(true);
    },
    onError(error) {
      if (error?.message?.includes("already following")) {
        toast.error("Currently not supported");
      }
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${authStore.accessToken}`,
      },
    },
  });

  const [getTypedData] = useCreateUnfollowTypedDataMutation({
    onError() {
      toast.error("Something went wrong");
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${authStore.accessToken}`,
      },
    },
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch({
      request: {
        profileId: profile?.id,
      },
    }).then(() => {
      setRefreshing(false);
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

  if (profileLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <ProfileSkeleton />
      </SafeAreaView>
    );
  }
  if (profileData) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <StatusBar backgroundColor="transparent" />
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
                onPress={() => {
                  navigation.navigate("FullImage", {
                    url: getIPFSLink(getRawurl(profile?.picture as MediaSet)),
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
                      if (alreadyFollowing) {
                        const data = await getTypedData({
                          variables: {
                            request: {
                              profile: profileData?.profile?.id,
                            },
                          },
                        });
                        const message = formatUnfollowTypedData(
                          data as CreateUnfollowTypedDataMutationResult
                        );
                        const msgParams = [
                          wallet.accounts[0],
                          JSON.stringify(message),
                        ];
                        const sig = await wallet.signTypedData(msgParams);
                        sendUnFollowTxn({
                          variables: {
                            request: {
                              signature: sig,
                              id: data?.data?.createUnfollowTypedData?.id,
                            },
                          },
                        });
                        return;
                      }
                      if (!alreadyFollowing) {
                        subscribeToChannel({
                          variables: {
                            request: {
                              follow: {
                                freeFollow: {
                                  profileId: profile?.id,
                                },
                              },
                            },
                          },
                        });
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
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              <SocialLinks
                  instagram={links.insta}
                  website={links.site}
                  twitter={links.twitter}
                  youtube={links.yt}
                />
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
                    owner={false}
                  />
                )}
                <MirroredVideos
                  navigation={navigation}
                  profileId={profile?.id}
                  handle={profile?.handle}
                  owner={false}
                />
                <CollectedVideos
                  ethAddress={profile?.ownedBy}
                  handle={profile?.handle}
                  navigation={navigation}
                  owner={false}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return <></>;
};

export default Channel;
