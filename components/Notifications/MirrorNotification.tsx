import React from "react";
import { Pressable, View } from "react-native";
import { NewMirrorNotification } from "../../types/generated";
import extractURLs from "../../utils/extractURL";
import formatAddress from "../../utils/formatAddress";
import getDifference from "../../utils/getDifference";
import getRawurl from "../../utils/getRawUrl";
import Icon from "../Icon";
import Avatar from "../UI/Avatar";
import StyledText from "../UI/StyledText";

type MirrorNotificationProps = {
  navigation: any;
  notification: NewMirrorNotification;
};

const MirrorNotification = ({
  navigation,
  notification,
}: MirrorNotificationProps) => {
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
        <Icon name="mirror" color={"#6bd841"} />
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
                src={getRawurl(notification?.profile?.picture)}
                height={35}
                width={35}
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
                title={` mirrored your ${
                  notification?.publication?.__typename == "Post"
                    ? "post"
                    : notification?.publication?.__typename == "Comment"
                    ? "comment"
                    : "mirrored post"
                }`}
                style={{ color: "gray" }}
              />
              <StyledText
                title={getDifference(notification?.createdAt)}
                style={{ fontSize: 10, color: "gray" }}
              />
            </View>
            <View>
              <StyledText
                title={extractURLs(
                  notification?.publication?.metadata?.description
                )}
                numberOfLines={2}
                style={{ color: "grey", fontSize: 12 }}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default MirrorNotification;
