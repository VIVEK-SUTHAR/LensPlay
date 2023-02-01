import {
  View,
  Share,
  ScrollView,
  SafeAreaView,
  ToastAndroid,
  BackHandler,
  TextInput,
  Pressable,
  Vibration,
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
  useReactionStore,
  useThemeStore,
  useToast,
} from "../store/Store";
import { useState } from "react";
import {
  addLike,
  removeLike,
  isFollowedByMe,
  createFreeSubscribe,
  freeCollectPublication,
} from "../api";
import CommentCard from "../components/CommentCard";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import { client } from "../apollo/client";
import getComments from "../apollo/Queries/getComments";
import Avatar from "../components/UI/Avatar";
import Heading from "../components/UI/Heading";
import SubHeading from "../components/UI/SubHeading";
import AnimatedLottieView from "lottie-react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Drawer from "../components/UI/Drawer";
import Player from "../components/VideoPlayer";
import Button from "../components/UI/Button";
import { RootStackScreenProps } from "../types/navigation/types";
import CommentSkeleton from "../components/UI/CommentSkeleton";
import formatInteraction from "../utils/formatInteraction";
import { ToastType } from "../types/Store";
import { Comments } from "../types/Lens/Feed";
import getIPFSLink from "../utils/getIPFSLink";
import createCommentViaDispatcher from "../apollo/mutations/createCommentViaDispatcher";
import uploadMetaDataToArweave from "../utils/uploadMetaToArweave";
import { dark_primary } from "../constants/Colors";
import LikeIcon from "../components/svg/LikeIcon";
import DisLikeIcon from "../components/svg/LikeIcon";
import CollectIcon from "../components/svg/CollectIcon";
import ShareIcon from "../components/svg/ShareIcon";
import ReportIconIcon from "../components/svg/ReportIcon";
import ReportIcon from "../components/svg/ReportIcon";

const VideoPage = ({
  navigation,
  route,
}: RootStackScreenProps<"VideoPage">) => {

console.log(route.params.playbackId);



  const [comments, setComments] = useState<Comments[]>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [likes, setLikes] = useState<number>(route.params.stats?.totalUpvotes);
  const [commentText, setCommentText] = useState<string>("");
  const [isImdexing, setIsImdexing] = useState<boolean>(false);
  const [inFullscreen, setInFullsreen] = useState<boolean>(false);
  const [descOpen, setDescOpen] = useState<boolean>(false);
  const [alreadyFollowing, setAlreadyFollowing] = useState<boolean>(
    route?.params?.isFollowdByMe || false
  );
  const [ismodalopen, setIsmodalopen] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isMute, setIsMute] = useState<boolean>(false);
  const [isalreadyLiked, setisalreadyLiked] = useState<boolean>(
    route.params.reaction === "UPVOTE" ? true : false
  );
  const [isalreadyDisLiked, setisalreadyDisLiked] = useState<boolean>(
    route.params.reaction === "DOWNVOTE" ? true : false
  );

  const theme = useThemeStore();
  const authStore = useAuthStore();
  const userStore = useProfile();
  const toast = useToast();
  const likedPublication = useReactionStore();

  const thumbup = likedPublication.likedPublication;
  const thumbdown = likedPublication.dislikedPublication;
  const playbackId = route.params.playbackId;

  useEffect(() => {
    fetchComments();
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
  }, [navigation, playbackId]);

  useEffect(() => {
    checkFollowed();
  }, []);

  async function checkFollowed(): Promise<void> {
    const data = await isFollowedByMe(
      route.params.profileId,
      authStore.accessToken
    );
    if (data.data.profile.isFollowedByMe) {
      setAlreadyFollowing(true);
      return;
    }
  }
  async function fetchComments(): Promise<void> {
    try {
      const data = await client.query({
        query: getComments,
        variables: {
          postId: route.params.id,
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

  const STATS = route.params.stats;
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Let's watch ${route.params.title} by ${route.params.uploadedBy} on LensPlay,
        `,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const onLike = async () => {
    if (!isalreadyLiked && !isLiked) {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
      setisalreadyDisLiked(false);
      addLike(
        authStore.accessToken,
        userStore.currentProfile?.id,
        route.params.id,
        "UPVOTE"
      ).then((res) => {
        if (res.addReaction === null) {
          likedPublication.addToReactedPublications(
            route.params.id,
            likes,
            thumbdown
          );
        }
      });
    }
  };

  const onDislike = async () => {
    if (!isalreadyDisLiked) {
      if (isalreadyLiked || isLiked) {
        setLikes((prev) => prev - 1);
        setIsLiked(false);
        setisalreadyLiked(false);
      }
      // setIsLiked(false);
      setisalreadyDisLiked(true);
      addLike(
        authStore.accessToken,
        userStore.currentProfile?.id,
        route.params.id,
        "DOWNVOTE"
      ).then((res) => {
        if (res) {
          if (res.addReaction === null) {
            likedPublication.addToDislikedPublications(
              route.params.id,
              thumbup
            );
          }
        }
      });
      removeLike(
        authStore.accessToken,
        userStore.currentProfile?.id,
        route.params.id
      )
        .then((res) => {
          if (res) {
          }
        })
        .catch((error) => {
          if (error instanceof Error) {
            ToastAndroid.show("Can't react to post", ToastAndroid.SHORT);
          }
        });
    }
  };

  async function publishComment() {
    if (commentText.length === 0) {
      Vibration.vibrate(20);
      toast.show("Please type something", ToastType.ERROR, true);
      return;
    }
    try {
      const contenturi = await uploadMetaDataToArweave(
        commentText,
        userStore.currentProfile?.handle
      );

      const { data, errors } = await client.mutate({
        mutation: createCommentViaDispatcher,
        variables: {
          profileId: userStore.currentProfile?.id,
          publicationId: route.params.id,
          uri: contenturi,
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${authStore.accessToken}`,
          },
        },
      });
      if (data) {
        toast.show("Comment submitted", ToastType.SUCCESS, true);
        setIsImdexing(true);
        setTimeout(() => {
          setIsImdexing(false);
          setCommentText("");
        }, 35000);
        return;
      }
      if (errors) {
        toast.show("Something went wrong", ToastType.ERROR, true);
        return;
      }
    } catch (error) {
      console.log(error);
      setCommentText("");
      toast.show("Something Went wrong", ToastType.ERROR, true);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar style="light" backgroundColor={"black"} translucent={true} />
      <Player
        poster={route.params.banner}
        title={route.params.title}
        url={route.params.playbackId}
        inFullscreen={inFullscreen}
        isMute={isMute}
        setInFullscreen={setInFullsreen}
        setIsMute={setIsMute}
      />
      <Drawer isOpen={ismodalopen} setIsOpen={setIsmodalopen}>
        <View
          style={{
            width: "100%",
            height: "100%",
            opacity: 1,
            alignItems: "center",
          }}
        >
          <View style={{ maxWidth: "90%" }}>
            <Player
              title={route.params.title}
              url={route.params.playbackId}
              poster={route.params.banner}
              isMute={isMute}
              setIsMute={setIsMute}
            />
          </View>
          <Heading
            title={`${route.params.title} by ${route.params.uploadedBy}`}
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "white",
              fontWeight: "600",
              marginVertical: 12,
            }}
          />
          <Button
            title="Collect for free"
            width={"90%"}
            py={8}
            my={4}
            textStyle={{ fontSize: 18, fontWeight: "600", textAlign: "center" }}
            onPress={async () => {
              try {
                const data = await freeCollectPublication(
                  route.params.id,
                  authStore.accessToken
                );

                if (data) {
                  toast.show("Collect Submitted", ToastType.SUCCESS, true);
                }
              } catch (error) {
                if (error instanceof Error) {
                  toast.show(error.message, ToastType.ERROR, true);
                }
              }
              setIsmodalopen(false);
            }}
          />
        </View>
      </Drawer>
      <ScrollView>
        <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Heading
              title={route.params.title}
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "white",
              }}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather
                name={`chevron-${descOpen ? "up" : "down"}`}
                size={28}
                color="white"
                onPress={() => setDescOpen(!descOpen)}
              />
            </View>
          </View>
          <View>
            {descOpen ? (
              <View style={{ marginTop: 8 }}>
                <SubHeading
                  title={route.params.description}
                  style={{ color: "white", fontSize: 14 }}
                />
              </View>
            ) : (
              <></>
            )}
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
              <Avatar src={route.params.avatar} width={40} height={40} />
              <View style={{ marginHorizontal: 8 }}>
                <Heading
                  title={route.params.uploadedBy}
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                />
                <SubHeading
                  title={`@${route.params.uploadedBy}`}
                  style={{
                    color: "gray",
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                />
              </View>
            </View>
            <Button
              title={alreadyFollowing ? "Unsubscribe" : "Subscribe"}
              width={"auto"}
              px={16}
              py={8}
              type={"filled"}
              bg={theme.PRIMARY}
              textStyle={{
                fontSize: 16,
                fontWeight: "700",
                marginHorizontal: 4,
                color: "black",
              }}
              onPress={async () => {
                if (alreadyFollowing) {
                  toast.show("Currntly not supported", ToastType.ERROR, true);
                  return;
                }
                try {
                  const data = await createFreeSubscribe(
                    route.params.profileId,
                    authStore.accessToken
                  );
                  if (data.data.proxyAction !== null) {
                    toast.show(
                      "Subscribed succesfully",
                      ToastType.SUCCESS,
                      true
                    );
                  }
                } catch (error) {
                  if (error instanceof Error) {
                  }
                }
              }}
            />
          </View>
          <ScrollView
            style={{
              paddingVertical: 24,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <Button
              title={formatInteraction(likes) || "0"}
              mx={4}
              px={16}
              width={"auto"}
              bg={dark_primary}
              type={"filled"}
              borderRadius={8}
              textStyle={{
                fontSize: 14,
                fontWeight: "500",
                color: isalreadyLiked
                  ? theme.PRIMARY
                  : isLiked
                  ? theme.PRIMARY
                  : "white",
                marginLeft: 4,
              }}
              borderColor={
                isalreadyLiked
                  ? theme.PRIMARY
                  : isLiked
                  ? theme.PRIMARY
                  : "white"
              }
              onPress={onLike}
              icon={
                <LikeIcon height={20} width={20} filled={isalreadyLiked || isLiked?true:false}/>
              }
            />
            <Button
              title=""
              onPress={onDislike}
              mx={4}
              px={16}
              width={"auto"}
              bg={dark_primary}
              type={"filled"}
              borderRadius={8}
              textStyle={{
                fontSize: 14,
                fontWeight: "500",
                color: "white",
              }}
              borderColor={isalreadyDisLiked ? theme.PRIMARY : "white"}
              icon={
                <DisLikeIcon height={20} width={20} filled={isalreadyDisLiked?true:false}/>
              }
            />
            <Button
              title={`${STATS?.totalAmountOfCollects || 0} Collects`}
              mx={4}
              px={8}
              width={"auto"}
              bg={dark_primary}
              type={"filled"}
              borderRadius={8}
              onPress={() => {
                setIsmodalopen(true);
              }}
              icon={
                <CollectIcon height={20} width={20} filled={true} />
              }
              textStyle={{ color: "white", marginHorizontal: 4 }}
            />
            <Button
              title={"Share"}
              mx={4}
              px={10}
              width={"auto"}
              bg={dark_primary}
              type={"filled"}
              borderRadius={8}
              icon={<ShareIcon height={20} width={20} />}
              onPress={onShare}
              textStyle={{ color: "white", marginHorizontal: 4 }}
            />
            <Button
              title={"Report"}
              mx={4}
              px={10}
              width={"auto"}
              bg={dark_primary}
              type={"filled"}
              borderRadius={8}
              icon={<ReportIcon height={20} width={20} />}
              textStyle={{ color: "white", marginHorizontal: 4 }}
              onPress={() => {
                toast.show("Thanks for reporting", ToastType.INFO, true);
              }}
            />
          </ScrollView>
          <View>
            <SubHeading
              title="Comments"
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "white",
                marginBottom: 8,
              }}
            />
            {isImdexing ? (
              <CommentCard
                avatar={userStore.currentProfile?.picture.original.url}
                commentText={commentText}
                name={userStore.currentProfile?.name}
                username={userStore.currentProfile?.handle || ""}
                isIndexing={true}
                commentTime={""}
                id={""}
                isFollowdByMe={undefined}
                stats={{
                  totalUpvotes: "0",
                  totalAmountOfCollects: "0",
                  totalAmountOfMirrors: "0",
                }}
                commentId={""}
              />
            ) : (
              <></>
            )}
            {isLoading ? (
              <ScrollView>
                <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
              </ScrollView>
            ) : (
              <></>
            )}
            {!isLoading && comments.length == 0 ? (
              <View style={{ maxHeight: 200 }}>
                <AnimatedLottieView
                  autoPlay
                  style={{
                    height: "90%",
                    alignSelf: "center",
                    width: "100%",
                  }}
                  source={require("../assets/nocomments.json")}
                />
                <Heading
                  title="There are no comments yet"
                  style={{
                    color: "white",
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                ></Heading>
              </View>
            ) : (
              comments?.map((item) => {
                return (
                  <CommentCard
                    key={item?.id}
                    username={item?.profile?.handle}
                    avatar={item?.profile?.picture?.original?.url}
                    commentText={
                      item?.metadata?.content || item?.metadata?.description
                    }
                    commentTime={item?.createdAt}
                    id={item?.profile?.id}
                    isFollowdByMe={item?.profile?.isFollowedByMe}
                    name={item?.profile?.name}
                    stats={item?.stats}
                    commentId={item?.id}
                  />
                );
              })
            )}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "#1A1A1A",
          width: "100%",
          height: 60,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 0.2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src={getIPFSLink(userStore.currentProfile?.picture.original.url)}
            height={28}
            width={28}
          />
        </View>
        <TextInput
          placeholder="What's in your mind"
          style={{ flex: 1, color: "white" }}
          selectionColor={theme.PRIMARY}
          onFocus={(e) => {
            setIsFocused((state) => !state);
          }}
          onSubmitEditing={() => {
            setIsFocused((state) => !state);
          }}
          onPressIn={() => {
            setIsFocused((state) => !state);
          }}
          onPressOut={() => {
            setIsFocused((state) => !state);
          }}
          onBlur={() => {
            setIsFocused((state) => !state);
          }}
          onChange={(e) => {
            setCommentText(e.nativeEvent.text);
          }}
          placeholderTextColor={"white"}
        />
        {isFocused ? (
          <Pressable
            android_ripple={{
              color: commentText.length === 0 ? "gray" : theme.PRIMARY,
              radius: 20,
            }}
            style={{
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              // marginHorizontal: 2,
              paddingHorizontal: 12,
            }}
            onPressIn={publishComment}
          >
            <Feather
              name="send"
              color={commentText.length === 0 ? "gray" : theme.PRIMARY}
              size={24}
            />
          </Pressable>
        ) : (
          <></>
        )}
      </View>
    </SafeAreaView>
  );
};

export default VideoPage;
