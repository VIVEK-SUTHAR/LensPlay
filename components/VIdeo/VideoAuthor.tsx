import React, { useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { createFreeSubscribe } from "../../api";
import { useGuestStore } from "../../store/GuestStore";
import { useAuthStore, useThemeStore, useToast } from "../../store/Store";
import { ToastType } from "../../types/Store";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import { useNavigation } from "@react-navigation/native";

type VideoCreatorProps = {
  avatarLink: string;
  uploadedBy: string;
  profileId: string;
  alreadyFollowing: boolean;
  showSubscribeButton?: boolean;
  showSubscribers?: boolean;
  subscribersCount?: number;
  ownedBy: string;
};

const VideoCreator = (props: VideoCreatorProps) => {
  const {
    profileId,
    uploadedBy,
    avatarLink,
    alreadyFollowing,
    showSubscribers = false,
    subscribersCount = 0,
    showSubscribeButton = true,
    ownedBy,
  } = props;

  const [following, setFollowing] = useState<boolean>(alreadyFollowing);

  const { accessToken } = useAuthStore();
  const { PRIMARY } = useThemeStore();
  const toast = useToast();
  const { isGuest } = useGuestStore();
  const navigation = useNavigation();

  const followCreator = React.useCallback(async () => {
    if (isGuest) {
      toast.error("Please Login");
      return;
    }
    if (following) {
      toast.error("Currently not supported");
      return;
    }
    try {
      const data = await createFreeSubscribe(profileId, accessToken);
      if (data?.data?.proxyAction !== null) {
        toast.success("Subscribed succesfully");
        setFollowing(true);
      }
    } catch (error) {
      if (error instanceof Error) {
      }
    }
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("Channel", {
          profileId: profileId,
          isFollowdByMe: alreadyFollowing,
          name: uploadedBy,
          ethAddress: ownedBy,
        });
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 4,
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar src={avatarLink} width={40} height={40} />
          <View style={{ marginHorizontal: 8 }}>
            <Heading
              title={uploadedBy}
              numberOfLines={1}
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "500",
                maxWidth: 160,
              }}
            />
            <StyledText
              title={
                showSubscribers
                  ? `${subscribersCount} Subscribers`
                  : `@${uploadedBy}`
              }
              style={{
                color: "gray",
                fontSize: 12,
                fontWeight: "500",
              }}
            />
          </View>
        </View>
        {Boolean(showSubscribeButton) && (
          <Button
            title={following ? "Unsubscribe" : "Subscribe"}
            width={"auto"}
            px={24}
            py={8}
            type={"filled"}
            bg={"white"}
            textStyle={{
              fontSize: 14,
              fontWeight: "600",
            }}
            onPress={followCreator}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(VideoCreator);
