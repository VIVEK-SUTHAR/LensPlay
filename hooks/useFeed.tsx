import { useQuery } from "@apollo/client";
import React from "react";
import getComments from "../apollo/Queries/getComments";
import getFeed from "../apollo/Queries/getFeed";
import getFollowers from "../apollo/Queries/getFollowers";
import getFollowing from "../apollo/Queries/getFollowing";
import getPublications from "../apollo/Queries/getPublications";
import getTrendingPublication from "../apollo/Queries/getTrendingPublication";
import notificationsQuery from "../apollo/Queries/notificationsQuery";
import searchProfileQuery from "../apollo/Queries/searchProfileQuery";
import { useAuthStore, useProfile } from "../store/Store";
import { FeedData } from "../types/Lens/Feed";
const useFeed = () => {
  const { accessToken } = useAuthStore();
  const { currentProfile } = useProfile();

  const { data, error, loading, refetch } = useQuery<FeedData>(getFeed, {
    variables: {
      id: currentProfile?.id,
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
    initialFetchPolicy: "cache-and-network",
    pollInterval: 600000,
    refetchWritePolicy: "merge",
  });
  return { data, error, loading, refetch };
};

const useExplorePublication = () => {
  const { accessToken } = useAuthStore();
  const { currentProfile } = useProfile();

  const { data, error, loading } = useQuery(getTrendingPublication, {
    variables: {
      id: currentProfile?.id,
      sort: "LATEST",
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "cache-and-network",
    pollInterval: 500000,
    skip: !currentProfile?.id,
  });
  return { data, error, loading };
};

const useUserPublication = (publicationId: string) => {
  const { accessToken } = useAuthStore();

  const { data, error, loading } = useQuery(getPublications, {
    variables: {
      id: publicationId,
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "cache-and-network",
    refetchWritePolicy: "merge",
    initialFetchPolicy: "network-only",
  });
  return { data, error, loading };
};

const useComments = (publicationId: string) => {
  const { accessToken } = useAuthStore();
  const { data, error, loading } = useQuery(getComments, {
    variables: {
      postId: publicationId,
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

const useSearchProfile = (profile: string) => {
  const { accessToken } = useAuthStore();
  const { data, error, loading } = useQuery(searchProfileQuery, {
    variables: {
      query: profile,
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });
  return { data, error, loading };
};
const useNotifications = () => {
  const activeProfile = useProfile();
  const { accessToken } = useAuthStore();
  const {
    data,
    error,
    loading,
    refetch,
    startPolling,
    previousData,
    fetchMore
  } = useQuery(notificationsQuery, {
    variables: {
      pid: activeProfile.currentProfile?.id,
    },
    fetchPolicy: "cache-and-network",
    initialFetchPolicy: "network-only",
    refetchWritePolicy: "merge",
    pollInterval: 100,
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });
  return { data, error, loading, refetch, startPolling, previousData };
};
export default useNotifications;

export {
  useFeed,
  useExplorePublication,
  useUserPublication,
  useComments,
  useFollowers,
  useFollowing,
  useSearchProfile,
  useNotifications,
};
