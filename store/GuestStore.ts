import create from "zustand";
import { IGuestStore } from "../types/Store";

export const useGuestStore = create<IGuestStore>((set) => ({
  isGuest: false,
  profileId: "0x5c59",
  handleGuest: (isGuest: boolean) =>
    set({
      isGuest: isGuest,
    }),
}));
