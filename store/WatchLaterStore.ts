import type { Mirror, Post } from "customTypes/generated";
import create from "zustand";

interface WatchLaterStore {
	allWatchLaters: string[];
	cover: null | string;
	color: null | string;
	setAllWatchLaters: (watchLaters: string[]) => void;
	setCover: (cover: string) => void;
	setColor: (color: string) => void;
}

const useWatchLater = create<WatchLaterStore>((set) => ({
	allWatchLaters: [],
	color: null,
	cover: null,
	setAllWatchLaters: (newWatchLaters) => {
		set((state) => {
			if (state.allWatchLaters === null) {
				return {
					allWatchLaters: newWatchLaters,
				};
			} else {
				return {
					allWatchLaters: newWatchLaters,
				};
			}
		});
	},
	setCover: (cover) =>
		set({
			cover: cover,
		}),
	setColor: (color) =>
		set({
			color: color,
		}),
}));

export default useWatchLater;
