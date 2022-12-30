import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Share,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  ToastAndroid,
  BackHandler,
} from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useEffect } from "react";
import { dark_primary, primary } from "../constants/Colors";
import useStore from "../store/Store";
import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import addLike from "../api/addReaction";
import removeLike from "../api/removeReaction";
import CommentCard from "../components/CommentCard";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import getIPFSLink from "../utils/getIPFSLink";
import { client } from "../apollo/client";
import getComments from "../apollo/Queries/getComments";
import freeCollectPublication from "../api/freeCollect";
import getProxyActionStatus from "../api/getProxyActionStatus";
import VideoPlayer from "expo-video-player";
import Avatar from "../components/UI/Avatar";
import Heading from "../components/UI/Heading";
import SubHeading from "../components/UI/SubHeading";
import createSubScribe from "../api/freeSubScribe";
import isFollowedByMe from "../api/isFollowedByMe";
import AnimatedLottieView from "lottie-react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Drawer from "../components/UI/Drawer";

const VideoPage = ({ route, navigation }) => {
  const store = useStore();
  const currentIndex = store.currentIndex;
  const userFeed = store.userFeed;
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(route.params.stats?.totalUpvotes);
  const [inFullscreen, setInFullsreen] = useState(false);
  const [alreadyFollowing, setAlreadyFollowing] = useState(false);
  const [ismodalopen, setIsmodalopen] = useState(false);
  const [isMute, setIsMute] = useState(false);
  console.log(route.params.reaction);

  const playbackId = route.params.playbackId;

  const [isalreadyLiked, setisalreadyLiked] = useState(
    route.params.reaction === "UPVOTE" ? true : false
  );

  const [isalreadyDisLiked, setisalreadyDisLiked] = useState(
    route.params.reaction === "DOWNVOTE" ? true : false
  );

  useEffect(() => {
    fetchComments();
  }, [playbackId]);

  useEffect(() => {
    checkFollowed();
  }, []);

  async function checkFollowed(): Promise<void> {
    const data = await isFollowedByMe(
      route.params.profileId,
      store.accessToken
    );
    if (data.data.profile.isFollowedByMe) {
      setAlreadyFollowing(true);
      return;
    }
  }

  async function fetchComments(): Promise<void> {
    const data = await client.query({
      query: getComments,
      variables: {
        postId: route.params.id,
      },
    });
    setComments([]);
    setComments(data.data.publications.items);
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
        message: `Let's watch ${route.params.title} by ${route.params.uploadedBy} on LensPlay`,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark_primary }}>
      <StatusBar
        style="light"
        backgroundColor={dark_primary}
        translucent={true}
      />
      {/* <ImageBackground
        source={{ uri: getIPFSLink(route.params.banner) }}
        style={{
          width: "100%",
          height: inFullscreen ? Dimensions.get("screen").width * 0.95 : 280,
        }}
        blurRadius={8}
      > */}
      <VideoPlayer
        style={{
          width: inFullscreen
            ? Dimensions.get("screen").height
            : Dimensions.get("screen").width,
          height: inFullscreen ? Dimensions.get("screen").width * 0.95 : 280,
          videoBackgroundColor: "",
          controlsBackgroundColor: "transparent",
        }}
        textStyle={{
          fontSize: 14,
          fontWeight: "600",
        }}
        activityIndicator={{
          size: "large",
          color: primary,
        }}
        slider={{
          visible: true,
          thumbTintColor: "white",
          maximumTrackTintColor: "white",
          minimumTrackTintColor: primary,
        }}
        icon={{
          size: 48,
          play: <AntDesign name="play" color={primary} size={36} />,
          pause: <AntDesign name="pause" color={primary} size={36} />,
          replay: (
            <MaterialCommunityIcons name="replay" size={48} color={primary} />
          ),
        }}
        header={
          <Text
            style={{
              color: "white",
              paddingHorizontal: 20,
              fontSize: 18,
              fontWeight: "600",
              paddingVertical: 8,
            }}
          >
            {route.params.title}
          </Text>
        }
        videoProps={{
          usePoster: true,
          posterSource: {
            uri: getIPFSLink(route.params.banner),
          },
          posterStyle: {
            height: "100%",
            width: "100%",
            resizeMode: "contain",
          },
          isMuted: isMute,
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          source: {
            uri: getIPFSLink(playbackId),
          },
        }}
        fullscreen={{
          inFullscreen: inFullscreen,
          enterFullscreen: async () => {
            setStatusBarHidden(true, "fade");
            setInFullsreen(!inFullscreen);
            await ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.LANDSCAPE
            );
          },
          exitFullscreen: async () => {
            setStatusBarHidden(false, "fade");
            setInFullsreen(!inFullscreen);
            await ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.PORTRAIT
            );
          },
        }}
        mute={{
          enterMute: () => setIsMute(!isMute),
          exitMute: () => setIsMute(!isMute),
          isMute,
          visible: false,
        }}
      />
      {/* </ImageBackground> */}
      <Drawer isOpen={ismodalopen} setIsOpen={setIsmodalopen}>
      <View
            style={{
              width: "100%",
              height: "100%",
              opacity: 1,
              alignItems: "center",
            }}
          >
            <Video
              style={{
                alignSelf: "center",
                width: "90%",
                height: 280,
                borderRadius: 10,
              }}
              resizeMode="contain"
              source={{
                uri: getIPFSLink(playbackId),
              }}
              useNativeControls={true}
              usePoster={true}
              posterSource={{
                uri: route.params.banner,
              }}
              posterStyle={{
                height: "100%",
                width: "100%",
                resizeMode: "contain",
                borderRadius: 12,
              }}
              isLooping={true}
            />
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
            <TouchableOpacity
              style={{ width: "90%", marginVertical: 0 }}
              onPress={async () => {
                const res = await freeCollectPublication(
                  route.params.id,
                  store.accessToken
                );
                console.log(res);
                if (res?.proxyAction) {
                  setIsmodalopen(false);
                  console.log(res?.proxyAction);
                  ToastAndroid.show("Video collected", ToastAndroid.SHORT);
                  const status = await getProxyActionStatus(
                    res?.proxyAction,
                    store.accessToken
                  );
                }
              }}
            >
              <View
                style={{
                  backgroundColor: primary,
                  borderRadius: 100,
                  paddingVertical: 8,
                  marginVertical: 4,
                }}
              >
                <Heading
                  title="Collect for free"
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
      </Drawer>

      <ScrollView>
        <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
          <View>
            <Heading
              title={route.params.title}
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "white",
              }}
            />
            {/* <SubHeading
              title={userFeed[currentIndex]?.root?.metadata?.description}
              style={{ fontSize: 12, color: "gray" }}
            /> */}
          </View>
          <View style={{ flexDirection: "row", opacity: 0.5, marginTop: 8 }}>
            <SubHeading
              title="3094505 views"
              style={{ marginRight: 10, color: "white" }}
            />
            <SubHeading title={route.params.date} style={{ color: "white" }} />
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
            <TouchableWithoutFeedback
              onPress={async () => {
                // setIsmodalopen(true);
                try {
                  const data = await createSubScribe(
                    route.params.profileId,
                    store.accessToken
                  );
                  if (data.data === null) {
                    console.log(data.errors[0].message);

                    ToastAndroid.show(
                      data.errors[0].message,
                      ToastAndroid.SHORT
                    );
                  }
                  if (data.data.proxyAction) {
                    ToastAndroid.show(
                      "Subscribed Successfully",
                      ToastAndroid.SHORT
                    );
                  }
                } catch (error) {
                  if (error instanceof Error) {
                  }
                }
              }}
            >
              <View
                style={{
                  marginHorizontal: 4,
                  paddingHorizontal: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 50,
                  borderColor: alreadyFollowing ? "white" : undefined,
                  borderWidth: alreadyFollowing ? 1 : undefined,
                  backgroundColor: alreadyFollowing ? "transparent" : "white",
                }}
              >
                <Heading
                  title={alreadyFollowing ? "Unsubscribe" : "Subscribe"}
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    color: alreadyFollowing ? "white" : "black",
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <ScrollView
            style={{
              paddingVertical: 24,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                if (!isalreadyLiked && !isLiked) {
                  setLikes((prev) => prev + 1);
                  setIsLiked(true);
                  setisalreadyDisLiked(false);
                  addLike(
                    store.accessToken,
                    store.profileId,
                    route.params.id,
                    "UPVOTE"
                  ).then((res) => {
                    if (res.addReaction === null) {
                      console.log("liked");
                    }
                  });
                }
              }}
            >
              <View
                style={{
                  marginHorizontal: 4,
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: isalreadyLiked
                    ? primary
                    : isLiked
                      ? primary
                      : "white",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
                <AntDesign
                  name="like2"
                  size={16}
                  color={isalreadyLiked ? primary : isLiked ? primary : "white"}
                />
                <SubHeading
                  title={likes || 0}
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: isalreadyLiked
                      ? primary
                      : isLiked
                        ? primary
                        : "white",
                    marginLeft: 4,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                if (!isalreadyDisLiked) {
                  if (isalreadyLiked) {
                    setLikes((prev) => prev - 1);
                    setIsLiked(false);
                    setisalreadyLiked(false);
                  }
                  setisalreadyDisLiked(true);
                  console.log('dissliked');
                  addLike(
                    store.accessToken,
                    store.profileId,
                    route.params.id,
                    "DOWNVOTE"
                  ).then((res) => {
                    if (res) {
                      if (res.addReaction === null) {
                        console.log("added disliked");
                      }
                    }
                  });
                  removeLike(
                    store.accessToken,
                    store.profileId,
                    route.params.id
                  ).then((res) => {
                    if (res) {
                      console.log('tt')
                    }
                  });
                }
              }}>
              <View
                style={{
                  marginHorizontal: 4,
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: isalreadyDisLiked
                    ? primary
                    : "white",
                }}
              >
                <AntDesign name="dislike2" size={16} color={"white"} />
                <SubHeading
                  title=""
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "white",
                    marginLeft: 4,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
            onPress={()=>{setIsmodalopen(true)}}
            >
              <View
                style={{
                  marginHorizontal: 4,
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "white",
                }}
              >
                <Entypo name="folder-video" size={18} color={"white"} />
                <SubHeading
                  title={`${STATS?.totalAmountOfCollects || 0} Collects`}
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "white",
                    marginLeft: 8,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={onShare}>
              <View
                style={{
                  marginHorizontal: 4,
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "white",
                }}
              >
                <FontAwesome name="share" size={16} color="white" />
                <SubHeading
                  title="Share"
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "white",
                    marginLeft: 8,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <View
                style={{
                  marginHorizontal: 4,
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "white",
                }}
              >
                <MaterialIcons name="report" size={16} color="white" />
                <SubHeading
                  title="Report"
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "white",
                    marginLeft: 8,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
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

            {comments?.map((item, index) => {
              return (
                <CommentCard
                  key={index}
                  username={item?.profile?.handle}
                  avatar={item?.profile?.picture?.original?.url}
                  commentText={item?.metadata?.description}
                  commentTime={item?.createdAt}
                  id={item?.profile?.id}
                  navigation={navigation}
                />
              );
            })}
            {comments.length === 0 && (
              <View style={{ maxHeight: 200 }}>
                <AnimatedLottieView
                  autoPlay
                  style={{
                    height: "90%",
                    alignSelf: "center",
                  }}
                  source={require("../assets/nocomments.json")}
                />
                <Heading
                  title="There are no comments yet"
                  style={{
                    color: "white",
                    fontSize: 20,
                    textAlign: "center",
                  }}
                ></Heading>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VideoPage;

const styles = StyleSheet.create({
  video: {
    alignSelf: "center",
    width: Dimensions.get("screen").width,
    height: 280,
  },
});
