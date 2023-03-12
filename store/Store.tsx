import create from "zustand";
import {
  DisLikeObject,
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
    set({ accessToken: newRefreshToken }),
  hasAccess: false,
  handleAccess: (value: boolean) => set({ hasAccess: value }),
  viaDeskTop: false,
  setIsViaDeskTop: (newstate: boolean) => set({ viaDeskTop: newstate }),
}));

export const useProfile = create<UserStore>((set) => ({
  currentProfile: null,
  userAddress: null,
  setCurrentProfile: (newProfile) => set({ currentProfile: newProfile }),
  setUserAddress: (address) => set({ userAddress: address }),
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
  likedPublication: [{ likes: 0, id: 0 }],
  dislikedPublication: [{ id: 0 }],
  likedComments: [{ id: 0 }],
  addToReactedPublications: (
    publicationId: string,
    likes: number,
    dislikedPublication: DisLikeObject[]
  ) => {
    for (var i = 0; i < dislikedPublication.length; i++) {
      if (dislikedPublication[i].id === publicationId) {
        dislikedPublication.splice(i, 1);
      }
    }
    set((state) => ({
      likedPublication: [
        ...state.likedPublication,
        ({ likes: likes, id: publicationId } as unknown) as LikeObject,
      ],
      dislikedPublication: dislikedPublication,
    }));
  },
  addToDislikedPublications: (
    publicationId: string,
    likedPublication: LikeObject[]
  ) => {
    for (var i = 0; i < likedPublication.length; i++) {
      if (likedPublication[i].id === publicationId) {
        likedPublication.splice(i, 1);
      }
    }
    set((state) => ({
      dislikedPublication: [
        ...state.dislikedPublication,
        { id: publicationId } as DisLikeObject,
      ],
    }));
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

export const useActivePublication = create((set) => ({
  activePublication: null,
  setActivePublication: (newPublication) => {
    set({
      activePublication: newPublication,
    });
  },
}));

const useStore = create((set) => ({}));

export default useStore;
