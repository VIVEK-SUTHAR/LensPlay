import create from "zustand";
import { PinStore } from "../types/Store";

const usePinStore = create<PinStore>((set) => ({
  publicationId: undefined,
  hasPinned: false,
  setHasPinned: (newValue) =>
    set({
      hasPinned: newValue,
    }),
  setPinnedPubId: (pubId) =>
    set({
      publicationId: pubId,
    }),
}));

export default usePinStore;
