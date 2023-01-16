export interface IAuthStore {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (newToken: string) => void;
  setRefreshToken: (newToken: string) => void;
}
export interface IUserProfile {
  profileId: string;
  avatar: string;
  name: string;
  handle: string;
  cover: string;
  bio: string;
  totalFollowers: number;
  totalFollowing: number;
  dispatcher: string;
}
export interface IThemeStore {
  PRIMARY: string;
  setPrimaryColor: (newPrimaryColor: string) => void;
}
