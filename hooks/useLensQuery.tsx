import { useQuery } from "@apollo/client";
import fetchReaction from "../apollo/Queries/fetchReaction";
import { useAuthStore, useProfile } from "../store/Store";

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

export { useReaction };
