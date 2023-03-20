import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as ScreenOrientation from "expo-screen-orientation";
import { setStatusBarHidden } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { BackHandler, Dimensions, Image, SafeAreaView, ScrollView, View } from "react-native";
import { freeCollectPublication, freeMirror } from "../api";
import Sheet from "../components/Bottom";
import Comment from "../components/Comments/";
import CommentInput from "../components/Comments/CommentInput";
import Button from "../components/UI/Button";
import StyledText from "../components/UI/StyledText";
import {
  CollectButton,
  LikeButton,
  ReportButton,
  ShareButton,
  VideoCreator,
  VideoMeta,
} from "../components/VIdeo";
import DisLikeButton from "../components/VIdeo/Actions/DisLikeButton";
import MirrorButton from "../components/VIdeo/Actions/MirrorButton";
import Player from "../components/VideoPlayer";
import { dark_primary, primary } from "../constants/Colors";
import { useReaction } from "../hooks/useFeed";
import { useActivePublication, useAuthStore, useProfile, useReactionStore, useToast } from "../store/Store";
import { RootStackScreenProps } from "../types/navigation/types";
import { ToastType } from "../types/Store";
import getIPFSLink from "../utils/getIPFSLink";

const VideoPage = ({
  navigation,
  route,
}: RootStackScreenProps<"VideoPage">) => {
  const { activePublication } = useActivePublication();
  const toast = useToast();
  const {accessToken} = useAuthStore();
  const userStore = useProfile();
  const PublicationStats = activePublication?.stats;
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
    console.log(ReactionData);

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

  const collectRef = useRef<BottomSheetMethods>(null);
  const mirrorRef = useRef<BottomSheetMethods>(null);

  const onMirror = async () => {
    if (mirrorStats?.isMirrored) {
      toast.show("Already mirrored", ToastType.ERROR, true);
      mirrorRef.current?.close();
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
    } catch (error) {
      if (error instanceof Error) {
        toast.show(error.message, ToastType.ERROR, true);
        mirrorRef?.current?.close();
      }
    }    
  };

  const collectPublication = async () => {
    try {
      if(collectStats?.isCollected){
        toast.show(
                "You have already collected the video",
                ToastType.ERROR,
                true
              )
        return
      }
      const data = await freeCollectPublication(activePublication?.id, accessToken);
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

  return (
    <>
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
              {loading || !reaction || !comment ? (
                <>
                  <Button
                    title={""}
                    mx={4}
                    px={34}
                    width={"auto"}
                    bg={dark_primary}
                    type={"filled"}
                    borderRadius={8}
                  />
                  <Button
                    title={""}
                    mx={4}
                    px={34}
                    width={"auto"}
                    bg={dark_primary}
                    type={"filled"}
                    borderRadius={8}
                  />
                  <Button
                    title={""}
                    mx={4}
                    px={34}
                    width={"auto"}
                    bg={dark_primary}
                    type={"filled"}
                    borderRadius={8}
                  />
                  <Button
                    title={""}
                    mx={4}
                    px={34}
                    width={"auto"}
                    bg={dark_primary}
                    type={"filled"}
                    borderRadius={8}
                  />
                  <Button
                    title={""}
                    mx={4}
                    px={40}
                    width={"auto"}
                    bg={dark_primary}
                    type={"filled"}
                    borderRadius={8}
                  />
                </>
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
            <Comment publicationId={activePublication?.id} />
          </View>
        </ScrollView>
        <CommentInput publicationId={activePublication?.id} />
      </SafeAreaView>
      <Sheet
        ref={collectRef}
        children={
          <View>
            <ScrollView>
              <View
                style={{
                  maxWidth: "100%",
                  height: 300,
                  marginTop: 32,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  source={{
                    uri: getIPFSLink(activePublication?.metadata?.cover),
                  }}
                  style={{
                    height: 180,
                    borderRadius: 8,
                    width: Dimensions.get("screen").width - 48,
                    resizeMode: "cover",
                  }}
                  progressiveRenderingEnabled={true}
                />
                <Button
                  title={collectStats?.isCollected ? 'Already collected the video' : `Collect the video for free`}
                  width={"90%"}
                  py={12}
                  textStyle={{ fontSize: 20, fontWeight: "700", textAlign: "center" }}
                  bg={collectStats?.isCollected ? '#c0c0c0' : primary}
                  // onPress={collectPublication}
                  onPress={() => {
                    collectPublication();
                  }}
                />
              </View>
            </ScrollView>
          </View>
        }
      />
      <Sheet
        ref={mirrorRef}
        children={
          <View>
            <ScrollView>
              <View
                style={{
                  maxWidth: "100%",
                  height: 300,
                  marginTop: 32,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Image
            source={{
              uri: getIPFSLink(activePublication?.metadata?.cover),
            }}
            style={{
              height: 180,
              borderRadius: 8,
              width: Dimensions.get("screen").width - 48,
              resizeMode: "cover",
            }}
            progressiveRenderingEnabled={true}
          />
          <Button
            title={mirrorStats?.isMirrored?'Already mirrored these video':'Mirror the video for free'}
            width={"90%"}
            py={12}
            my={4}
            textStyle={{ fontSize: 20, fontWeight: "700", textAlign: "center" }}
            onPress={onMirror}
            bg={mirrorStats?.isMirrored?'#c0c0c0':primary}
          />
              </View>
            </ScrollView>
          </View>
        }
      />
    </>

  );
};

export default VideoPage;
