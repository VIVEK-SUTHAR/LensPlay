import React from "react";
import { Pressable, View } from "react-native";
import { useThemeStore } from "../../store/Store";
import { NewReactionNotification } from "../../types/generated";
import extractURLs from "../../utils/extractURL";
import formatAddress from "../../utils/formatAddress";
import getDifference from "../../utils/getDifference";
import getIPFSLink from "../../utils/getIPFSLink";
import getRawurl from "../../utils/getRawUrl";
import Icon from "../Icon";
import Avatar from "../UI/Avatar";
import StyledText from "../UI/StyledText";

type ReactionNotificationProps = {
  navigation: any;
  notification: NewReactionNotification;
};

const ReactionNotification: React.FC<ReactionNotificationProps> = ({
  navigation,
  notification,
}) => {
  const { PRIMARY } = useThemeStore();

  return (
    <>
      <View
        style={{
          height: 35,
          width: 35,
          marginHorizontal: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="like" color={PRIMARY} />
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
            title={` liked your ${
              notification?.publication?.__typename == "Post"
                ? "post"
                : notification?.publication?.__typename == "Comment"
                ? "comment"
                : "mirrored post"
            }`}
            style={{ color: "gray" }}
          />
        </View>
        <View>
          <StyledText
            title={extractURLs(
              notification?.publication?.metadata?.content ||
                notification?.publication?.metadata?.description
            )}
            numberOfLines={2}
            style={{ fontSize: 12, color: "gray" }}
          />
        </View>
      </View>
    </>
  );
};
export default ReactionNotification;
