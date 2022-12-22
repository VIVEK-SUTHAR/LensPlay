import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Share,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground,
  Animated,
} from "react-native";
import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import React, { useEffect } from "react";
import { dark_primary, primary } from "../constants/Colors";
import useStore from "../store/Store";
import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import addLike from "../api/addReaction";
import CommentCard from "../components/CommentCard";
import { StatusBar } from "expo-status-bar";
import getIPFSLink from "../utils/getIPFSLink";
import { client } from "../apollo/client";
import getComments from "../apollo/Queries/getComments";
import convertDate from "../utils/formateDate";
import freeCollectPublication from "../api/freeCollect";
import getProxyActionStatus from "../api/getProxyActionStatus";
import VideoPlayer from "expo-video-player";
import Avatar from "../components/UI/Avatar";
import Heading from "../components/UI/Heading";
import SubHeading from "../components/UI/SubHeading";

const VideoPage = ({ route }) => {
  const store = useStore();
  const currentIndex = store.currentIndex;
  const userFeed = store.userFeed;
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(route.params.stats?.totalUpvotes);
  const [descOpen, setDescOpen] = useState(false);
  const [inFullscreen, setInFullsreen] = useState(false);

  const playbackId = route.params.playbackId;
  console.log(store.accessToken);

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const data = await client.query({
      query: getComments,
      variables: {
        postId: route.params.id,
      },
    });
    setComments(data.data.publications.items);
  }

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

  const [ismodalopen, setIsmodalopen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark_primary }}>
      <StatusBar style="light" backgroundColor={dark_primary} />

      <VideoPlayer
        style={{
          width: Dimensions.get("screen").width,
          height: 280,
          videoBackgroundColor: "transparent",
          controlsBackgroundColor: "transparent",
        }}
        mute={{
          visible: true,
        }}
        fullscreen={{
          visible: true,
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
          play: <Feather name="play" color={primary} size={36} />,
          pause: <AntDesign name="pause" color={primary} size={36} />,
          replay: (
            <MaterialCommunityIcons name="replay" size={48} color={primary} />
          ),
        }}
        header={<Text style={{ color: "#FFF" }}>Custom title</Text>}
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
          isMuted: false,
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          source: {
            uri: getIPFSLink(playbackId),
          },
        }}
      />

      <Modal
        animationType="slide"
        visible={ismodalopen}
        onRequestClose={() => {
          setIsmodalopen(false);
        }}
        // statusBarTranslucent={true}
        transparent={true}
        style={{}}
      >
        <StatusBar backgroundColor="black" />
        <TouchableWithoutFeedback
          onPress={() => {
            setIsmodalopen(false);
          }}
        >
          <View
            style={{
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.8)",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></View>
        </TouchableWithoutFeedback>

        <View
          style={{
            // marginTop: -450,
            position: "absolute",
            top: "40%",
            zIndex: 2,
            backgroundColor: "#1d1d1d",
            height: "100%",
            width: "100%",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            paddingVertical: 20,
          }}
        >
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
                  ToastAndroid.show("Video collected",ToastAndroid.SHORT)
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
        </View>
      </Modal>
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
            <SubHeading
              title={userFeed[currentIndex]?.root?.metadata?.description}
              style={{ fontSize: 12, color: "gray" }}
            />
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
              onPress={() => {
                setIsmodalopen(true);
              }}
            >
              <View
                style={{
                  marginHorizontal: 4,
                  paddingHorizontal: 24,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 50,
                  backgroundColor: "white",
                }}
              >
                <Heading
                  title="Subscribe"
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
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
                setLikes((prev) => prev + 1);
                setIsLiked(true);
                addLike(
                  store.accessToken,
                  store.profileId,
                  route.params.id
                ).then((res) => {
                  if (res.addReaction === null) {
                    console.log("liked");
                  }
                });
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
                  borderColor: isLiked ? primary : "white",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
                <AntDesign
                  name="like2"
                  size={16}
                  color={isLiked ? primary : "white"}
                />
                <SubHeading
                  title={likes || 0}
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: isLiked ? primary : "white",
                    marginLeft: 4,
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
                <AntDesign name="switcher" size={16} color="white" />
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

            {userFeed[currentIndex]?.comments == 0 ? (
              <SubHeading
                title="There are no comments yet"
                style={{ fontSize: 16, marginTop: 10, color: "white" }}
              />
            ) : (
              <>
                {comments?.map((item, index) => {
                  return (
                    <CommentCard
                      key={index}
                      username={item?.profile?.handle}
                      avatar={item?.profile?.picture?.original?.url}
                      commentText={item?.metadata?.description}
                      commentTime={item?.createdAt}
                    />
                  );
                })}
              </>
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
