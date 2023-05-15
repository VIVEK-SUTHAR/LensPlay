import { useEffect, useState } from "react";
import { LENSPLAY_API } from "../constants";
import { useInviteStore } from "../store/InviteStore";
import Logger from "../utils/logger";
import { useProfile } from "../store/Store";

export enum GetInviteResponse {
  ZERO_INVITES = "ZERO INVITES",
  ERROR = "ERROR",
}

type GetInviteCodeAPIJSONResponse = {
  invites: GetInviteCodeAPIResponse[];
};

export type GetInviteCodeAPIResponse = {
  profileId: string;
  inviteCode: string;
  isValid: boolean;
  id: string;
};

export default function useInviteCodes() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetch, setisRefetch] = useState(false);
  const { currentProfile } = useProfile();
  const { invites, inviteError, handleInvites, handleError } = useInviteStore();
  const URL = `${LENSPLAY_API}invites/getValidInvites`;
  const profileId = currentProfile?.id;

  const headersList = {
    "Content-Type": "application/json",
  };
  const rawBody = JSON.stringify({
    profileId: profileId,
  });

  const refetch = () => {
    if (isRefetch) {
      setisRefetch(false);
    } else {
      setisRefetch(true);
    }
  };

  useEffect(() => {
    if (invites.length === 0 || isRefetch) {
      setIsLoading(true);
      fetch(URL, {
        method: "POST",
        headers: headersList,
        body: rawBody,
      })
        .then((response) => response.json())
        .then((jsonRes: GetInviteCodeAPIJSONResponse) => {
          if (jsonRes.invites.length === 0) {
            // setError(GetInviteResponse.ZERO_INVITES);
            Logger.Success("Got zero Invites");
            handleError(GetInviteResponse.ZERO_INVITES);
            return;
          }
          // setInviteCodes(jsonRes.invites);
          handleInvites(jsonRes.invites);
          Logger.Success("Got Invites", jsonRes);
        })
        .catch(() => {
          // setError(GetInviteResponse.ERROR);
          handleError(GetInviteResponse.ERROR);
          Logger.Error("Failed to get invites");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    setisRefetch(false);
  }, [isRefetch]);
  return { invites, isLoading, inviteError, refetch, isRefetch };
}
