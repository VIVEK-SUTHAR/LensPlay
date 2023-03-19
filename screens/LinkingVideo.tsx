import * as ScreenOrientation from "expo-screen-orientation";
import { setStatusBarHidden } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  Share,
  View,
} from "react-native";
import { client } from "../apollo/client";
import fetchPublicationById from "../apollo/Queries/fetchPublicationById";
import getComments from "../apollo/Queries/getComments";
import Comment from "../components/Comments";
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
import {
  useAuthStore,
  useProfile,
  useThemeStore,
  useToast,
} from "../store/Store";
import { Comments, LensPublication } from "../types/Lens/Feed";
import { RootStackScreenProps } from "../types/navigation/types";

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

  const theme = useThemeStore();
  const authStore = useAuthStore();
  const userStore = useProfile();
  const toast = useToast();

  function handleBackButtonClick() {
    setStatusBarHidden(false, "fade");
    setInFullsreen(!inFullscreen);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    if (!inFullscreen) navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    getVideoById(route?.params?.id);
  }, []);

  async function fetchComments(publicationId: string): Promise<void> {
    try {
      const data = await client.query({
        query: getComments,
        variables: {
          postId: publicationId,
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${authStore.accessToken}`,
          },
        },
      });
      setComments([]);
      setComments(data.data.publications.items);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Can't fetch comments", { cause: error.cause });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const [activePublication, setactivePublication] = useState(null);

  const getVideoById = async (pubId: string) => {
    setIsLoading(true);
    try {
      const feed = await client.query({
        query: fetchPublicationById,
        variables: {
          pubId: pubId,
        },
        context: {
          headers: {
            "x-access-token": authStore.accessToken
              ? `Bearer ${authStore.accessToken}`
              : "",
          },
        },
      });

      setactivePublication(feed.data.publication);

      fetchComments(pubId);

      return feed;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Something went wrong", { cause: error });
      }
    } finally {
      setIsLoading(false);
    }
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Let's watch ${videoData?.metadata?.name} by ${videoData?.profile.handle} on LensPlay,
        
        `,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
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
              like={activePublication?.stats?.totalUpvotes}
              id={activePublication?.id}
              isalreadyLiked={activePublication?.reaction}
            />
            <DisLikeButton
              isalreadyDisLiked={activePublication?.stats?.reaction}
              id={activePublication?.id}
            />
            <MirrorButton
              id={activePublication?.id}
              // isAlreadyMirrored={isAlreadyMirrored}
              // setIsAlreadyMirrored={setIsAlreadyMirrored}
              totalMirrors={activePublication?.stats?.totalAmountOfMirrors}
              bannerUrl={activePublication?.metadata?.cover}
            />
            <CollectButton
              publicationId={activePublication?.id}
              bannerUrl={activePublication?.metadata?.cover}
              title={
                activePublication?.profile?.name ||
                activePublication?.profile?.handle
              }
              totalCollects={activePublication?.stats?.totalAmountOfCollects}
              videoUrl={activePublication?.metadata?.media[0]?.original?.url}
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

export default LinkingVideo;
