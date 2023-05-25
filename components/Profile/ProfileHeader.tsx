import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  InteractionManager,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { getColors } from "react-native-image-colors";
import { white } from "../../constants/Colors";
import { PROFILE } from "../../constants/tracking";
import VERIFIED_CHANNELS from "../../constants/Varified";
import { useBgColorStore } from "../../store/BgColorStore";
import { useProfile, useThemeStore } from "../../store/Store";
import CommonStyles from "../../styles";
import { MediaSet, Profile, Scalars, useProfileQuery } from "../../types/generated";
import extractURLs from "../../utils/extractURL";
import formatHandle from "../../utils/formatHandle";
import getImageProxyURL from "../../utils/getImageProxyURL";
import getIPFSLink from "../../utils/getIPFSLink";
import getRawurl from "../../utils/getRawUrl";
import TrackAction from "../../utils/Track";
import ErrorMesasge from "../common/ErrorMesasge";
import SocialLinks from "../common/SocialLinks";
import Icon from "../Icon";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import Heading from "../UI/Heading";
import ProfileSkeleton from "../UI/ProfileSkeleton";
import StyledText from "../UI/StyledText";
import Cover from "./Cover";
import PinnedPublication from "./PinnedPublication";
import UserStats from "./UserStats";

type ProfileHeaderProps = {
  profileId?: Scalars["ProfileId"];
  ethAddress?: Scalars["EthereumAddress"]
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profileId, ethAddress }) => {
  const [refreshing, setRefreshing] = useState(false);
  const sheetRef = React.useRef<BottomSheetMethods>(null);
  const { setAvatarColors } = useBgColorStore();
  const { currentProfile } = useProfile();

  const theme = useThemeStore();
  const navigation = useNavigation();

  const { data: Profile, loading, error, refetch } = useProfileQuery({
    variables: {
      request: {
        profileId: profileId ? profileId : currentProfile?.id,
      },
    },
  });

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch({
      request: {
        profileId: profileId,
      },
    });
    setRefreshing(false);
  }, []);

  const profile = Profile?.profile;

  const navigateToFullImageCover = React.useCallback(() => {
    navigation.navigate("FullImage", {
      url: getRawurl(profile?.coverPicture as MediaSet),
      source: "cover",
    });
    TrackAction(PROFILE.FULL_IMAGE);
  }, []);

  const navigateToFullImageAvatar = React.useCallback(() => {
    navigation.navigate("FullImage", {
      url: getRawurl(profile?.picture as MediaSet),
      source: "avatar",
    });
    TrackAction(PROFILE.FULL_IMAGE);
  }, []);

  const navigateToUserStats = React.useCallback(() => {
    navigation.navigate("UserStats", {
      profileId: profileId,
      ethAddress: ethAddress,
      activeTab: "subscriber",
    });
  }, []);

  React.useEffect(() => {
    const coverURL = getImageProxyURL({
      formattedLink: getIPFSLink(getRawurl(profile?.coverPicture as MediaSet)),
    });

    getColors(coverURL, {
      fallback: "#000000",
      cache: true,
      key: coverURL,
      quality: "lowest",
      pixelSpacing: 500,
    }).then((colors) => {
      switch (colors.platform) {
        case "android":
          setAvatarColors(colors.average);
          break;
        case "ios":
          setAvatarColors(colors.primary);
          break;
        default:
          setAvatarColors("black");
      }
    });

    return () => {
      setAvatarColors(null);
    };
  }, []);

  const isChannel = profileId ? true : false;

  const handleButtonClick = React.useCallback(() => {
    if (!isChannel) {
      navigation.navigate("EditProfile");
      return;
    }
  }, [navigation]);

  if (loading) return <ProfileSkeleton />;
  if (error)
    return <ErrorMesasge message="Something went wrong" withImage={true} />;
  if (profile) {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={navigateToFullImageCover}>
          <Cover
            navigation={navigation}
            url={getIPFSLink(getRawurl(profile?.coverPicture as MediaSet))}
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
              title={isChannel ? "Follow" : "Edit Channel"}
              width={"auto"}
              type="outline"
              borderColor={white[100]}
              px={24}
              py={8}
              bg={theme.PRIMARY}
              textStyle={styles.editButtonText}
              onPress={handleButtonClick}
            />
          </View>
        </View>
        <View style={CommonStyles.mx_16}>
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
          ) : null}
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
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 8,
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
          </View>
          <SocialLinks profile={profile as Profile} />
          <PinnedPublication sheetRef={sheetRef} profile={profile as Profile}/>
          <UserStats profile={profile as Profile} />
        </View>
      </ScrollView>
    );
  }
  return null;
};

export default React.memo(ProfileHeader);

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
