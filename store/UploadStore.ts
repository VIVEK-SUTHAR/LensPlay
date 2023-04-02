import create from "zustand";
import { CollectModules, ReferenceModules } from "../types/generated";
import { IUploadStore } from "../types/Store";

export const UploadStore = create<IUploadStore>((set) => ({
  videoURL: null,
  coverURL: null,
  title: null,
  description: null,
  collectModule: CollectModules.RevertCollectModule,
  referenceModule: ReferenceModules.FollowerOnlyReferenceModule,
  isFollowersOnlyCollect: false,
  setURLs: (videoURL, coverURL) => {
    set({
      videoURL: videoURL,
    });
    set({
      coverURL: coverURL,
    });
  },
  setTitle: (title) => set({ title: title }),
  setDescription: (description) => set({ description: description }),
  setCollectModule: (newCollectModule) =>
    set({ collectModule: newCollectModule }),
  setIsFollowesOnlyCollect: (newValue: boolean) =>
    set({ isFollowersOnlyCollect: newValue }),
}));
