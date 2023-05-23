import { CollectModuleType } from "../../utils/getCollectModule";
import { FeedItemRoot, Maybe, Mirror, Post, Profile } from "../generated";

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
  activePublication: Post | Mirror | FeedItemRoot | null;
  setActivePublication: (newPublication: Post | Mirror | FeedItemRoot) => void;
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
  success: (message: string) => void;
  error: (errormessage: string) => void;
  info: (message: string) => void;
}
export enum ToastType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  INFO = "INFO",
}
export interface IReactionStore {
  reaction: boolean;
  comment: boolean;
  videopageStats: videoPageStatsObject;
  collectStats: collectStatsObject;
  mirrorStats: mirrorStatsObject;
  setReaction: (reaction: boolean) => void;
  setComments: (comment: boolean) => void;
  setVideoPageStats: (
    isLiked: boolean,
    isDisliked: boolean,
    likeCount: number
  ) => void;
  setCollectStats: (isCollected: boolean, collectCount: number) => void;
  setMirrorStats: (isMirrored: boolean, mirrorCount: number) => void;
  clearStats: () => void;
  likedComments: DisLikeObject[];
  addToLikedComments: (commentId: string) => void;
}

export interface videoPageStatsObject {
  isLiked: boolean;
  isDisliked: boolean;
  likeCount: number;
}

export interface collectStatsObject {
  isCollected: boolean;
  collectCount: number;
}

export interface mirrorStatsObject {
  isMirrored: boolean;
  mirrorCount: number;
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
  username: Maybe<string> | undefined;
  isIndexing: boolean;
}

export interface IGuestStore {
  isGuest: boolean;
  profileId: string;
  handleGuest: (isGuest: boolean) => void;
}

export enum GetInviteResponse {
  ZERO_INVITES = "ZERO INVITES",
  ERROR = "ERROR",
}

export type GetInviteCodeAPIResponse = {
  profileId: string;
  inviteCode: string;
  isValid: boolean;
  id: string;
};

export interface InviteStore {
  invites: GetInviteCodeAPIResponse[] | [];
  handleInvites: (invites: GetInviteCodeAPIResponse[]) => void;
  inviteError: GetInviteResponse | "";
  handleError: (error: GetInviteResponse) => void;
  clearInvites: () => void;
}
export interface BgColorStore {
  isAvatar: "AVATAR" | "COVER";
  avatar: string | null;
  cover: string | null;
  setAvatarColors: (avatarColor: string | null) => void;
  setCoverColors: (CoverColor: string | null) => void;
  handleIsAvatar: (isAvatar: "AVATAR" | "COVER") => void;
}

export type ReferenceModuleType = {
  isFollowerOnly: boolean;
  degreesOfSeparationReferenceModule: {
    isEnabled: boolean;
    seperationLevel: number;
  } | null;
};

export type PinStore = {
  hasPinned: boolean;
  publicationId: string | undefined;
  setHasPinned: (newValue: boolean) => void;
  setPinnedPubId: (pubId: string) => void;
};

export interface IUploadStore {
  videoURL: string | null;
  coverURL: string | null;
  title: string;
  description: string | null;
  duration: number | null | undefined;
  isFollowersOnlyCollect: boolean;
  referenceModule: ReferenceModuleType | null;
  collectModule: CollectModuleType;
  uploadingStatus: null | "UPLOADING" | "PROCCESSING";
  uploadProgress: number;
  setDuration: (videoDuration: number) => void;
  setReferenceModule: (userReferenceModule: ReferenceModuleType | null) => void;
  setURLs: (videoURL: string, coverURL: string) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setCollectModule: (newCollectModule: CollectModuleType) => void;
  setIsFollowesOnlyCollect: (newValue: boolean) => void;
  setUploadingStatus: (status: null | "UPLOADING" | "PROCCESSING") => void;
  setUploadProgress: (progress: number) => void;
  setClearStore: () => void;
}
