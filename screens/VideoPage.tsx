import { View, ScrollView, SafeAreaView, BackHandler } from "react-native";
import React, { useEffect } from "react";
import useStore, { useActivePublication, useReactionStore } from "../store/Store";
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

const VideoPage = ({
  navigation,
  route,
}: RootStackScreenProps<"VideoPage">) => {
  const {activePublication} = useActivePublication();
  const PublicationStats = activePublication?.stats;
  const [likes, setLikes] = useState<number>(activePublication?.stats?.totalUpvotes);
  const [inFullscreen, setInFullsreen] = useState<boolean>(false);
  const [isMute, setIsMute] = useState<boolean>(false);
  const [isalreadyLiked, setisalreadyLiked] = useState<boolean>(
    activePublication?.reaction === "UPVOTE" ? true : false
  );
  const [isalreadyDisLiked, setisalreadyDisLiked] = useState<boolean>(
    activePublication?.reaction === "DOWNVOTE" ? true : false
  );
  const likedPublication = useReactionStore();
  const [isAlreadyMirrored, setIsAlreadyMirrored] = useState<boolean>(false);
  const thumbup = likedPublication.likedPublication;
  const thumbdown = likedPublication.dislikedPublication;

  useEffect(() => {
    thumbup.map((publication) => {
      if (publication.id === activePublication.id) {
        setisalreadyLiked(true);
        setisalreadyDisLiked(false);
        setLikes(publication.likes + 1);
      }
    });
    thumbdown.map((publication) => {
      if (publication.id === activePublication.id) {
        if (isalreadyLiked) {
          setisalreadyDisLiked(true);
          setisalreadyLiked(false);
          setLikes((prev) => prev - 1);
        } else {
          setisalreadyDisLiked(true);
          setisalreadyLiked(false);
        }
      }
    });
  }, [navigation, activePublication.playbackId]);

  function handleBackButtonClick() {
    setStatusBarHidden(false, "fade");
    setInFullsreen(!inFullscreen);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    if (!inFullscreen) navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
  }, []);

  // const PublicationStats = route.params.stats;
  // const { activePublication } = useActivePublication();

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
            uploadedBy={activePublication?.profile?.name || activePublication?.profile?.handle}
            alreadyFollowing={activePublication?.profile?.isFollowedByMe || false}
          />
          <ScrollView
            style={{
              paddingVertical: 24,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <LikeButton
              likes={likes}
              id={activePublication?.id}
              setLikes={setLikes}
              isalreadyLiked={isalreadyLiked}
              setisalreadyDisLiked={setisalreadyDisLiked}
            />
            <DisLikeButton
              isalreadyLiked={isalreadyLiked}
              setLikes={setLikes}
              isalreadyDisLiked={isalreadyDisLiked}
              setisalreadyDisLiked={setisalreadyDisLiked}
              setisalreadyLiked={setisalreadyLiked}
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
              title={activePublication?.profile?.name || activePublication?.profile?.handle}
              totalCollects={PublicationStats.totalAmountOfCollects}
              videoUrl={activePublication?.metadata?.media[0]?.original?.url}
              hasCollected={activePublication?.hasCollectedByMe}
            />
            <ShareButton
              title={activePublication?.profile?.name || activePublication?.profile.handle}
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
    </SafeAreaView>
  );
};

export default VideoPage;
