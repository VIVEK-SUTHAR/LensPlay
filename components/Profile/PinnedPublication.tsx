import React, { useEffect } from "react";
import usePinStore from "../../store/pinStore";
import { useAuthStore, useProfile } from "../../store/Store";
import {
  Attribute,
  Post,
  usePublicationDetailsLazyQuery,
} from "../../types/generated";
import Heading from "../UI/Heading";
import VideoCard from "../VideoCard";

const PinnedPublication = () => {
  const activeProfile = useProfile();
  const { accessToken } = useAuthStore();
  const pinStore = usePinStore();

  useEffect(() => {
    getPinnedPublication();
  }, [pinStore.publicationId]);

  const getPinnedPublication = () => {
    const attributes = activeProfile?.currentProfile?.attributes;
    const pinnedPublication = attributes?.find(
      (attr: Attribute) =>
        attr.traitType === "pinnedPublicationId" ||
        attr.key === "pinnedPublicationId"
    );
    if (pinnedPublication) {
      pinStore.setHasPinned(true);
      pinStore.setPinnedPubId(pinnedPublication.value);
      fetchPinnedPublication({
        variables: {
          request: {
            publicationId: pinnedPublication.value,
          },
          reactionRequest: {
            profileId: activeProfile?.currentProfile?.id,
          },
        },
      });
    }
  };

  const [
    fetchPinnedPublication,
    { data, loading, error },
  ] = usePublicationDetailsLazyQuery({
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });

  if (error) return <></>;
  if (data) {
    return (
      <>
        {pinStore.hasPinned && (
          <>
            <Heading
              title={"Pinned video"}
              style={{
                fontSize: 12,
                color: "white",
                fontWeight: "600",
              }}
            />
            <VideoCard
              publication={data?.publication as Post}
              id={data?.publication?.id}
              height={150}
              width={"94%"}
            />
          </>
        )}
      </>
    );
  }
  return <></>;
};

export default PinnedPublication;
