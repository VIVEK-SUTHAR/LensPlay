import { Pressable, Text, View } from "react-native";
import React from "react";
import NotificationCardProps from "./index.d";
import { AntDesign } from "@expo/vector-icons";
import Avatar from "../UI/Avatar";
import getIPFSLink from "../../utils/getIPFSLink";
import formatAddress from "../../utils/formatAddress";
import getDifference from "../../utils/getDifference";
import extractURLs from "../../utils/extractURL";
import LikeIcon from "../svg/LikeIcon";

const ReactionNotification: React.FC<NotificationCardProps> = ({
  navigation,
  notification,
}) => {
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
        {/* <AntDesign name="heart" size={24} color={"#E60073"} /> */}
        <LikeIcon filled={true} width={24} height={24} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Pressable
              onPress={() => {
                navigation.navigate("Channel", {
                  profileId: notification?.profile?.id,
                });
              }}
            >
              <Avatar
                src={getIPFSLink(notification?.profile?.picture?.original?.url)}
                height={35}
                width={35}
              />
            </Pressable>
            <Text style={{ color: "gray", fontSize: 14 }}>
              <Text style={{ color: "white", fontWeight: "600" }}>
                {notification?.profile?.handle?.split(".")[0] ||
                  formatAddress(notification?.wallet?.address)}{" "}
              </Text>
              liked your{" "}
              {notification?.publication?.__typename == "Post"
                ? "post"
                : notification?.publication?.__typename == "Comment"
                ? "comment"
                : "mirrored post"}
              <Text style={{ fontSize: 10, color: "gray" }}>
                {" "}
                {getDifference(notification?.createdAt)}
              </Text>
            </Text>
            <View>
              <Text style={{ color: "grey", fontSize: 12 }}>
                {extractURLs(notification?.publication?.metadata?.description)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
export default ReactionNotification;
