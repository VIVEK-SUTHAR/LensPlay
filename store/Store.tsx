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
  profileId: "",
  setProfileId: (value: string) => set({ profileId: value }),
  setProfile: (value: Profile) => set({ currentProfile: value }),
  userFeed: [],
  setUserFeed: (value: any) => set({ userFeed: value }),
  isOpen: false,
  setIsOpen: (value: any) => set({ isOpen: value })
}));

export default useStore;
