import React from "react";
import { useAuthStore, useProfile } from "../../store/Store";
import { Post, usePublicationDetailsQuery } from "../../types/generated";
import Heading from "../UI/Heading";
import VideoCard from "../VideoCard";

const PinnedPublication = ({ pubId }: { pubId: string }) => {
  const activeProfile = useProfile();
  const { accessToken } = useAuthStore();

  const { data, loading, error } = usePublicationDetailsQuery({
    variables: {
      request: {
        publicationId: pubId,
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
  });

  if (error) return <></>;
  if (data) {
    return (
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
    );
  }
  return <></>;
};

export default PinnedPublication;
