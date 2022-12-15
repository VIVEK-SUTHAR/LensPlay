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
import { Feather, AntDesign, Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { dark_primary, primary } from "../constants/Colors";
import useStore from "../store/Store";
import { useState } from "react";
import { Video } from "expo-av";
import addLike from "../api/addReaction";
import CommentCard from "../components/CommentCard";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { StatusBar } from "expo-status-bar";
import getIPFSLink from "../utils/getIPFSLink";

const VideoPage = ({ route }) => {
  const store = useStore();
  const currentIndex = store.currentIndex;
  const userFeed = store.userFeed;
  const wallet = useWalletConnect();
  const [likes, setLikes] = useState(
    userFeed[currentIndex]?.root?.stats?.totalUpvotes
  );
  const [descOpen, setDescOpen] = useState(false);
  const playbackId = route.params.playbackId;

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
        <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>

          <View style={{}}>
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
            <Text style={{ color: "white" }}>May 16, 2019</Text>
          </View>

          <ScrollView
            style={{
              paddingVertical: 24
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
                  borderColor: 'white',
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
                <AntDesign name="like2" size={16} color={'white'} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "white",
                    marginLeft: 4
                  }}
                >
                  {likes}
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
                  borderColor: 'white',
                }}
              >
                <AntDesign name="dislike2" size={16} color={'white'} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "white",
                    marginLeft: 4,
                  }}
                >
                  {userFeed[currentIndex]?.root?.stats?.totalDownvotes}
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
                  borderColor: 'white',
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
                  collect
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
                  borderColor: 'white',
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
                  borderColor: 'white',
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
                {userFeed[currentIndex]?.comments?.map((item, index) => {
                  return (
                    <CommentCard
                      key={index}
                      username={item?.profile?.handle}
                      avatar={item?.profile?.picture?.original?.url}
                      commentText={item?.metadata?.description}
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
