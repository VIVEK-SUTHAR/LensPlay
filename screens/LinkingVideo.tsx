import {
  View,
  Share,
  ScrollView,
  SafeAreaView,
  BackHandler,
  TextInput,
  Pressable,
  AppState,
} from "react-native";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  useAuthStore,
  useProfile,
  useThemeStore,
  useToast,
} from "../store/Store";
import { useState } from "react";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import { client } from "../apollo/client";
import Avatar from "../components/UI/Avatar";
import Heading from "../components/UI/Heading";
import StyledText from "../components/UI/StyledText";
import * as ScreenOrientation from "expo-screen-orientation";
import Drawer from "../components/UI/Drawer";
import Player from "../components/VideoPlayer";
import Button from "../components/UI/Button";
import { RootStackScreenProps } from "../types/navigation/types";
import { ToastType } from "../types/Store";
import fetchPublicationById from "../apollo/Queries/fetchPublicationById";
import { LensPublication } from "../types/Lens/Feed";
import getIPFSLink from "../utils/getIPFSLink";
import getComments from "../apollo/Queries/getComments";
import { Comments } from "../types/Lens/Feed";
import CommentSkeleton from "../components/UI/CommentSkeleton";
import AnimatedLottieView from "lottie-react-native";
import CommentCard from "../components/Comments/CommentCard";
import * as Linking from "expo-linking";
import { CollectButton, LikeButton, ReportButton, ShareButton, VideoCreator, VideoMeta } from "../components/VIdeo";
import DisLikeButton from "../components/VIdeo/Actions/DisLikeButton";
import MirrorButton from "../components/VIdeo/Actions/MirrorButton";
import CommentInput from "../components/Comments/CommentInput";
import Comment from "../components/Comments";

const LinkingVideo = ({
  navigation,
  route,
}: RootStackScreenProps<"LinkingVideo">) => {
  const [inFullscreen, setInFullsreen] = useState<boolean>(false);
  const [descOpen, setDescOpen] = useState<boolean>(false);
  const [ismodalopen, setIsmodalopen] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [isMute, setIsMute] = useState<boolean>(false);
  const [isImdexing, setIsImdexing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<LensPublication>();
  const [isFocused, setIsFocused] = useState(false);
  const [comments, setComments] = useState<Comments[]>([]);
  const [initialUrl, setInitialUrl] = useState(null);

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
    // console.log(route.params.id);

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

  const [activePublication, setactivePublication] = useState(null)
  
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
      console.log(typeof(feed.data.publication.stats.totalUpvotes)+" hiii");
      
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
    if(isLoading){
      return <CommentSkeleton/>
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
