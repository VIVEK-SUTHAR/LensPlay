import { View, Text } from "react-native";
import React, { useState } from "react";
import Avatar from "../UI/Avatar";
import Heading from "../UI/Heading";
import { useAuthStore, useThemeStore, useToast } from "../../store/Store";
import StyledText from "../UI/StyledText";
import { ToastType } from "../../types/Store";
import { createFreeSubscribe } from "../../api";
import Button from "../UI/Button";
import { useGuestStore } from "../../store/GuestStore";

type VideoCreatorProps = {
  avatarLink: string;
  uploadedBy: string;
  profileId: string;
  alreadyFollowing: boolean;
};

const VideoCreator = (props: VideoCreatorProps) => {
  const { profileId, uploadedBy, avatarLink, alreadyFollowing } = props;

  const [following, setFollowing] = useState<boolean>(alreadyFollowing);

  const { accessToken } = useAuthStore();
  const { PRIMARY } = useThemeStore();
  const toast = useToast();
  const { isGuest } = useGuestStore();

  const followCreator = async () => {
    if (isGuest) {
      toast.show("Please Login", ToastType.ERROR, true);
      return;
    }
    if (following) {
      toast.show("Currently not supported", ToastType.ERROR, true);
      return;
    }
    try {
      const data = await createFreeSubscribe(profileId, accessToken);
      if (data.data.proxyAction !== null) {
        toast.show("Subscribed succesfully", ToastType.SUCCESS, true);
        setFollowing(true);
      }
    } catch (error) {
      if (error instanceof Error) {
      }
    }
  };

  return (
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
        <Avatar src={avatarLink} width={40} height={40} />
        <View style={{ marginHorizontal: 8 }}>
          <Heading
            title={uploadedBy}
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "500",
            }}
          />
          <StyledText
            title={`@${uploadedBy}`}
            style={{
              color: "gray",
              fontSize: 12,
              fontWeight: "500",
            }}
          />
        </View>
      </View>
      <Button
        title={following ? "Unsubscribe" : "Subscribe"}
        width={"auto"}
        px={16}
        py={8}
        type={"filled"}
        bg={PRIMARY}
        textStyle={{
          fontSize: 16,
          fontWeight: "700",
          marginHorizontal: 4,
          color: "black",
        }}
        onPress={followCreator}
      />
    </View>
  );
};

export default VideoCreator;
