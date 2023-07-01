import type { Mirror, Post } from "customTypes/generated";
import create from "zustand";

interface WatchLaterStore {
	isInWatchLater: boolean;
	cover: null | string;
	color: null | string;
	setIsInWatchLater: (isInWatchLater: boolean) => void;
	setCover: (cover: string) => void;
	setColor: (color: string) => void;
}

const useWatchLater = create<WatchLaterStore>((set) => ({
	isInWatchLater: false,
	color: null,
	cover: null,
	setIsInWatchLater: (isInWatchLater) => {
		set({
			isInWatchLater: isInWatchLater
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
