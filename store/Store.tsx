import create from "zustand";
import { Mirror, Post } from "../types/generated";
import {
  DisLikeObject,
  IActivePublication,
  IAuthStore,
  IReactionStore,
  IThemeStore,
  LikeObject,
  OptimisticStore,
  OptimitisticComment,
  ToastProps,
  ToastType,
  UserStore,
} from "../types/Store";

export const useAuthStore = create<IAuthStore>((set) => ({
  accessToken: "",
  setAccessToken: (newAccessToken: string) =>
    set({ accessToken: newAccessToken }),
  refreshToken: "",
  setRefreshToken: (newRefreshToken: string) =>
    set({ refreshToken: newRefreshToken }),
  hasAccess: false,
  handleAccess: (value: boolean) => set({ hasAccess: value }),
  viaDeskTop: false,
  setIsViaDeskTop: (newstate: boolean) => set({ viaDeskTop: newstate }),
}));

export const useProfile = create<UserStore>((set) => ({
  currentProfile: undefined,
  hasHandle: null,
  setCurrentProfile: (newProfile) => set({ currentProfile: newProfile }),
  setHasHandle: (hasHandle) => set({ hasHandle: hasHandle }),
}));

export const useThemeStore = create<IThemeStore>((set) => ({
  PRIMARY: "#2AD95C",
  DARK_PRIMARY: "#1A1A1A",
  setPrimaryColor: (newPrimaryColor: string) =>
    set({ PRIMARY: newPrimaryColor }),
}));

export const useToast = create<ToastProps>((set) => ({
  isVisible: false,
  message: "",
  timeOut: 3000,
  show: (message: string, type: ToastType, isVisible: boolean) =>
    set({ isVisible: isVisible, message: message, type: type }),
}));

export const useReactionStore = create<IReactionStore>((set) => ({
  reaction: false,
  comment: false,
  videopageStats: {
    isLiked: false,
    isDisliked: false,
    likeCount: 0,
  },
  likedComments: [{ id: 0 }],
  setReaction: (reaction) => {
    set({
      reaction: reaction,
    });
  },
  setComments: (comment) => {
    set({
      comment: comment,
    });
  },
  setVideoPageStats: (isLiked, isDisliked, likeCount) => {
    set({
      videopageStats: {
        isLiked: isLiked,
        isDisliked: isDisliked,
        likeCount: likeCount,
      },
    });
  },
  clearStats: () => {
    set({
      videopageStats: {
        isLiked: false,
        isDisliked: false,
        likeCount: 0,
      },
    });
  },
  addToLikedComments: (commentId: string) => {
    set((state) => ({
      likedComments: [
        ...state.likedComments,
        ({ id: commentId } as unknown) as DisLikeObject,
      ],
    }));
  },
}));

export const useOptimisticStore = create<OptimisticStore>((set) => ({
  optimitisticComment: {
    commentText: "",
    handle: "",
    isIndexing: false,
    username: "",
  },
  setOptimitisticComment: (newState: OptimitisticComment) => {
    set({
      optimitisticComment: {
        commentText: newState.commentText,
        handle: newState.handle,
        isIndexing: newState.isIndexing,
        username: newState.username,
      },
    });
  },
}));

export const useActivePublication = create<IActivePublication>((set) => ({
  activePublication: null,
  setActivePublication: (newPublication: Post | Mirror) => {
    set({
      activePublication: newPublication,
    });
  },
}));

const useStore = create((set) => ({}));

export default useStore;
