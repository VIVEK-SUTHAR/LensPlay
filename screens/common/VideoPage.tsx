import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import * as ScreenOrientation from "expo-screen-orientation";
import { setStatusBarHidden } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { freeCollectPublication, freeMirror } from "../../api";
import Sheet from "../../components/Bottom";
import Comment from "../../components/Comments";
import CommentInput from "../../components/Comments/CommentInput";
import Skeleton from "../../components/common/Skeleton";
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
import { LENSPLAY_SITE, STATIC_ASSET } from "../../constants";
import { dark_primary, primary } from "../../constants/Colors";
import { PUBLICATION } from "../../constants/tracking";
import { useReaction } from "../../hooks/useLensQuery";
import {
  useActivePublication,
  useAuthStore,
  useProfile,
  useReactionStore,
  useToast,
} from "../../store/Store";
import useVideoURLStore from "../../store/videoURL";
import { RootStackScreenProps } from "../../types/navigation/types";
import { ToastType } from "../../types/Store";
import extractURLs from "../../utils/extractURL";
import getImageProxyURL from "../../utils/getImageProxyURL";
import getIPFSLink from "../../utils/getIPFSLink";
import getPlaceHolderImage from "../../utils/getPlaceHolder";
import getRawurl from "../../utils/getRawUrl";
import Logger from "../../utils/logger";
import TrackAction from "../../utils/Track";
import createLivePeerAsset from "../../utils/video/createLivePeerAsset";
import checkIfLivePeerAsset from "../../utils/video/isInLivePeer";
import { useCreateDataAvailabilityMirrorViaDispatcherMutation } from "../../types/generated";

const VideoPage = ({ navigation }: RootStackScreenProps<"VideoPage">) => {
  const { activePublication } = useActivePublication();
  const toast = useToast();
  const { accessToken } = useAuthStore();
  const userStore = useProfile();

  const [inFullscreen, setInFullsreen] = useState<boolean>(false);
  const [isMute, setIsMute] = useState<boolean>(false);
  const {
    reaction,
    comment,
    setReaction,
    setComments,
    videopageStats,
    collectStats,
    mirrorStats,
    setVideoPageStats,
    clearStats,
    setCollectStats,
    setMirrorStats,
  } = useReactionStore();
  const isDAPublication = activePublication?.isDataAvailability;

  function handleBackButtonClick() {
    setStatusBarHidden(false, "fade");
    setInFullsreen(!inFullscreen);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    if (!inFullscreen) {
      navigation.goBack();
      setReaction(false);
      setComments(false);
      clearStats();
      setCollectStats(false, 0);
      setMirrorStats(false, 0);
    }
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
  }, []);

  const { data: ReactionData, error, loading } = useReaction(
    activePublication?.id
  );

  if (ReactionData) {
    if (!reaction) {
      setReaction(true);
      setVideoPageStats(
        ReactionData?.publication?.reaction === "UPVOTE",
        ReactionData?.publication?.reaction === "DOWNVOTE",
        ReactionData?.publication?.stats?.totalUpvotes
      );
      setCollectStats(
        ReactionData?.publication?.hasCollectedByMe,
        ReactionData?.publication?.stats?.totalAmountOfCollects
      );
      setMirrorStats(
        ReactionData?.publication?.mirrors?.length > 0,
        ReactionData?.publication?.stats?.totalAmountOfMirrors
      );
    }
  }

  const [
    createDataAvaibalityMirror,
  ] = useCreateDataAvailabilityMirrorViaDispatcherMutation({
    onCompleted: (data) => {
      Logger.Success("DA Mirrored", data);
      toast.success("Mirror submitted");
      setMirrorStats(true, mirrorStats.mirrorCount + 1);
      mirrorRef.current?.close();
    },
    onError: (err, cliOpt) => {
      Logger.Error("Error in DA Mirror", err, "\nClient Option", cliOpt);
      toast.show(err.message, ToastType.ERROR, true);
    },
  });

  const collectRef = useRef<BottomSheetMethods>(null);
  const mirrorRef = useRef<BottomSheetMethods>(null);
  const descRef = useRef<BottomSheetMethods>(null);
  const onMirror = async () => {
    if (mirrorStats?.isMirrored) {
      toast.show("Already mirrored", ToastType.ERROR, true);
      mirrorRef.current?.close();
      return;
    }
    if (isDAPublication) {
      createDataAvaibalityMirror({
        variables: {
          request: {
            from: userStore?.currentProfile?.id,
            mirror: activePublication?.id,
          },
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${accessToken}`,
            origin: LENSPLAY_SITE,
          },
        },
      });
      return;
    }
    try {
      const data = await freeMirror(
        accessToken,
        userStore.currentProfile?.id,
        activePublication?.id
      );
      if (data) {
        toast.show("Mirror submitted", ToastType.SUCCESS, true);
        setMirrorStats(true, mirrorStats.mirrorCount + 1);
        mirrorRef.current?.close();
      }
      TrackAction(PUBLICATION.MIRROR);
    } catch (error) {
      if (error instanceof Error) {
        toast.show(error.message, ToastType.ERROR, true);
        mirrorRef?.current?.close();
      }
    }
  };

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
      TrackAction(PUBLICATION.MIRROR);
    } catch (error) {
      if (error instanceof Error) {
        toast.show(error.message, ToastType.ERROR, true);
        collectRef?.current?.close();
      }
    } finally {
      collectRef?.current?.close();
    }
  };
  const LENS_MEDIA_URL = activePublication?.metadata?.media[0]?.original?.url;
  const { setVideoURI, uri } = useVideoURLStore();

  useFocusEffect(
    React.useCallback(() => {
      checkIfLivePeerAsset(LENS_MEDIA_URL).then((res) => {
        if (res) {
          // console.log(res);
          Logger.Success(res);
          setVideoURI(res);
        } else {
          setVideoURI(getIPFSLink(LENS_MEDIA_URL));
          createLivePeerAsset(LENS_MEDIA_URL);
        }
      });
      return () => {
        setVideoURI("");
      };
    }, [])
  );

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        {uri.length > 0 ? (
          <Player
            poster={getRawurl(activePublication?.metadata?.cover)}
            title={activePublication?.metadata?.name || ""}
            url={uri}
            inFullscreen={inFullscreen}
            isMute={isMute}
            setInFullscreen={setInFullsreen}
            setIsMute={setIsMute}
          />
        ) : (
          <Image
            placeholder={getPlaceHolderImage()}
            transition={500}
            placeholderContentFit="cover"
            source={{
              uri: getImageProxyURL({
                formattedLink: getIPFSLink(
                  getRawurl(activePublication?.metadata?.cover)
                ),
              }),
            }}
            style={{
              width: inFullscreen
                ? Dimensions.get("screen").height
                : Dimensions.get("screen").width,
              height: inFullscreen
                ? Dimensions.get("screen").width * 0.95
                : 280,
            }}
          />
        )}
        <ScrollView>
          <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
            <VideoMeta
              title={activePublication?.metadata?.name}
              description={activePublication?.metadata?.description}
              descRef={descRef}
            />
            <VideoCreator
              profileId={activePublication?.profile?.id}
              avatarLink={getRawurl(activePublication?.profile?.picture)}
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
              {loading || !reaction || !comment ? (
                <Skeleton
                  children={
                    <Button
                      title={""}
                      mx={4}
                      px={34}
                      width={"auto"}
                      bg={dark_primary}
                      type={"filled"}
                      borderRadius={8}
                    />
                  }
                  number={5}
                  horizontal={true}
                />
              ) : (
                <>
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
                    bannerUrl={getRawurl(activePublication?.metadata?.cover)}
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
                </>
              )}
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
            <Comment publicationId={activePublication?.id} shots={false} />
          </View>
        </ScrollView>
        <CommentInput publicationId={activePublication?.id} />
      </SafeAreaView>
      <Sheet
        ref={collectRef}
        index={-1}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: "#1d1d1d",
        }}
        snapPoints={[390]}
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
                uri: getIPFSLink(getRawurl(activePublication?.metadata?.cover)),
              }}
              placeholder={getPlaceHolderImage()}
              transition={500}
              placeholderContentFit="contain"
              style={{
                height: Dimensions.get("screen").height / 4,
                borderRadius: 8,
                width: Dimensions.get("screen").width - 48,
                resizeMode: "cover",
              }}
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
        snapPoints={[390]}
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
                uri: getIPFSLink(getRawurl(activePublication?.metadata?.cover)),
              }}
              placeholder={getPlaceHolderImage()}
              transition={500}
              placeholderContentFit="contain"
              style={{
                height: Dimensions.get("screen").height / 4,
                borderRadius: 8,
                width: Dimensions.get("screen").width - 48,
                resizeMode: "cover",
              }}
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
        handleStyle={{
          padding: 16,
          // borderBottomWidth: 1,
        }}
        snapPoints={[550, 740]}
        children={
          <BottomSheetScrollView>
            <View style={{ paddingHorizontal: 16 }}>
              <View
                style={{
                  marginTop: 8,
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
              </View>
              <StyledText
                title={activePublication?.metadata?.name}
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  marginVertical: 4,
                  color: "white",
                  textAlign: "left",
                }}
              />
              <View
                style={{
                  paddingVertical: 10,
                  width: "100%",
                  paddingHorizontal: 8,
                  alignSelf: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                }}
              >
                <View style={styles.verticleCenter}>
                  <StyledText
                    title={activePublication?.stats?.totalUpvotes || 0}
                    style={styles.statsLabel}
                  />
                  <StyledText title="Likes" style={{ color: "white" }} />
                </View>
                <View style={styles.verticleCenter}>
                  <StyledText
                    title={activePublication?.stats?.totalAmountOfCollects || 0}
                    style={styles.statsLabel}
                  />
                  <StyledText title="Collects" style={{ color: "white" }} />
                </View>
                <View style={styles.verticleCenter}>
                  <StyledText
                    title={activePublication?.stats?.totalAmountOfMirrors || 0}
                    style={styles.statsLabel}
                  />
                  <StyledText title="Mirrors" style={{ color: "white" }} />
                </View>
              </View>
              <StyledText
                title={
                  extractURLs(activePublication?.metadata?.description) ||
                  "No description provided by crator"
                }
                style={{
                  textAlign: "justify",
                  color: "white",
                  marginTop: 16,
                  fontSize: 14,
                  fontWeight: "500",
                }}
              />
              <StyledText
                title={`Posted via ${
                  activePublication?.appId?.charAt(0)?.toUpperCase() +
                    activePublication?.appId?.slice(1) || "LensPlay"
                }`}
                style={{
                  color: "white",
                  marginTop: 16,
                  fontSize: 14,
                  fontWeight: "500",
                }}
              />
              <StyledText
                title={"Uploaded By"}
                style={{
                  color: "white",
                  marginTop: 16,
                  fontSize: 14,
                  fontWeight: "500",
                }}
              />

              <VideoCreator
                alreadyFollowing={
                  activePublication?.profile?.isFollowedByMe || false
                }
                avatarLink={
                  getRawurl(activePublication?.profile?.picture) || STATIC_ASSET
                }
                profileId={activePublication?.profile?.id}
                uploadedBy={
                  activePublication?.profile?.name ||
                  activePublication?.profile?.handle
                }
                showSubscribeButton={false}
                showSubscribers={true}
                subscribersCount={
                  activePublication?.profile?.stats?.totalFollowers
                }
              />
            </View>
          </BottomSheetScrollView>
        }
      />
    </>
  );
};

export default VideoPage;
const styles = StyleSheet.create({
  statsLabel: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  verticleCenter: {
    alignItems: "center",
  },
});
