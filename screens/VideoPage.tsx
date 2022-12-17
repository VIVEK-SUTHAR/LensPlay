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
} from "react-native";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { dark_primary, primary } from "../constants/Colors";
import useStore from "../store/Store";
import { useState } from "react";
import { Video } from "expo-av";
import addLike from "../api/addReaction";
import CommentCard from "../components/CommentCard";
import { StatusBar } from "expo-status-bar";
import getIPFSLink from "../utils/getIPFSLink";
import { client } from "../apollo/client";
import getComments from "../apollo/Queries/getComments";
import convertDate from "../utils/formateDate";
const VideoPage = ({ route }) => {
  const store = useStore();
  const currentIndex = store.currentIndex;
  const userFeed = store.userFeed;
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(
    userFeed[currentIndex]?.root?.stats?.totalUpvotes
  );
  const [descOpen, setDescOpen] = useState(false);
  const playbackId = route.params.playbackId;

  const VIDEO_LINK = playbackId?.includes("https://arweave.net")
    ? playbackId
    : playbackId?.includes("ipfs://")
    ? `https://ipfs.io/ipfs/${playbackId?.split("//")[1]}`
    : playbackId;

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
  console.log(route.params.stats);
  const STATS = route.params.stats;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: userFeed[currentIndex]?.root?.metadata?.name,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  const [ismodalopen, setIsmodalopen] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark_primary }}>
      <StatusBar style="light" backgroundColor={dark_primary} />
      <Video
        style={styles.video}
        resizeMode="contain"
        source={{
          uri: getIPFSLink(playbackId),
        }}
        shouldPlay={true}
        useNativeControls={true}
        usePoster={true}
        posterSource={{
          uri: route.params.banner,
        }}
        posterStyle={{
          height: "100%",
          width: "100%",
          resizeMode: "stretch",
        }}
        isLooping={true}
      />
      <Modal
        animationType="fade"
        visible={ismodalopen}
        onRequestClose={() => {
          setIsmodalopen(false);
        }}
        statusBarTranslucent={true}
        transparent={true}
      >
        <StatusBar style="inverted" />
        <View
          style={{
            flex: 1,
            backgroundColor: "#rgba(0,0,0,0.7)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              marginTop: 300,
              flex: 1,
              backgroundColor: "#1d1d1d",
              width: "100%",
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              paddingVertical:20
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
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  color: "white",
                  fontWeight: "600",
                }}
              >
                {route.params.title} by {route.params.uploadedBy}
              </Text>
              <TouchableOpacity style={{ width: "90%",marginVertical:24 }}>
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 100,
                    paddingVertical: 8,
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 18,
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    Collect for free
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "white",
              }}
            >
              {route.params.title}
            </Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
              {userFeed[currentIndex]?.root?.metadata?.description}
            </Text>
          </View>
          <View style={{ flexDirection: "row", opacity: 0.5, marginTop: 8 }}>
            <Text style={{ marginRight: 10, color: "white" }}>
              3094505 views
            </Text>
            <Text style={{ color: "white" }}>{route.params.date}</Text>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              paddingVertical: 4,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ height: 40, width: 40 }}>
                <Image
                  source={{
                    uri: getIPFSLink(route.params.avatar),
                  }}
                  style={{ height: "100%", width: "100%", borderRadius: 500 }}
                />
              </View>
              <Text
                style={{
                  color: primary,
                  fontSize: 16,
                  fontWeight: "500",
                  marginHorizontal: 4,
                  alignSelf: "flex-start",
                }}
              >
                {route.params.uploadedBy}
              </Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                setIsmodalopen(true);
              }}
            >
              <View
                style={{
                  marginHorizontal: 4,
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: primary,
                }}
              >
                <AntDesign name="adduser" size={16} color={primary} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "white",
                    marginLeft: 8,
                  }}
                >
                  Subscribe
                </Text>
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
                console.log(store.accessToken);
                setLikes((prev) => prev + 1);
                addLike(
                  store.accessToken,
                  store.profileId,
                  userFeed[currentIndex]?.root?.id
                );
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
                  borderColor: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
                <AntDesign name="like2" size={16} color={"white"} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "white",
                    marginLeft: 4,
                  }}
                >
                  {STATS?.totalUpvotes || 0}
                </Text>
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
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "white",
                    marginLeft: 4,
                  }}
                ></Text>
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
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "white",
                    marginLeft: 8,
                  }}
                >
                  {STATS?.totalAmountOfCollects || 0} Collects
                </Text>
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
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "white",
                    marginLeft: 8,
                  }}
                >
                  Share
                </Text>
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
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "white",
                    marginLeft: 8,
                  }}
                >
                  Report
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              height: "auto",
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                marginHorizontal: 4,
                paddingHorizontal: 10,
                paddingVertical: 5,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "white",
              }}
            >
              <MaterialIcons name="report" size={16} color="white" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "white",
                  marginLeft: 8,
                }}
              >
                Report
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "white",
              }}
            >
              Comments
            </Text>
            {userFeed[currentIndex]?.comments == 0 ? (
              <Text style={{ fontSize: 16, marginTop: 10, color: "white" }}>
                There are no comments yet
              </Text>
            ) : (
              <>
                {comments?.map((item, index) => {
                  return (
                    <CommentCard
                      key={index}
                      username={item?.profile?.handle}
                      avatar={item?.profile?.picture?.original?.url}
                      commentText={item?.metadata?.description}
                      commentTime={convertDate(item?.createdAt)}
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
