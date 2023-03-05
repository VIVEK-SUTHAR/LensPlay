import { View, ScrollView, SafeAreaView, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { useActivePublication, useReactionStore } from "../store/Store";
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
  
  const [inFullscreen, setInFullsreen] = useState<boolean>(false);
  const [isMute, setIsMute] = useState<boolean>(false);
  
  const likedPublication = useReactionStore();
  const [isAlreadyMirrored, setIsAlreadyMirrored] = useState<boolean>(false);


  function handleBackButtonClick() {
    setStatusBarHidden(false, "fade");
    setInFullsreen(!inFullscreen);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    if (!inFullscreen) navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    console.log(route?.params?.reaction);
    console.log(route.params.stats?.totalUpvotes);
    
    
  }, []);

  const PublicationStats = route.params.stats;
  const { activePublication } = useActivePublication();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <Player
        poster={activePublication?.metadata?.cover}
        title={route.params.title}
        url={activePublication?.metadata?.media[0].original?.url}
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
              like={route.params.stats?.totalUpvotes}
              id={route.params.id}
              isalreadyLiked={route.params.reaction}
            />
            <DisLikeButton
              isalreadyDisLiked={route.params.reaction}
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
