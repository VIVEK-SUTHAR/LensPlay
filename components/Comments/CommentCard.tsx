import { Dimensions, Image, Pressable, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import getDifference from "../../utils/getDifference";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { CommentStats } from "../../types/Lens/Feed";
import {
  useAuthStore,
  useProfile,
  useReactionStore,
  useToast,
} from "../../store/Store";
import { addLike, freeMirror, removeLike } from "../../api";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import extractURLs from "../../utils/extractURL";
import Button from "../UI/Button";
import { dark_primary, primary } from "../../constants/Colors";
import Avatar from "../UI/Avatar";
import CollectIcon from "../svg/CollectIcon";
import MirrorIcon from "../svg/MirrorIcon";
import Icon from "../Icon";
import { CollectButton } from "../VIdeo";
import { useGuestStore } from "../../store/GuestStore";
import { ToastType } from "../../types/Store";
import RBSheet from "../UI/BottomSheet";
import getIPFSLink from "../../utils/getIPFSLink";
import formatHandle from "../../utils/formatHandle";
import { PublicationStats } from "../../types/generated";

type CommentCardProps = {
  avatar: string;
  username: string;
  commentText: string;
  commentTime: string;
  id: string;
  isFollowdByMe: boolean | undefined;
  name: string | undefined;
  stats: PublicationStats;
  commentId: string;
  isIndexing?: boolean;
  isAlreadyLiked: boolean;
};

const CommentCard = ({
  avatar,
  username,
  commentText,
  commentTime,
  id,
  isFollowdByMe,
  name,
  stats,
  commentId,
  isIndexing,
  isAlreadyLiked
}: CommentCardProps) => {
  const authStore = useAuthStore();
  const reactions = useReactionStore();
  const [Liked, setLiked] = useState<boolean>(isAlreadyLiked);
  const [likes, setLikes] = useState<number>(stats?.totalUpvotes);
  const navigation = useNavigation();
  const userStore = useProfile();
  
  const { isGuest } = useGuestStore();
  const toast = useToast();

  const setLike = async () => {
    if (isIndexing) return;
    if (!Liked) {
      const res = await addLike(
        authStore.accessToken,
        userStore.currentProfile?.id,
        commentId,
        "UPVOTE"
      )
      if (res.addReaction === null) {
        setLikes((prev) => prev + 1);
      }
    }
    else {
      const res = await removeLike(
        authStore.accessToken,
        userStore.currentProfile?.id,
        commentId,
      )
      if (res.removeReaction === null){
        setLikes((prev) => prev -  1);
      }
    }
  };

  // useEffect(() => {
  //   likedComments.map((id) => {
  //     if (id.id === commentId) {
  //       setisalreadyDisLiked(true);
  //     }
  //   });
  // }, [addLike]);

  const collectRef = useRef(null);
  const mirrorRef = useRef(null);

  return (
    <>
      <RBSheet ref={collectRef} height={Dimensions.get("window").height / 2.5}>
        <StyledText
          title={`Comment by  ${formatHandle(username)} `}
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "600",
            padding: 16,
            textAlign: "left",
          }}
        />
        <View
          style={{
            maxWidth: "100%",
            height: "auto",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <StyledText
            title={extractURLs(commentText)}
            style={{
              height: 150,
              color: "white",
              paddingHorizontal: 8,
              paddingVertical: 16,
            }}
          />
          <Button
            title={`Collect the comment for free`}
            width={"90%"}
            my={12}
            icon={<Icon name="collect" color="black" />}
            textStyle={{
              fontSize: 20,
              fontWeight: "700",
              textAlign: "center",
            }}
            // onPress={collectPublication}
          />
        </View>
      </RBSheet>
      <RBSheet ref={mirrorRef} height={Dimensions.get("window").height / 2.5}>
        <StyledText
          title={`Comment by  ${formatHandle(username)} `}
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "600",
            padding: 16,
            textAlign: "left",
          }}
        />
        <View
          style={{
            maxWidth: "100%",
            height: "auto",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <StyledText
            title={extractURLs(commentText)}
            style={{
              height: 150,
              color: "white",
              paddingHorizontal: 8,
              paddingVertical: 16,
            }}
          />
          <Button
            title={`Mirror the comment for free`}
            width={"90%"}
            my={12}
            icon={<Icon name="collect" color="black" />}
            textStyle={{
              fontSize: 20,
              fontWeight: "700",
              textAlign: "center",
            }}
            // onPress={collectPublication}
          />
        </View>
      </RBSheet>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "black",
          borderColor: dark_primary,
          borderBottomWidth: 1,
          paddingVertical: 8,
          marginVertical: 4,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("Channel", {
              profileId: id,
              isFollowdByMe: isFollowdByMe,
            });
          }}
          style={{
            marginRight: 8,
          }}
        >
          <Avatar src={avatar} height={40} width={40} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <View>
            <Heading
              title={name || id}
              style={{ fontSize: 14, color: "white", fontWeight: "500" }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Heading
                title={`@${username}`}
                style={{ fontSize: 12, color: "gray", marginTop: 2 }}
              />
              <StyledText
                title={isIndexing ? "Indexing" : getDifference(commentTime)}
                style={{ fontSize: 10, color: "gray" }}
              />
            </View>
          </View>
          <StyledText
            style={{
              fontSize: 14,
              color: "white",
              fontWeight: "600",
              marginTop: 4,
            }}
            title={extractURLs(commentText)}
          ></StyledText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
              justifyContent: "space-between",
            }}
          >
            <Button
              title={likes}
              onPress={() => {
                if (isGuest) {
                  toast.show("Please Login", ToastType.ERROR, true);
                  return;
                }
                setLike();
                setLiked(prev => !prev);
              }}
              width={"auto"}
              bg="transparent"
              type={"filled"}
              textStyle={{
                color: Liked?primary:"white",
                fontSize: 14,
                fontWeight: "500",
                marginLeft: 4,
                paddingEnd: 16,
              }}
              icon={
                <Icon
                  name="like"
                  size={16}
                  color={Liked ? primary : "white"}
                />
              }
            />
            <Button
              title={stats?.totalAmountOfCollects}
              py={4}
              width={"auto"}
              type={"filled"}
              px={16}
              bg="transparent"
              textStyle={{
                color: "white",
                fontSize: 14,
                fontWeight: "500",
                marginLeft: 4,
              }}
              icon={<Icon name="collect" size={20} />}
              onPress={() => {
                if (isGuest) {
                  toast.show("Please Login", ToastType.ERROR, true);
                  return;
                }
                collectRef?.current?.open();
                // setIsmodalopen(true);
              }}
            />
            <Button
              title={stats?.totalAmountOfMirrors}
              py={4}
              width={"auto"}
              type={"filled"}
              px={16}
              bg="transparent"
              textStyle={{
                color: "white",
                fontSize: 14,
                fontWeight: "500",
                marginLeft: 4,
              }}
              icon={<Icon name="mirror" size={20} />}
              borderColor="#232323"
              onPress={async () => {
                if (isGuest) {
                  toast.show("Please Login", ToastType.ERROR, true);
                  return;
                }
                mirrorRef?.current?.open();
              }}
            />
            <Button
              title={""}
              py={4}
              width={"auto"}
              type={"filled"}
              px={16}
              bg="transparent"
              textStyle={{
                color: "white",
                fontSize: 14,
                fontWeight: "500",
                marginLeft: 4,
              }}
              icon={<Icon name="report" size={20} />}
              borderColor="#232323"
              onPress={() => {
                navigation.navigate("ReportPublication", {
                  publicationId: id,
                });
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default React.memo(CommentCard);
