import { View, ScrollView, SafeAreaView, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { useReactionStore } from "../store/Store";
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
  const [likes, setLikes] = useState<number>(route.params.stats?.totalUpvotes);
  const [inFullscreen, setInFullsreen] = useState<boolean>(false);
  const [isMute, setIsMute] = useState<boolean>(false);
  const [isalreadyLiked, setisalreadyLiked] = useState<boolean>(
    route.params.reaction === "UPVOTE" ? true : false
  );
  const [isalreadyDisLiked, setisalreadyDisLiked] = useState<boolean>(
    route.params.reaction === "DOWNVOTE" ? true : false
  );
  const likedPublication = useReactionStore();
  const [isAlreadyMirrored, setIsAlreadyMirrored] = useState<boolean>(false);
  const thumbup = likedPublication.likedPublication;
  const thumbdown = likedPublication.dislikedPublication;

  useEffect(() => {
    thumbup.map((publication) => {
      if (publication.id === route.params.id) {
        setisalreadyLiked(true);
        setisalreadyDisLiked(false);
        setLikes(publication.likes + 1);
      }
    });
    thumbdown.map((publication) => {
      if (publication.id === route.params.id) {
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
  }, [navigation, route.params.playbackId]);

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

  const PublicationStats = route.params.stats;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <Player
        poster={route.params.banner}
        title={route.params.title}
        url={route.params.playbackId}
        inFullscreen={inFullscreen}
        isMute={isMute}
        setInFullscreen={setInFullsreen}
        setIsMute={setIsMute}
      />
      <ScrollView>
        <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
          <VideoMeta
            title={route.params.title}
            description={route.params.description}
          />
          <VideoCreator
            profileId={route.params.profileId}
            avatarLink={route.params.avatar}
            uploadedBy={route.params.uploadedBy}
            alreadyFollowing={route.params.isFollowdByMe || false}
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
              id={route.params.id}
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
              id={route.params.id}
            />
            <MirrorButton
              id={route.params.id}
              isAlreadyMirrored={isAlreadyMirrored}
              setIsAlreadyMirrored={setIsAlreadyMirrored}
              totalMirrors={route.params.stats.totalAmountOfMirrors}
              bannerUrl={route.params.banner}
            />
            <CollectButton
              publicationId={route.params.id}
              bannerUrl={route.params.banner}
              title={route.params.uploadedBy}
              totalCollects={PublicationStats.totalAmountOfCollects}
              videoUrl={route.params.playbackId}
              hasCollected={route?.params?.hasCollectedByMe}
            />
            <ShareButton
              title={route.params.title}
              publicationId={route.params.id}
            />
            <ReportButton publicationId={route.params.id} />
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
          <Comment publicationId={route.params.id} />
        </View>
      </ScrollView>
      <CommentInput publicationId={route.params.id} />
    </SafeAreaView>
  );
};

export default VideoPage;
