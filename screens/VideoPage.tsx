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
  const publication = useActivePublication();
  const activePublication = publication.activePublication;
  const PublicationStats = activePublication?.root?.stats;
  const [likes, setLikes] = useState<number>(activePublication?.root?.stats?.totalUpvotes);
  const [inFullscreen, setInFullsreen] = useState<boolean>(false);
  const [isMute, setIsMute] = useState<boolean>(false);
  const [isalreadyLiked, setisalreadyLiked] = useState<boolean>(
    activePublication?.root?.reaction === "UPVOTE" ? true : false
  );
  const [isalreadyDisLiked, setisalreadyDisLiked] = useState<boolean>(
    activePublication?.root?.reaction === "DOWNVOTE" ? true : false
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


  console.log('hua')
  console.log(activePublication);
  
  // console.log(activePublication?.metadata);
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <Player
        poster={activePublication?.root?.metadata?.cover}
        title={activePublication?.root?.metadata?.name}
        url={activePublication?.root?.metadata?.media[0]?.original?.url}
        inFullscreen={inFullscreen}
        isMute={isMute}
        setInFullscreen={setInFullsreen}
        setIsMute={setIsMute}
      />
      <ScrollView>
        <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
          <VideoMeta
            title={activePublication?.root?.metadata?.name}
            description={activePublication?.root?.metadata?.description}
          />
          <VideoCreator
            profileId={activePublication?.root?.profile?.id}
            avatarLink={activePublication?.root?.profile?.picture?.original?.url}
            uploadedBy={activePublication?.root?.profile?.name || activePublication.root.profile.handle}
            alreadyFollowing={activePublication?.root?.profile?.isFollowedByMe || false}
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
              id={activePublication?.root?.id}
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
              id={activePublication?.root?.id}
            />
            <MirrorButton
              id={activePublication?.root?.id}
              isAlreadyMirrored={isAlreadyMirrored}
              setIsAlreadyMirrored={setIsAlreadyMirrored}
              totalMirrors={activePublication.root?.stats?.totalAmountOfMirrors}
              bannerUrl={activePublication?.root?.metadata?.cover}
            />
            <CollectButton
              publicationId={activePublication?.root?.id}
              bannerUrl={activePublication?.root?.metadata?.cover}
              title={activePublication?.root?.profile?.name || activePublication.root.profile.handle}
              totalCollects={PublicationStats.totalAmountOfCollects}
              videoUrl={activePublication?.root?.metadata?.media[0]?.original?.url}
              hasCollected={activePublication?.root?.hasCollectedByMe}
            />
            <ShareButton
              title={activePublication?.root?.profile?.name || activePublication.root.profile.handle}
              publicationId={activePublication?.root?.id}
            />
            <ReportButton publicationId={activePublication?.root?.id} />
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
          <Comment publicationId={activePublication?.root?.id} />
        </View>
      </ScrollView>
      <CommentInput publicationId={activePublication?.root?.id} />
    </SafeAreaView>
  );
};

export default VideoPage;
