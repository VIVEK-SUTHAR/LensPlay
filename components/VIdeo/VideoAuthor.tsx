import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { LENSPLAY_SITE } from "../../constants";
import { useGuestStore } from "../../store/GuestStore";
import { useAuthStore, useToast } from "../../store/Store";
import { useProxyActionMutation } from "../../types/generated";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";

type VideoCreatorProps = {
  avatarLink: string;
  uploadedBy: string;
  profileId: string;
  alreadyFollowing: boolean;
  showSubscribeButton?: boolean;
  showSubscribers?: boolean;
  subscribersCount?: number;
};

const VideoCreator: React.FC<VideoCreatorProps> = React.memo((props) => {
  const {
    profileId,
    uploadedBy,
    avatarLink,
    alreadyFollowing,
    showSubscribers = false,
    subscribersCount = 0,
    showSubscribeButton = true,
  } = props;

  const [following, setFollowing] = useState<boolean>(alreadyFollowing);

  const { accessToken } = useAuthStore();
  const { isGuest } = useGuestStore();
  const toast = useToast();

  const [freeFollow] = useProxyActionMutation();

  const followCreator = useCallback(() => {
    if (isGuest) {
      toast.error("Please Login to follow");
      return;
    }
    if (following) {
      toast.error("Currently not supported");
      return;
    }
    try {
      toast.success("Followed");
      setFollowing(true);
      freeFollow({
        variables: {
          request: {
            follow: {
              freeFollow: {
                profileId: profileId,
              },
            },
          },
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${accessToken}`,
            origin: LENSPLAY_SITE,
          },
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to follow...");
        setFollowing(false);
        // Handle errors like follow module set
        // Any one take
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Avatar src={avatarLink} width={40} height={40} />
        <View style={styles.textContainer}>
          <Heading title={uploadedBy} style={styles.heading} />
          <StyledText
            title={
              showSubscribers
                ? `${subscribersCount} Subscribers`
                : `@${uploadedBy}`
            }
            style={styles.subtext}
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
          textStyle={styles.buttonText}
          onPress={followCreator}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    justifyContent: "space-between",
    marginTop: 16,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  textContainer: {
    marginHorizontal: 8,
    maxWidth: 185,
  },
  heading: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  subtext: {
    color: "gray",
    fontSize: 12,
    fontWeight: "500",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default VideoCreator;
