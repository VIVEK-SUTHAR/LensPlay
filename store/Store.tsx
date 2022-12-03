import create from "zustand";

export interface Profile {
  data: Data;
}

export interface Data {
  defaultProfile: DefaultProfile;
}

export interface DefaultProfile {
  id: string;
  name: null;
  bio: null;
  isDefault: boolean;
  attributes: any[];
  followNftAddress: null;
  metadata: null;
  handle: string;
  picture: Picture;
  coverPicture: null;
  ownedBy: string;
  dispatcher: null;
  stats: Stats;
  followModule: null;
}

export interface Picture {
  original: Original;
}

export interface Original {
  url: string;
  mimeType: null;
}

export interface Stats {
  totalFollowers: number;
  totalFollowing: number;
  totalPosts: number;
  totalComments: number;
  totalMirrors: number;
  totalPublications: number;
  totalCollects: number;
}

const useStore = create((set) => ({
  currentProfile: null,
  accessToken: "",
  refreshToken: "",
  profileId: "",
  userFeed: [],
  isOpen: false,
  currentIndex: 0,
  setAccessToken: (value: string) => set({ accessToken: value }),
  setRefreshToken: (value: string) => set({ refreshToken: value }),
  setProfileId: (value: string) => set({ profileId: value }),
  setProfile: (value: Profile) => set({ currentProfile: value }),
  setUserFeed: (value: any) => set({ userFeed: value }),
  setIsOpen: (value: any) => set({ isOpen: value }),
  setCurrentIndex: (value: any) => set({ currentIndex: value }),
}));

export default useStore;
