import { useEffect, useState } from "react";
import { LENSPLAY_API } from "constants/index";
import { useInviteStore } from "store/InviteStore";
import Logger from "utils/logger";

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

export default function useInviteCodes(profileId: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { invites, inviteError, handleInvites, handleError } = useInviteStore();
  const URL = `${LENSPLAY_API}invites/getValidInvites`;
  const headersList = {
    "Content-Type": "application/json",
  };
  const rawBody = JSON.stringify({
    profileId: profileId,
  });
  function fetchInvites() {
    setIsLoading(true);
    fetch(URL, {
      method: "POST",
      headers: headersList,
      body: rawBody,
    })
      .then((response) => response.json())
      .then((jsonRes: GetInviteCodeAPIJSONResponse) => {
        if (jsonRes.invites.length === 0) {
          Logger.Success("Got zero Invites");
          handleError(GetInviteResponse.ZERO_INVITES);
          return;
        }
        handleInvites(jsonRes.invites);
        Logger.Success("Got Invites", jsonRes);
      })
      .catch(() => {
        handleError(GetInviteResponse.ERROR);
        Logger.Error("Failed to get invites");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  const refetch = () => {
    fetchInvites();
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  return { invites, isLoading, inviteError, refetch };
}
