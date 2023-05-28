import type { IGuestStore } from "customTypes/Store";
import create from "zustand";

export const useGuestStore = create<IGuestStore>((set) => ({
	isGuest: false,
	profileId: "0x5c59",
	handleGuest: (isGuest: boolean) =>
		set({
			isGuest: isGuest,
		}),
}));
