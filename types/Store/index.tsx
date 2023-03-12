import { ColorValue } from "react-native";
import { Profile } from "../Lens";

export interface IAuthStore {
  accessToken: string;
  refreshToken: string;
  hasAccess: boolean;
  viaDeskTop: boolean;
  setAccessToken: (newToken: string) => void;
  setRefreshToken: (newToken: string) => void;
  handleAccess: (newValue: boolean) => void;
  setIsViaDeskTop: (newValue: boolean) => void;
}
export interface IThemeStore {
  PRIMARY: string;
  DARK_PRIMARY: string;
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
export interface IReactionStore {
  likedPublication: LikeObject[];
  likedComments: DisLikeObject[];
  addToReactedPublications: (
    publicationId: string,
    likes: number,
    dislikedPublication: DisLikeObject[]
  ) => void;
  dislikedPublication: DisLikeObject[];
  addToDislikedPublications: (
    publicationId: string,
    likedPublication: LikeObject[]
  ) => void;
  addToLikedComments: (commentId: string) => void;
}
export interface LikeObject {
  likes: number;
  id: number | string;
}

export interface DisLikeObject {
  id: number | string;
}

export interface OptimisticStore {
  optimitisticComment: OptimitisticComment;
  setOptimitisticComment: (newState: OptimitisticComment) => void;
}

export interface OptimitisticComment {
  commentText: string;
  handle: string;
  username: string;
  isIndexing: boolean;
}

export interface IGuestStore {
  isGuest: boolean;
  profileId: string;
  handleGuest: (isGuest: boolean) => void;
}
