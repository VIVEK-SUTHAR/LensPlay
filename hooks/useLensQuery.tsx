import { useQuery } from "@apollo/client";
import fetchReaction from "apollo/Queries/fetchReaction";
import { useAuthStore, useProfile } from "store/Store";
import { useGuestStore } from "store/GuestStore";

const useReaction = (pubId: string) => {
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();
  const {isGuest, profileId} = useGuestStore();

  const { data, error, loading } = useQuery(fetchReaction, {    
    variables: {
      id: isGuest?profileId:(currentProfile?.id),
      pubId: pubId,
    },
    fetchPolicy: "network-only",
    refetchWritePolicy: "merge",
    context: {
      headers: {
        "x-access-token": `${!accessToken?'':`Bearer ${accessToken}`}`,
      },
    },
  });
  return { data, error, loading };
};

export { useReaction };
