import type { Mirror, Post } from "customTypes/generated";
import create from "zustand";

export type WatchLater = Post | Mirror;
interface WatchLaterStore {
	allWatchLaters: WatchLater[];
	setAllWatchLaters: (watchLaters: WatchLater[]) => void;
}

const useWatchLater = create<WatchLaterStore>((set) => ({
	allWatchLaters: [],
	setAllWatchLaters: (newWatchLaters) =>
		set({
			allWatchLaters: newWatchLaters,
		}),
}));
export default useWatchLater;
