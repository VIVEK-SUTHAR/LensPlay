import type { PinStore } from "customTypes/Store";
import { create } from "zustand";

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
