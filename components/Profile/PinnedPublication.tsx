import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useAuthStore, useProfile } from "../../store/Store";
import {
  Attribute,
  Mirror,
  Post,
  usePublicationDetailsLazyQuery,
} from "../../types/generated";
import Heading from "../UI/Heading";
import VideoCard from "../VideoCard";

type Publication = Post | Mirror | null;

const PinnedPublication = () => {
  const [pinned, setPinned] = useState({
    hasPinned: false,
    pubId: "0x0",
  });
  const [pinnedPublication, setPinnedPublication] = useState<Publication>(null);
  const activeProfile = useProfile();
  const { accessToken } = useAuthStore();
  const getPinnedPublication = () => {
    const attributes = activeProfile?.currentProfile?.attributes;
    const pinnedPublication = attributes?.find(
      (attr: Attribute) =>
        attr.traitType === "pinnedPublicationId" ||
        attr.key === "pinnedPublicationId"
    );
    if (pinnedPublication) {
      setPinned({
        hasPinned: true,
        pubId: pinnedPublication.value,
      });
    }
  };
  const [getPost, { data }] = usePublicationDetailsLazyQuery({
    onError: () => {
      setPinned({
        hasPinned: false,
        pubId: "0x000",
      });
    },
  });

  useEffect(() => {
    getPost({
      variables: {
        request: {
          publicationId: pinned.pubId,
        },
        reactionRequest: {
          profileId: activeProfile?.currentProfile?.id,
        },
      },
      context: {
        headers: {
          "x-access-token": `Bearer ${accessToken}`,
        },
      },
    }).then((data) => {
      console.log(data?.data?.publication);
      setPinnedPublication(data?.data?.publication as Publication);
    });
  }, [pinned.hasPinned]);
  useEffect(() => {
    getPinnedPublication();
  }, []);

  return (
    <View>
      {pinned.hasPinned && (
        <View>
          {data && (
            <>
              <Heading
                title={"Pinned video"}
                style={{
                  fontSize: 20,
                  color: "white",
                  fontWeight: "600",
                }}
              />
              <VideoCard
                publication={pinnedPublication as Post}
                id={pinnedPublication?.id}
                height={150}
                width={300}
              />
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default PinnedPublication;
