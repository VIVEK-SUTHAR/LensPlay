import create from "zustand";
interface VideoURL {
	uri: string;
	setVideoURI: (url: string) => void;
}

const useVideoURLStore = create<VideoURL>((set) => ({
	uri: "",
	setVideoURI: (newurl) => {
		set({
			uri: newurl,
		});
	},
}));
export default useVideoURLStore;
