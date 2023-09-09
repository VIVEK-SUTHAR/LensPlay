import { ISupportStore } from "customTypes/Store";
import create from "zustand";

export const useSupportStore = create<ISupportStore>((set) => ({
	totalDonation: 0,
	totalTip: 0,
	tips: null,
	donorProfiles: undefined,
	setTotalDonation: (donation) => {
		set({
			totalDonation: donation,
		});
	},
	setTotalTip: (tip) => {
		set({
			totalTip: tip,
		});
	},
	setTips: (tips) => {
		set({
			tips: tips,
		});
	},
	setDonorProfiles: (donor) => {
		set({
			donorProfiles: donor,
		});
	},
}));
