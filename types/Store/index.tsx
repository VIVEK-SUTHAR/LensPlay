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

export interface ToastProps {
  isVisible: boolean;
  message: string;
  timeout?: number;
  type?: ToastType;
  show: (message: string, type: ToastType, isVisible: boolean) => void;
}
export enum ToastType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  INFO = "INFO",
}
