import create from "zustand";
import { IUploadStore } from "../types/Store";

export const useUploadStore = create<IUploadStore>((set) => ({
  videoURL: null,
  coverURL: null,
  title: "",
  description: null,
  collectModule: {
    type: "revertCollectModule",
    followerOnlyCollect: false,
    isFreeCollect: false,
    isRevertCollect: true,
  },
  referenceModule: {
    isFollowerOnly: false,
    degreesOfSeparationReferenceModule: null,
  },
  isFollowersOnlyCollect: false,
  setURLs: (videoURL, coverURL) => {
    set({
      videoURL: videoURL,
    });
    set({
      coverURL: coverURL,
    });
  },
  setReferenceModule: (newData) =>
    set({
      referenceModule: newData,
    }),
  setTitle: (title) => set({ title: title }),
  setDescription: (description) => set({ description: description }),
  setCollectModule: (newCollectModule) =>
    set({ collectModule: newCollectModule }),
  setIsFollowesOnlyCollect: (newValue) =>
    set({ isFollowersOnlyCollect: newValue }),
}));
