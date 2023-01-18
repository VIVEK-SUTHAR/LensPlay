import { Profile } from "../Lens";

export interface IAuthStore {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (newToken: string) => void;
  setRefreshToken: (newToken: string) => void;
}
export interface IThemeStore {
  PRIMARY: string;
  setPrimaryColor: (newPrimaryColor: string) => void;
}
export interface UserStore {
  currentProfile: Profile | null;
  setCurrentProfile: (currentProfile: Profile | null) => void;
}
