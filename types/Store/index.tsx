import { Mirror, Post, Profile } from "../generated";

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

export interface IActivePublication {
  activePublication: Post | Mirror | null;
  setActivePublication: (newPublication: Post | Mirror) => void;
}

export interface UserStore {
  currentProfile: Profile | undefined;
  hasHandle: boolean | null;
  setCurrentProfile: (currentProfile: Profile | undefined) => void;
  setHasHandle: (hasHandle: boolean) => void;
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
  reaction: boolean;
  comment: boolean;
  collect: boolean;
  videopageStats: videoPageStatsObject;
  setReaction: (reaction: boolean) => void;
  setComments: (comment: boolean) => void;
  setCollect: (collect: boolean) => void;
  setVideoPageStats: (
    isLiked: boolean,
    isDisliked: boolean,
    likeCount: number
  ) => void;
  clearStats: () => void;
  likedComments: DisLikeObject[];
  addToLikedComments: (commentId: string) => void;
}

export interface videoPageStatsObject {
  isLiked: boolean;
  isDisliked: boolean;
  likeCount: number;
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
