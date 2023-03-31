import { useQuery } from "@apollo/client";
import fetchReaction from "../apollo/Queries/fetchReaction";
import getFollowers from "../apollo/Queries/getFollowers";
import getFollowing from "../apollo/Queries/getFollowing";
import { useAuthStore, useProfile } from "../store/Store";

const useFollowing = (ethAddress: string | undefined) => {
  const { accessToken } = useAuthStore();
  const { data, loading, error, refetch } = useQuery(getFollowing, {
    variables: {
      subId: ethAddress,
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "cache-and-network",
    refetchWritePolicy: "merge",
    pollInterval: 5000,
    initialFetchPolicy: "network-only",
  });
  return { data, loading, error };
};

const useFollowers = (profileId: string | undefined) => {
  const { accessToken } = useAuthStore();
  const { data, error, loading } = useQuery(getFollowers, {
    variables: {
      id: profileId,
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "cache-and-network",
    refetchWritePolicy: "merge",
    pollInterval: 5000,
    initialFetchPolicy: "network-only",
  });
  return { data, error, loading };
};

const useReaction = (pubId: string) => {
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();

  const { data, error, loading } = useQuery(fetchReaction, {
    variables: {
      id: currentProfile?.id,
      pubId: pubId,
    },
    fetchPolicy: "network-only",
    refetchWritePolicy: "merge",
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });
  return { data, error, loading };
};

export { useFollowers, useFollowing, useReaction };
