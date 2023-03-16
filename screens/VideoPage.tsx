import { View, ScrollView, SafeAreaView, BackHandler } from "react-native";
import React, { useEffect } from "react";
import useStore, {
  useActivePublication,
  useReactionStore,
} from "../store/Store";
import { useState } from "react";
import { setStatusBarHidden } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import Player from "../components/VideoPlayer";
import { RootStackScreenProps } from "../types/navigation/types";
import Comment from "../components/Comments/";
import CommentInput from "../components/Comments/CommentInput";
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
import StyledText from "../components/UI/StyledText";
import { useReaction } from "../hooks/useFeed";
import Button from "../components/UI/Button";
import { dark_primary } from "../constants/Colors";

const VideoPage = ({
  navigation,
  route,
}: RootStackScreenProps<"VideoPage">) => {
  const { activePublication } = useActivePublication();
  const PublicationStats = activePublication?.stats;
  const [inFullscreen, setInFullsreen] = useState<boolean>(false);
  const [isMute, setIsMute] = useState<boolean>(false);
  const {
    reaction,
    comment,
    setReaction,
    setComments,
    videopageStats,
    setVideoPageStats,
    clearStats,
  } = useReactionStore();

  const [isAlreadyMirrored, setIsAlreadyMirrored] = useState<boolean>(false);

  function handleBackButtonClick() {
    setStatusBarHidden(false, "fade");
    setInFullsreen(!inFullscreen);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    if (!inFullscreen) {
      navigation.goBack();
      setReaction(false);
      setComments(false);
      clearStats();
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
      setVideoPageStats(
        ReactionData?.publication?.reaction === "UPVOTE",
        ReactionData?.publication?.reaction === "DOWNVOTE",
        ReactionData?.publication?.stats?.totalUpvotes
      );
      setReaction(true);
    }
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
            {loading && !reaction && !comment ? (
              <>
                <Button
                  title={""}
                  mx={4}
                  px={34}
                  width={"auto"}
                  bg={ dark_primary }
                  type={"filled"}
                  borderRadius={8}
                />
                <Button
                  title={""}
                  mx={4}
                  px={34}
                  width={"auto"}
                  bg={ dark_primary }
                  type={"filled"}
                  borderRadius={8}
                />
                <Button
                  title={""}
                  mx={4}
                  px={34}
                  width={"auto"}
                  bg={ dark_primary }
                  type={"filled"}
                  borderRadius={8}
                />
                <Button
                  title={""}
                  mx={4}
                  px={34}
                  width={"auto"}
                  bg={ dark_primary }
                  type={"filled"}
                  borderRadius={8}
                />
                <Button
                  title={""}
                  mx={4}
                  px={40}
                  width={"auto"}
                  bg={ dark_primary }
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
                  isAlreadyMirrored={isAlreadyMirrored}
                  setIsAlreadyMirrored={setIsAlreadyMirrored}
                  totalMirrors={activePublication.stats?.totalAmountOfMirrors}
                  bannerUrl={activePublication?.metadata?.cover}
                />
                <CollectButton
                  publicationId={activePublication?.id}
                  bannerUrl={activePublication?.metadata?.cover}
                  title={
                    activePublication?.profile?.name ||
                    activePublication?.profile?.handle
                  }
                  totalCollects={PublicationStats.totalAmountOfCollects}
                  videoUrl={
                    activePublication?.metadata?.media[0]?.original?.url
                  }
                  hasCollected={activePublication?.hasCollectedByMe}
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
  );
};

export default VideoPage;
