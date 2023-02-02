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
import { useAuthStore, useProfile, useThemeStore } from "../store/Store";
import getIPFSLink from "../utils/getIPFSLink";
import Heading from "../components/UI/Heading";
import SubHeading from "../components/UI/SubHeading";
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
                <Cover
                  url={
                    userStore.currentProfile?.coverPicture?.original.url ||
                    STATIC_ASSET
                  }
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: 18,
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
                      marginTop: 24,
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
                        fontWeight: "700",
                        marginHorizontal: 4,
                        color: "black",
                      }}
                      onPress={() => {
                        Linking.openURL(
                          `https://www.lensfrens.xyz/${userStore.currentProfile?.handle}`
                        );
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    marginHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Heading
                        title={profile?.name}
                        style={{
                          fontSize: 20,
                          marginTop: 8,
                          fontWeight: "bold",
                          color: "#FAF7F7",
                        }}
                      />
                      <SubHeading
                        title={`@${profile?.handle}`}
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
                    <SubHeading
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
                        <SubHeading
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
                      <SubHeading
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
