import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenOrientation from "expo-screen-orientation";
import { setStatusBarHidden } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { freeCollectPublication, freeMirror } from "../../api";
import fetchPublicationById from "../../apollo/Queries/fetchPublicationById";
import getComments from "../../apollo/Queries/getComments";
import { client } from "../../apollo/client";
import Sheet from "../../components/Bottom";
import Comment from "../../components/Comments";
import CommentInput from "../../components/Comments/CommentInput";
import Button from "../../components/UI/Button";
import StyledText from "../../components/UI/StyledText";
import {
  CollectButton,
  LikeButton,
  ReportButton,
  ShareButton,
  VideoCreator,
  VideoMeta,
} from "../../components/VIdeo";
import DisLikeButton from "../../components/VIdeo/Actions/DisLikeButton";
import MirrorButton from "../../components/VIdeo/Actions/MirrorButton";
import Player from "../../components/VideoPlayer";
import { primary } from "../../constants/Colors";
import {
  useAuthStore,
  useProfile,
  useReactionStore,
  useToast,
} from "../../store/Store";
import { Comments, LensPublication } from "../../types/Lens/Feed";
import { ToastType } from "../../types/Store";
import { Mirror, Post } from "../../types/generated";
import { RootStackScreenProps } from "../../types/navigation/types";
import extractURLs from "../../utils/extractURL";
import getIPFSLink from "../../utils/getIPFSLink";
import getAccessFromRefresh from "../../utils/lens/getAccessFromRefresh";
import getDefaultProfile from "../../utils/lens/getDefaultProfile";
import verifyTokens from "../../utils/lens/verifyTokens";
import storeTokens from "../../utils/storeTokens";

const LinkingVideo = ({
  navigation,
  route,
}: RootStackScreenProps<"LinkingVideo">) => {
  const [inFullscreen, setInFullsreen] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [isMute, setIsMute] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<LensPublication>();
  const [comments, setComments] = useState<Comments[]>([]);

  const collectRef = useRef<BottomSheetMethods>(null);
  const mirrorRef = useRef<BottomSheetMethods>(null);
  const descRef = useRef<BottomSheetMethods>(null);

  const {
    reaction,
    comment,
    setReaction,
    videopageStats,
    collectStats,
    mirrorStats,
    setVideoPageStats,
    clearStats,
    setCollectStats,
    setMirrorStats,
  } = useReactionStore();

  const { accessToken, setAccessToken, setRefreshToken } = useAuthStore();
  const [activePublication, setactivePublication] = useState<
    Post | Mirror | null
  >(null);
  const { setHasHandle, currentProfile, setCurrentProfile } = useProfile();
  const toast = useToast();

  const collectPublication = async () => {
    try {
      if (collectStats?.isCollected) {
        toast.show(
          "You have already collected the video",
          ToastType.ERROR,
          true
        );
        return;
      }
      const data = await freeCollectPublication(
        activePublication?.id,
        accessToken
      );
      if (data) {
        toast.show("Collect Submitted", ToastType.SUCCESS, true);
        setCollectStats(true, collectStats?.collectCount + 1);
        collectRef?.current?.close();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.show(error.message, ToastType.ERROR, true);
        collectRef?.current?.close();
      }
    } finally {
      collectRef?.current?.close();
    }
  };

  const onMirror = async () => {
    if (mirrorStats?.isMirrored) {
      toast.show("Already mirrored", ToastType.ERROR, true);
      mirrorRef.current?.close();
      return;
    }
    try {
      const data = await freeMirror(
        accessToken,
        currentProfile?.id,
        activePublication?.id
      );
      if (data) {
        toast.show("Mirror submitted", ToastType.SUCCESS, true);
        setMirrorStats(true, mirrorStats.mirrorCount + 1);
        mirrorRef.current?.close();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.show(error.message, ToastType.ERROR, true);
        mirrorRef?.current?.close();
      }
    }
  };

  function handleBackButtonClick() {
    setStatusBarHidden(false, "fade");
    setInFullsreen(!inFullscreen);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    if (!inFullscreen) {
      navigation.goBack();
      setReaction(false);
      clearStats();
      setCollectStats(false, 0);
      setMirrorStats(false, 0);
    }
    return true;
  }

  const setProfile = async (address: string) => {
    const userDefaultProfile = await getDefaultProfile(address);
    if (userDefaultProfile) {
      setHasHandle(true);
      setCurrentProfile(userDefaultProfile);
      return userDefaultProfile;
    } else {
      setHasHandle(false);
    }
  };

  const handleAsyncStorage = async () => {
    try {
      setIsLoading(true);
      const userTokens = await AsyncStorage.getItem("@user_tokens");
      const waitList = await AsyncStorage.getItem("@waitlist");
      if (!userTokens) {
        navigation.replace("Login");
        return;
      } else {
        const accessToken = JSON.parse(userTokens).accessToken;
        const refreshToken = JSON.parse(userTokens).refreshToken;
        const isvalidTokens = await verifyTokens(accessToken);
        if (waitList) {
          if (isvalidTokens) {
            const address = JSON.parse(waitList).address;
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            const profile = await setProfile(address);
            getVideoById(route?.params?.id, profile?.id, accessToken);
          } else {
            const newTokens = await getAccessFromRefresh(refreshToken);
            const address = JSON.parse(waitList).address;
            const profile = await setProfile(address);
            setAccessToken(newTokens?.accessToken);
            setRefreshToken(newTokens?.refreshToken);
            await storeTokens(newTokens?.accessToken, newTokens?.refreshToken);
            getVideoById(
              route?.params?.id,
              profile?.id,
              newTokens?.accessToken
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    handleAsyncStorage();
  }, []);

  async function fetchComments(
    publicationId: string,
    id: string
  ): Promise<void> {
    try {
      const data = await client.query({
        query: getComments,
        variables: {
          postId: publicationId,
          id: currentProfile?.id || id,
        },
        context: {
          headers: {
            "x-access-token": accessToken ? `Bearer ${accessToken}` : "",
          },
        },
      });
      setComments(data.data.publications.items);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Can't fetch comments", { cause: error.cause });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const getVideoById = async (pubId: string, id: string, tokens: string) => {
    try {
      const feed = await client.query({
        query: fetchPublicationById,
        variables: {
          pubId: pubId,
          id: currentProfile?.id || id,
        },
        context: {
          headers: {
            "x-access-token":
              accessToken || tokens ? `Bearer ${accessToken || tokens}` : "",
          },
        },
      });

      setactivePublication(feed.data.publication);
      if (!reaction) {
        setReaction(true);

        setVideoPageStats(
          feed?.data?.publication?.reaction === "UPVOTE",
          feed?.data?.publication?.reaction === "DOWNVOTE",
          feed?.data?.publication?.stats?.totalUpvotes
        );

        setCollectStats(
          feed?.data?.publication?.hasCollectedByMe,
          feed?.data?.publication?.stats?.totalAmountOfCollects
        );
        setMirrorStats(
          feed?.data?.publication?.mirrors?.length > 0,
          feed?.data?.publication?.stats?.totalAmountOfMirrors
        );
      }
      await fetchComments(pubId, id);

      return feed;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Something went wrong", { cause: error });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <View
          style={{
            height: 280,
            backgroundColor: "gray",
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 15,
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
        >
          <View
            style={{ height: 15, width: 150, backgroundColor: "gray" }}
          ></View>
          <View
            style={{ height: 15, width: 35, backgroundColor: "gray" }}
          ></View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            paddingVertical: 4,
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 50,
                backgroundColor: "gray",
              }}
            ></View>
            <View style={{ marginHorizontal: 8 }}>
              <View
                style={{ height: 8, width: 100, backgroundColor: "gray" }}
              ></View>
              <View
                style={{
                  height: 8,
                  width: 45,
                  backgroundColor: "gray",
                  marginVertical: 8,
                }}
              ></View>
            </View>
          </View>
          <Button
            title={"Subscribe"}
            width={"auto"}
            px={16}
            py={8}
            type={"filled"}
            bg={"gray"}
            textStyle={{
              fontSize: 16,
              fontWeight: "700",
              marginHorizontal: 4,
              color: "black",
            }}
            onPress={async () => {}}
          />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <Player
        poster={activePublication?.metadata?.cover}
        title={activePublication?.metadata?.name}
        url={activePublication?.metadata?.media[0]?.original?.url}
        inFullscreen={inFullscreen}
        isMute={isMute}
        setInFullscreen={setInFullsreen}
        setIsMute={setIsMute}
      />
      <ScrollView>
        <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
          <VideoMeta
            title={activePublication?.metadata?.name}
            description={activePublication?.metadata?.description}
            descRef={descRef}
          />
          <VideoCreator
            profileId={activePublication?.profile?.id}
            avatarLink={activePublication?.profile?.picture?.original?.url}
            uploadedBy={
              activePublication?.profile?.name ||
              activePublication?.profile?.handle
            }
            alreadyFollowing={
              activePublication?.profile?.isFollowedByMe || false
            }
          />
          <ScrollView
            style={{
              paddingVertical: 24,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <LikeButton
              like={videopageStats?.likeCount}
              id={activePublication?.id}
              isalreadyLiked={videopageStats?.isLiked}
            />
            <DisLikeButton
              isalreadyDisLiked={videopageStats?.isDisliked}
              id={activePublication?.id}
            />
            <MirrorButton
              id={activePublication?.id}
              totalMirrors={mirrorStats?.mirrorCount}
              isAlreadyMirrored={mirrorStats?.isMirrored}
              bannerUrl={activePublication?.metadata?.cover}
              mirrorRef={mirrorRef}
            />
            <CollectButton
              totalCollects={collectStats?.collectCount}
              collectRef={collectRef}
              hasCollected={collectStats?.isCollected}
            />
            <ShareButton
              title={
                activePublication?.profile?.name ||
                activePublication?.profile.handle
              }
              publicationId={activePublication?.id}
            />
            <ReportButton publicationId={activePublication?.id} />
          </ScrollView>
          <StyledText
            title="Comments"
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "white",
              marginBottom: 8,
            }}
          />
          <Comment publicationId={activePublication?.id} />
        </View>
      </ScrollView>
      <CommentInput publicationId={activePublication?.id} />
      <Sheet
        ref={collectRef}
        index={-1}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: "#1d1d1d",
        }}
        snapPoints={["50%"]}
        children={
          <View
            style={{
              maxWidth: "100%",
              alignItems: "center",
              justifyContent: "space-evenly",
              height: "100%",
            }}
          >
            <Image
              source={{
                uri: getIPFSLink(activePublication?.metadata?.cover),
              }}
              style={{
                height: Dimensions.get("screen").height / 4,
                borderRadius: 8,
                width: Dimensions.get("screen").width - 48,
                resizeMode: "cover",
              }}
              progressiveRenderingEnabled={true}
            />
            <Button
              title={
                collectStats?.isCollected
                  ? "Already collected the video"
                  : `Collect the video`
              }
              width={"90%"}
              py={12}
              textStyle={{
                fontSize: 20,
                fontWeight: "700",
                textAlign: "center",
              }}
              bg={collectStats?.isCollected ? "#c0c0c0" : primary}
              // onPress={collectPublication}
              onPress={() => {
                collectPublication();
              }}
            />
          </View>
        }
      />
      <Sheet
        ref={mirrorRef}
        index={-1}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: "#1d1d1d",
        }}
        snapPoints={["50%"]}
        children={
          <View
            style={{
              maxWidth: "100%",
              alignItems: "center",
              justifyContent: "space-evenly",
              height: "100%",
            }}
          >
            <Image
              source={{
                uri: getIPFSLink(activePublication?.metadata?.cover),
              }}
              style={{
                height: Dimensions.get("screen").height / 4,
                borderRadius: 8,
                width: Dimensions.get("screen").width - 48,
                resizeMode: "cover",
              }}
              progressiveRenderingEnabled={true}
            />
            <Button
              title={
                mirrorStats?.isMirrored
                  ? "Already mirrored these video"
                  : "Mirror the video"
              }
              width={"90%"}
              py={12}
              my={4}
              textStyle={{
                fontSize: 20,
                fontWeight: "700",
                textAlign: "center",
              }}
              onPress={onMirror}
              bg={mirrorStats?.isMirrored ? "#c0c0c0" : primary}
            />
          </View>
        }
      />
      <Sheet
        ref={descRef}
        index={-1}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: "#1d1d1d",
        }}
        snapPoints={["70%", "95%"]}
        children={
          <View style={{ paddingHorizontal: 16 }}>
            <ScrollView>
              <View
                style={{
                  maxWidth: "100%",
                  marginTop: 32,
                  justifyContent: "space-between",
                }}
              >
                <StyledText
                  title={"Description"}
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    marginVertical: 4,
                    color: "white",
                    textAlign: "left",
                  }}
                />
                <StyledText
                  title={extractURLs(activePublication?.metadata?.description)}
                  style={{
                    textAlign: "justify",
                    color: "white",
                    marginTop: 8,
                  }}
                />
              </View>
            </ScrollView>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default LinkingVideo;