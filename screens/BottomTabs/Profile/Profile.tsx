import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import {
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import SocialLinks from "../../../components/common/SocialLinks";
import Icon from "../../../components/Icon";
import PleaseLogin from "../../../components/PleaseLogin";
import AllVideos from "../../../components/Profile/AllVideos";
import CollectedVideos from "../../../components/Profile/CollectedVideos";
import Cover from "../../../components/Profile/Cover";
import MirroredVideos from "../../../components/Profile/MirroredVideos";
import PinnedPublication, {
  UnPinSheet,
} from "../../../components/Profile/PinnedPublication";
import Avatar from "../../../components/UI/Avatar";
import Button from "../../../components/UI/Button";
import Heading from "../../../components/UI/Heading";
import ProfileSkeleton from "../../../components/UI/ProfileSkeleton";
import StyledText from "../../../components/UI/StyledText";
import { primary, white } from "../../../constants/Colors";
import { PROFILE } from "../../../constants/tracking";
import VERIFIED_CHANNELS from "../../../constants/Varified";
import { useGuestStore } from "../../../store/GuestStore";
import { useAuthStore, useProfile, useThemeStore } from "../../../store/Store";
import CommonStyles from "../../../styles";
import {
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

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Account">) => {
  const [refreshing, setRefreshing] = useState(false);
  const sheetRef = React.useRef<BottomSheetMethods>(null);

  const theme = useThemeStore();
  const userStore = useProfile();
  const { isGuest } = useGuestStore();
  const { accessToken } = useAuthStore();

  const QueryRequest = {
    profileId: userStore?.currentProfile?.id,
    publicationTypes: [PublicationTypes.Post],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: ["lenstube", "lensplay"],
  };

  const { data: Profile, loading, error, refetch } = useProfileQuery({
    variables: {
      request: {
        profileId: userStore?.currentProfile?.id,
      },
    },
  });

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

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch({
      request: {
        profileId: userStore?.currentProfile?.id,
      },
    });
    setRefreshing(false);
  }, []);

  const navigateToFullImageCover = React.useCallback(() => {
    navigation.navigate("FullImage", {
      url: getRawurl(userStore?.currentProfile?.coverPicture),
      source: "cover",
    });
    TrackAction(PROFILE.FULL_IMAGE);
  }, []);

  const navigateToFullImageAvatar = React.useCallback(() => {
    navigation.navigate("FullImage", {
      url: getRawurl(userStore?.currentProfile?.picture),
      source: "avatar",
    });
    TrackAction(PROFILE.FULL_IMAGE);
  }, []);

  const navigateToUserStats = React.useCallback(() => {
    navigation.navigate("UserStats", {
      profileId: userStore.currentProfile?.id,
      activeTab: "subscriber",
    });
  }, []);

  if (isGuest) return <PleaseLogin />;
  if (loading) return <ProfileSkeleton />;
  if (Profile) {
    const profile = Profile?.profile;
    return (
      <>
        <SafeAreaView style={CommonStyles.screenContainer}>
          <StatusBar style={"auto"} />
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
            <Pressable onPress={navigateToFullImageCover}>
              <Cover
                navigation={navigation}
                url={getIPFSLink(
                  getRawurl(userStore.currentProfile?.coverPicture)
                )}
              />
            </Pressable>
            <View style={styles.ProfileContainer}>
              <Pressable onPress={navigateToFullImageAvatar}>
                <Avatar
                  src={getRawurl(profile?.picture as MediaSet)}
                  height={90}
                  width={90}
                  borderRadius={100}
                />
              </Pressable>
              <View style={styles.editButtonContainer}>
                <Button
                  title={"Edit Channel"}
                  width={"auto"}
                  type="outline"
                  borderColor={white[100]}
                  px={24}
                  py={8}
                  bg={primary}
                  textStyle={styles.editButtonText}
                  onPress={() => {
                    navigation.navigate("EditProfile");
                  }}
                />
              </View>
            </View>
            <View style={CommonStyles.mh_16}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
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
                      <View style={styles.verifiedContainer}>
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
                  onPress={navigateToUserStats}
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
                  onPress={navigateToUserStats}
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
              <SocialLinks profile={profile as Profile}/>
              <View style={{ marginVertical: 24 }}>
                <PinnedPublication sheetRef={sheetRef} />
                {AllVideosData && (
                  <AllVideos
                    Videos={AllVideosData?.publications?.items as Post[]}
                    profileId={userStore.currentProfile?.id}
                    navigation={navigation}
                    owner={true}
                  />
                )}
                <MirroredVideos
                  navigation={navigation}
                  profileId={userStore.currentProfile?.id}
                  handle={userStore.currentProfile?.handle}
                  owner={true}
                />
                <CollectedVideos
                  ethAddress={userStore.currentProfile?.ownedBy}
                  handle={userStore.currentProfile?.handle || ""}
                  navigation={navigation}
                  owner={true}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <UnPinSheet sheetRef={sheetRef} />
      </>
    );
  }
  return <SafeAreaView style={CommonStyles.screenContainer} />;
};

export default ProfileScreen;

const styles = StyleSheet.create({
  ProfileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginLeft: 8,
    marginTop: "-20%",
    zIndex: 12,
  },
  editButtonContainer: {
    justifyContent: "flex-end",
    marginRight: 16,
    top: 0,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  verifiedContainer: {
    backgroundColor: "transparent",
    height: "auto",
    width: "auto",
    padding: 1,
    borderRadius: 8,
    marginTop: 8,
    marginHorizontal: 4,
  },
});
