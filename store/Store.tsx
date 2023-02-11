import create from "zustand";
import {
  DisLikeObject,
  IAuthStore,
  IReactionStore,
  IThemeStore,
  LikeObject,
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
}));

export const useProfile = create<UserStore>((set) => ({
  currentProfile: null,
  setCurrentProfile: (newProfile) => set({ currentProfile: newProfile }),
}));

export const useThemeStore = create<IThemeStore>((set) => ({
  PRIMARY: "#2AD95C",
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

const useStore = create((set) => ({
  currentProfile: null,
  accessToken: "",
  refreshToken: "",
  profileId: "",
  userFeed: [],
  isOpen: false,
  currentIndex: 0,
  profileData: null,
  hasAccess: false,

  setProfiledata: (value: any) => set({ profileData: value }),
  setAccessToken: (value: string) => set({ accessToken: value }),
  setRefreshToken: (value: string) => set({ refreshToken: value }),
  setProfileId: (value: string) => set({ profileId: value }),
  setProfile: (value: any) => set({ currentProfile: value }),
  setUserFeed: (value: any) => set({ userFeed: value }),
  setIsOpen: (value: any) => set({ isOpen: value }),
  setCurrentIndex: (value: any) => set({ currentIndex: value }),
  handleAccess: (value: boolean) => set({ hasAccess: value }),
}));

export default useStore;
