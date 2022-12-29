import create from "zustand";

export interface IAuthStore {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (newToken: string) => void;
  setRefreshToken: (newToken: string) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  accessToken: "",
  setAccessToken: (newAccessToken: string) =>
    set({ accessToken: newAccessToken }),
  refreshToken: "",
  setRefreshToken: (newRefreshToken: string) =>
    set({ accessToken: newRefreshToken }),
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
  setProfiledata: (value: any) => set({ profileData: value }),
  setAccessToken: (value: string) => set({ accessToken: value }),
  setRefreshToken: (value: string) => set({ refreshToken: value }),
  setProfileId: (value: string) => set({ profileId: value }),
  setProfile: (value: any) => set({ currentProfile: value }),
  setUserFeed: (value: any) => set({ userFeed: value }),
  setIsOpen: (value: any) => set({ isOpen: value }),
  setCurrentIndex: (value: any) => set({ currentIndex: value }),
}));

export default useStore;
