import create from "zustand";
import { ILiveStreamStore } from "customTypes/Store";

const useLiveStreamStore = create<ILiveStreamStore>((set) => ({
	streamTitle: "",
	recordStream: false,
	streamQuality: "Medium",
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
