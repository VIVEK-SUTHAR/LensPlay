import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRefreshMutation } from "customTypes/generated";
import React from "react";
import { useAuthStore } from "store/Store";
import storeTokens from "utils/storeTokens";

const TOKEN_UPDATE_INETRVAL = 60000;

export default function useUpdateTokens() {
  const { setAccessToken, setRefreshToken } = useAuthStore();
  const [getAccessFromRefresh] = useRefreshMutation();

  const updateTokens = async () => {
    const userTokens = await AsyncStorage.getItem("@user_tokens");
    if (userTokens) {
      const tokens = JSON.parse(userTokens);
      const generatedTime = tokens.generatedTime;
      const currentTime = new Date().getTime();
      const minute = Math.floor(
        ((currentTime - generatedTime) % (1000 * 60 * 60)) / (1000 * 60)
      );
      if (minute < 25) {
        return;
      } else {
        const data = await getAccessFromRefresh({
          variables: {
            request: {
              refreshToken: tokens.refreshToken,
            },
          },
        });

        const accessToken = data?.data?.refresh?.accessToken;
        const refreshToken = data?.data?.refresh?.refreshToken;

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        if (tokens.viaDesktop) {
          await storeTokens(accessToken, refreshToken, true);
          return;
        }
        if (!tokens.viaDesktop) {
          storeTokens(accessToken, refreshToken);
          return;
        }
      }
    }
  };

  React.useEffect(() => {
    updateTokens();
    const tokenInterval = setInterval(() => {
      updateTokens();
    }, TOKEN_UPDATE_INETRVAL);
    return clearInterval(tokenInterval);
  }, []);
}
