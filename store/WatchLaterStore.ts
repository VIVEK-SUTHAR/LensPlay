import type { Mirror, Post } from "customTypes/generated";
import create from "zustand";

export type WatchLater = Post | Mirror;
interface WatchLaterStore {
	allWatchLaters: WatchLater[];
	cover: null | string;
	color: null | string;
	setAllWatchLaters: (watchLaters: WatchLater[]) => void;
	addOneWatchLater: (watchLater: WatchLater) => void;
	setCover: (cover: string) => void;
	setColor: (color: string) => void;
}

const useWatchLater = create<WatchLaterStore>((set) => ({
	allWatchLaters: [],
	color: null,
	cover: null,
	setAllWatchLaters: (newWatchLaters) =>
		set({
			allWatchLaters: newWatchLaters,
		}),
	addOneWatchLater: (publication) =>
		set((state) => ({
			allWatchLaters: [...state.allWatchLaters, publication],
		})),
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
