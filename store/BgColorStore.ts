import create from "zustand";
import { BgColorStore } from "../types/Store";

export const useBgColorStore = create<BgColorStore>((set) => ({
  isAvatar: "AVATAR",
  avatar: null,
  cover: null,
  setAvatarColors: (avatarColor: string | null) =>
    set({
      avatar: avatarColor,
    }),
  setCoverColors: (coverColor: string | null) =>
    set({
      cover: coverColor,
    }),
  handleIsAvatar: (isAvatar: "AVATAR" | "COVER") =>
    set({
      isAvatar: isAvatar,
    }),
}));
