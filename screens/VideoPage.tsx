import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Share,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Feather, AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { primary } from "../constants/Colors";
import useStore from "../store/Store";
import { useState } from "react";
import { Video } from "expo-av";
import addLike from "../api/addReaction";
import CommentCard from "../components/CommentCard";

const VideoPage = () => {
  const store = useStore();
  const currentIndex = store.currentIndex;
  const userFeed = store.userFeed;
  const [likes, setLikes] = useState(
    userFeed[currentIndex]?.root?.stats?.totalUpvotes
  );
  const [descOpen, setDescOpen] = useState(false);
  console.log(userFeed[currentIndex]?.root?.stats?.totalUpvotes);
  const playbackId =
    userFeed[currentIndex]?.root?.metadata?.media[0]?.original?.url;
  console.log(playbackId);
  const VIDEO_LINK = playbackId?.includes("https://arweave.net")
    ? playbackId
    : `https://ipfs.io/ipfs/${playbackId.split("//")[1]}`;
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: userFeed[currentIndex]?.root?.metadata?.name,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <ScrollView>
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
          uri: "https://ipfs.io/ipfs/QmZGMkXhvxXNXPoPd8zCu5pXq6aV79wM7pbUVXny9B4VTb",
        }}
        isLooping={true}
      />
      <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ flex: 0.98, fontSize: 20, fontWeight: "800" }}>
            {userFeed[currentIndex]?.root?.metadata?.name}
          </Text>
          <Feather
            name={`chevron-${descOpen ? "up" : "down"}`}
            size={34}
            color="black"
            onPress={() => setDescOpen(!descOpen)}
          />
        </View>
        {descOpen ? (
          <View>
            <Text>{userFeed[currentIndex]?.root?.metadata?.description}</Text>
          </View>
        ) : (
          <Text></Text>
        )}
        <View style={{ flexDirection: "row", opacity: 0.5, marginTop: 8 }}>
          <Text style={{ marginRight: 10 }}>3094505 views</Text>
          <Text>May 16, 2019</Text>
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
              addLike(store.accessToken, store.profileId, "0x97fd-0x0e");
            }}
          >
            <View
              style={{
                backgroundColor: primary,
                paddingHorizontal: 16,
                paddingVertical: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 16,
              }}
            >
              <AntDesign name="like2" size={24} color="black" />
              <Text style={{ marginLeft: 4, fontSize: 16 }}>{likes}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: primary,
                paddingHorizontal: 16,
                paddingVertical: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 16,
              }}
            >
              <AntDesign name="dislike2" size={24} color="black" />
              <Text style={{ marginLeft: 4, fontSize: 15 }}>
                {userFeed[currentIndex]?.root?.stats?.totalDownvotes}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onShare}>
            <View
              style={{
                backgroundColor: primary,
                paddingHorizontal: 16,
                paddingVertical: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 16,
              }}
            >
              <Entypo name="share" size={24} color="black" />
              <Text style={{ marginLeft: 4, fontSize: 16 }}>Share</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <Text style={{ fontSize: 25, fontWeight: "800", marginTop: 20 }}>
            Comments
          </Text>
          {userFeed[currentIndex]?.comments == 0 ? (
            <Text style={{ fontSize: 16, marginTop: 10 }}>
              There are no comments yet
            </Text>
          ) : (
            <>
              {userFeed[currentIndex]?.comments?.map((item, index) => {
                console.log(item?.metadata?.description);

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
