import create from "zustand";
import { ILiveStreamStore } from "customTypes/Store";

const useLiveStreamStore = create<ILiveStreamStore>((set) => ({
	streamTitle: "",
	recordStream: false,
	streamQuality: "Medium",
	isMute: false,
	isFrontCamera: false,
	streamKey: null,
	setStreamTitle: (streamTitle) =>
		set({
			streamTitle: streamTitle,
		}),
	setRecordStream: (recordStream) =>
		set({
			recordStream: recordStream,
		}),
	setStreamQuality: (streamQuality) =>
		set({
			streamQuality: streamQuality,
		}),
	setIsMute: (isMute) =>
		set({
			isMute: isMute,
		}),
	setIsFrontCamera: (isFrontCamera) =>
		set({
			isFrontCamera: isFrontCamera,
		}),
	setStreamKey: (streamKey) =>
		set({
			streamKey: streamKey,
		}),
}));

export default useLiveStreamStore;
