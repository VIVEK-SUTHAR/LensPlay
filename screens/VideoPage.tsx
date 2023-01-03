import {
  View,
  Share,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  BackHandler,
} from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useEffect } from "react";
import { dark_primary, primary } from "../constants/Colors";
import useStore from "../store/Store";
import { useState } from "react";
import addLike from "../api/addReaction";
import removeLike from "../api/removeReaction";
import CommentCard from "../components/CommentCard";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import { client } from "../apollo/client";
import getComments from "../apollo/Queries/getComments";
import freeCollectPublication from "../api/freeCollect";
import getProxyActionStatus from "../api/getProxyActionStatus";
import Avatar from "../components/UI/Avatar";
import Heading from "../components/UI/Heading";
import SubHeading from "../components/UI/SubHeading";
import createSubScribe from "../api/freeSubScribe";
import isFollowedByMe from "../api/isFollowedByMe";
import AnimatedLottieView from "lottie-react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Drawer from "../components/UI/Drawer";
import Player from "../components/VideoPlayer";
import Button from "../components/UI/Button";
import { RootStackScreenProps } from "../types/navigation/types";

const VideoPage = ({
  navigation,
  route,
}: RootStackScreenProps<"VideoPage">) => {
  const store = useStore();
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(route.params.stats?.totalUpvotes);
  const [inFullscreen, setInFullsreen] = useState(false);
  const [alreadyFollowing, setAlreadyFollowing] = useState(
    route?.params?.isFollowdByMe || false
  );
  const [ismodalopen, setIsmodalopen] = useState(false);
  const [isMute, setIsMute] = useState(false);
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

  const onLike = async () => {
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
      console.log("dissliked");
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
      removeLike(store.accessToken, store.profileId, route.params.id).then(
        (res) => {
          if (res) {
          }
        }
      );
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark_primary }}>
      <StatusBar
        style="light"
        backgroundColor={dark_primary}
        translucent={true}
      />
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
          />
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
              px={12}
              my={4}
              type={alreadyFollowing ? "outline" : "filled"}
              bg={alreadyFollowing ? "transparent" : "white"}
              textStyle={{
                fontSize: 14,
                fontWeight: "700",
                color: alreadyFollowing ? "white" : "black",
              }}
              onPress={async () => {
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
              title={likes || 0}
              mx={4}
              px={10}
              width={"auto"}
              type={"outline"}
              textStyle={{
                fontSize: 14,
                fontWeight: "500",
                color: isalreadyLiked ? primary : isLiked ? primary : "white",
                marginLeft: 4,
              }}
              borderColor={
                isalreadyLiked ? primary : isLiked ? primary : "white"
              }
              onPress={onLike}
              icon={
                <AntDesign
                  name="like2"
                  size={16}
                  color={isalreadyLiked ? primary : isLiked ? primary : "white"}
                />
              }
            />
            <Button
              title=""
              onPress={onDislike}
              mx={4}
              px={10}
              width={"auto"}
              type={"outline"}
              textStyle={{
                fontSize: 14,
                fontWeight: "500",
                color: "white",
                marginLeft: 4,
              }}
              borderColor={isalreadyDisLiked ? primary : "white"}
              icon={
                <AntDesign
                  name="dislike2"
                  size={16}
                  color={isalreadyDisLiked ? primary : "white"}
                />
              }
            />
            <Button
              title={`${STATS?.totalAmountOfCollects || 0} Collects`}
              mx={4}
              px={10}
              width={"auto"}
              type={"outline"}
              icon={<Entypo name="folder-video" size={18} color={"white"} />}
              onPress={() => {
                setIsmodalopen(true);
              }}
              textStyle={{ color: "white" }}
            />
            <Button
              title={"Share"}
              mx={4}
              px={10}
              width={"auto"}
              type={"outline"}
              icon={<FontAwesome name="share" size={16} color="white" />}
              onPress={onShare}
              textStyle={{ color: "white" }}
            />
            <Button
              title={"Share"}
              mx={4}
              px={10}
              width={"auto"}
              type={"outline"}
              icon={<MaterialIcons name="report" size={16} color="white" />}
              onPress={onShare}
              textStyle={{ color: "white" }}
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
