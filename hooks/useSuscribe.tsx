import cache from "apollo/cache";
import { Profile, useBroadcastOnchainMutation, useCreateFollowTypedDataMutation, useFollowMutation } from "customTypes/generated";
import useProfileStore from "store/profileStore";
import getSignature from "utils/getSignature";
import Logger from "utils/logger";
import { useSignTypedData } from "wagmi";

export default function useSubscribe() {
  const { currentProfile } = useProfileStore();
  const { signTypedDataAsync, error } = useSignTypedData();

  const updateCache = (channel: Profile) => {
    try {
      cache.modify({
        id: cache.identify(channel as any),
        fields: {
          isFollowedByMe() {
            return true;
          },
        },
      });
    } catch (error) {
      Logger.Error("error", error);
    }
  };

  const [broadcastOnchain] = useBroadcastOnchainMutation();
  const [follow] = useFollowMutation();
  const [createFollowTypedData] = useCreateFollowTypedDataMutation();

  const subscribeChannel = async (
    profile: Profile,
    signature: any,
    id: any
  ) => {
    updateCache(profile);
    if (currentProfile?.sponsor) {
      const { data } = await broadcastOnchain({
        variables: { request: { id, signature } },
      });
      return;
    }
  };

  const subscribeViaLensManager = async (profile: Profile) => {
    const { data } = await follow({
      variables: {
        request: {
          follow: [profile?.id],
        },
      },
    });
    return data;
  };

  const signSubscribeMessage = async (profile: Profile) => {
    const data = await createFollowTypedData({
      variables: {
        request: {
          follow: [profile?.id],
        },
      },
    });

    if (data?.data?.createFollowTypedData?.typedData) {
      Logger.Success("Lens API:Typed Data", data);
      const message = getSignature(
        data?.data?.createFollowTypedData?.typedData
      );

      Logger.Success("Formatted Typed Data", message);
      const sign = await signTypedDataAsync(message);

      if (error) return null;

      const id = data?.data?.createFollowTypedData?.id;

      if (sign && id) {
        return { sign, id };
      }
    }

    return null;
  };

  return { subscribeChannel, signSubscribeMessage, subscribeViaLensManager };
}
