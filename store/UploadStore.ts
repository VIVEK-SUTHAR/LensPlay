import create from "zustand";
import { IUploadStore } from "../types/Store";

export const UploadStore = create<IUploadStore>((set) => ({
  videoURL: null,
  coverURL: null,
  setURLs: (videoURL, coverURL) => {
    set({
      videoURL: videoURL,
    });
    set({
      coverURL: coverURL,
    });
  },
}));
