import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, View } from "react-native";
import { dark_primary } from "../../constants/Colors";
import { NewCommentNotification } from "../../types/generated";
import formatAddress from "../../utils/formatAddress";
import getDifference from "../../utils/getDifference";
import getIPFSLink from "../../utils/getIPFSLink";
import getRawurl from "../../utils/getRawUrl";
import Icon from "../Icon";
import Avatar from "../UI/Avatar";
import StyledText from "../UI/StyledText";

type CommentNotificationProps = {
  notification: NewCommentNotification;
};

const CommentNotification: React.FC<CommentNotificationProps> = ({
  notification,
}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      android_ripple={{
        borderless: false,
        color: "rgba(255,255,255,0.1)",
      }}
      style={{
        flexDirection: "row",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: dark_primary,
      }}
    >
      <View
        style={{
          height: 35,
          width: 35,
          marginHorizontal: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="comment" color="cyan" />
      </View>
      <View style={{ flex: 1 }}>
        <Pressable
          onPress={() => {
            navigation.navigate("Channel", {
              profileId: notification?.profile?.id,
            });
          }}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Avatar
            src={getIPFSLink(getRawurl(notification?.profile?.picture))}
            height={35}
            width={35}
          />
          <StyledText
            title={getDifference(notification?.createdAt)}
            style={{ fontSize: 12, color: "gray" }}
          />
        </Pressable>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <StyledText
            title={
              notification?.profile?.handle?.split(".")[0] ||
              formatAddress(notification?.profile?.ownedBy)
            }
            style={{ color: "white", fontWeight: "500" }}
          />
          <StyledText
            title={` commented on your ${
              notification?.comment?.commentOn?.__typename === "Post"
                ? "post"
                : notification?.comment?.commentOn?.__typename === "Comment"
                ? "comment"
                : "mirror"
            }`}
            style={{ color: "gray" }}
          />
        </View>
        {/* <StyledText
          title={
            notification?.comment?.metadata?.description ||
            notification?.comment?.metadata?.content
          }
          numberOfLines={2}
          style={{ fontSize: 10, color: "gray" }}
        /> */}
      </View>
    </Pressable>
  );
};
export default CommentNotification;
