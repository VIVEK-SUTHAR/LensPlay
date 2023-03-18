import { useQuery } from "@apollo/client";
import React from "react";
import fetchReaction from "../apollo/Queries/fetchReaction";
import getComments from "../apollo/Queries/getComments";
import getFeed from "../apollo/Queries/getFeed";
import getFollowers from "../apollo/Queries/getFollowers";
import getFollowing from "../apollo/Queries/getFollowing";
import getMirrorVideos from "../apollo/Queries/getMirrorVideos";
import getPublications from "../apollo/Queries/getPublications";
import getTrendingPublication from "../apollo/Queries/getTrendingPublication";
import getUserProfile from "../apollo/Queries/getUserProfile";
import isMirrored from "../apollo/Queries/isMirrored";
import notificationsQuery from "../apollo/Queries/notificationsQuery";
import searchProfileQuery from "../apollo/Queries/searchProfileQuery";
import { useAuthStore, useProfile } from "../store/Store";
import { FeedData } from "../types/Lens/Feed";

const useFeed = () => {
  const { accessToken, refreshToken } = useAuthStore();
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
    skip: !currentProfile?.id,
  });
  return { data, error, loading };
};

const useUserPublication = (publicationId: string | undefined) => {
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
  const {currentProfile} = useProfile();
  const { data, error, loading } = useQuery(getComments, {
    variables: {
      postId: publicationId,
      id: currentProfile?.id
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
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();

  const {
    data,
    error,
    loading,
    refetch,
    startPolling,
    previousData,
    fetchMore,
  } = useQuery(notificationsQuery, {
    variables: {
      pid: currentProfile?.id,
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

const useReaction = ( pubId: string) => {
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

const useIsMirrored = (publid: string) => {
  const { currentProfile } = useProfile();

  const { data, error } = useQuery(isMirrored, {
    variables: {
      pubid: publid,
      id: currentProfile?.id,
    },
    fetchPolicy: "network-only",
    refetchWritePolicy: "merge",
  });
  return { data, error };
};

export const useUserProfile = (profileId: string | undefined) => {
  const { data, error, loading, refetch } = useQuery(getUserProfile, {
    variables: {
      id: profileId,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
    pollInterval: 5000,
  });
  return { data, error, loading, refetch };
};

export const useUserMirrors = (profileId: string) => {
  const { accessToken } = useAuthStore();
  const { data, error, loading } = useQuery(getMirrorVideos, {
    variables: {
      id: profileId,
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
    pollInterval: 5000,
  });
  return { data, error, loading };
};

export default useNotifications;

export {
  useFeed,
  useExplorePublication,
  useUserPublication,
  useComments,
  useIsMirrored,
  useFollowers,
  useFollowing,
  useSearchProfile,
  useNotifications,
  useReaction
};
