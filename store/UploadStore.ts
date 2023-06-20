import { IUploadStore } from "customTypes/Store";
import create from "zustand";

export const useUploadStore = create<IUploadStore>((set) => ({
	videoURL: null,
	coverURL: null,
	title: "",
	description: null,
	duration: null,
	collectModule: {
		type: "revertCollectModule",
		followerOnlyCollect: false,
		isPaidCollect: false,
		isTimedCollect: false,
		isLimitedCollect: false,
		limitedCollectCount: "100",
		feeCollectDetails: {
			token: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
			amount: "0.01",
			name: "WMATIC",
		},
		isRevertCollect: true,
		isRefferalEnabled: false,
		referralPercent: "0",
		timeLimit: undefined
	},
	referenceModule: {
		isFollowerOnly: false,
		degreesOfSeparationReferenceModule: null,
	},
	isFollowersOnlyCollect: false,
	uploadingStatus: null,
	uploadProgress: 0,
	setURLs: (videoURL, coverURL) => {
		set({
			videoURL: videoURL,
		});
		set({
			coverURL: coverURL,
		});
	},
	setReferenceModule: (newData) =>
		set({
			referenceModule: newData,
		}),
	setTitle: (title) => set({ title: title }),
	setDescription: (description) => set({ description: description }),
	setCollectModule: (newCollectModule) => set({ collectModule: newCollectModule }),
	setDisableCollect: () =>
		set({
			collectModule: {
				type: "revertCollectModule",
				followerOnlyCollect: false,
				isPaidCollect: false,
				isTimedCollect: false,
				isLimitedCollect: false,
				limitedCollectCount: "100",
				feeCollectDetails: {
					token: "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
					amount: "0.01",
					name: "WMATIC",
				},
				isRevertCollect: true,
				isRefferalEnabled: false,
				referralPercent: "0",
				timeLimit: undefined
			},
		}),
	setIsFollowesOnlyCollect: (newValue) => set({ isFollowersOnlyCollect: newValue }),
	setDuration: (duration) => set({ duration: duration }),
	setUploadingStatus: (status) => set({ uploadingStatus: status }),
	setUploadProgress: (progress) => set({ uploadProgress: progress }),
	setClearStore: () =>
		set({
			videoURL: null,
			coverURL: null,
			title: "",
			description: null,
			uploadingStatus: null,
			uploadProgress: 0,
			collectModule: {
				type: "revertCollectModule",
				followerOnlyCollect: false,
				isFreeCollect: false,
				isRevertCollect: true,
				feeCollectDetails: {
					token: null,
					amount: null,
					name: null,
				},
			},
			referenceModule: {
				isFollowerOnly: false,
				degreesOfSeparationReferenceModule: null,
			},
			isFollowersOnlyCollect: false,
		}),
}));
