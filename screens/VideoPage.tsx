import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Share,
  TouchableWithoutFeedback,
  ScrollView,
  Button,
  SafeAreaView,
} from "react-native";
import { Feather, AntDesign, Entypo } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { dark_primary, primary } from "../constants/Colors";
import useStore from "../store/Store";
import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import addLike from "../api/addReaction";
import CommentCard from "../components/CommentCard";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { StatusBar } from "expo-status-bar";
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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark_primary }}>
      <ScrollView>
        <StatusBar style="light" backgroundColor={dark_primary} />
        <Video
          style={styles.video}
          resizeMode="contain"
          source={{
            uri: VIDEO_LINK,
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
        <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                flex: 0.98,
                fontSize: 20,
                fontWeight: "800",
                color: "white",
              }}
            >
              {route.params.title}
            </Text>
            <Feather
              name={`chevron-${descOpen ? "up" : "down"}`}
              size={34}
              color="white"
              onPress={() => setDescOpen(!descOpen)}
            />
          </View>
          {descOpen ? (
            <View>
              <Text style={{ color: "white" }}>
                {userFeed[currentIndex]?.root?.metadata?.description}
              </Text>
            </View>
          ) : (
            <Text></Text>
          )}
          <View style={{ flexDirection: "row", opacity: 0.5, marginTop: 8 }}>
            <Text style={{ marginRight: 10, color: "white" }}>
              3094505 views
            </Text>
            <Text style={{ color: "white" }}>{route.params.date}</Text>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
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
                  marginHorizontal: 8,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  width: "auto",
                  height: "auto",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  borderColor: primary,
                  borderWidth: 1,
                }}
              >
                <AntDesign name="like2" size={24} color={primary} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "white",
                    marginHorizontal: 4,
                  }}
                >
                  <Text style={{ marginLeft: 4, fontSize: 16 }}>{likes}</Text>
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  marginHorizontal: 8,
                  backgroundColor: "rgba(255,255,255,0.07)",
                  width: "auto",
                  height: "auto",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  borderColor: primary,
                  borderWidth: 1,
                }}
              >
                <AntDesign name="dislike2" size={24} color={primary} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "white",
                    marginHorizontal: 4,
                  }}
                >
                  {userFeed[currentIndex]?.root?.stats?.totalDownvotes}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onShare}>
              <View
                style={{
                  marginHorizontal: 8,
                  backgroundColor: "rgba(255,255,255,0.07)",
                  width: "auto",
                  height: "auto",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  borderColor: primary,
                  borderWidth: 1,
                }}
              >
                <Entypo name="share" size={24} color={primary} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "white",
                    marginHorizontal: 4,
                  }}
                >
                  <Text style={{ marginLeft: 4, fontSize: 16 }}>Share</Text>
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  marginHorizontal: 8,
                  backgroundColor: "rgba(255,255,255,0.07)",
                  width: "auto",
                  height: "auto",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  borderColor: primary,
                  borderWidth: 1,
                }}
              >
                <Feather name="flag" size={24} color={primary} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "white",
                    marginHorizontal: 4,
                  }}
                >
                  <Text style={{ marginLeft: 4, fontSize: 16 }}>Report</Text>
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "800",
                marginTop: 20,
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
