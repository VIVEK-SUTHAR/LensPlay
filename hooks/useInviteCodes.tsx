import { useEffect, useState } from "react";
import { LENSPLAY_API } from "../constants";
import Logger from "../utils/logger";

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
  const [inviteCodes, setInviteCodes] = useState<
    GetInviteCodeAPIResponse[] | undefined
  >();
  const [error, setError] = useState<GetInviteResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const URL = `${LENSPLAY_API}invites/getValidInvites`;

  const headersList = {
    "Content-Type": "application/json",
  };
  const rawBody = JSON.stringify({
    profileId: profileId,
  });
  useEffect(() => {
    fetch(URL, {
      method: "POST",
      headers: headersList,
      body: rawBody,
    })
      .then((response) => response.json())
      .then((jsonRes: GetInviteCodeAPIJSONResponse) => {
        if (jsonRes.invites.length === 0) {
          setError(GetInviteResponse.ZERO_INVITES);
          return;
        }
        setInviteCodes(jsonRes.invites);
        Logger.Success("Got Invites", jsonRes);
      })
      .catch(() => {
        setError(GetInviteResponse.ERROR);
        Logger.Error("Failed to get invites");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return { inviteCodes, isLoading, error };
}
