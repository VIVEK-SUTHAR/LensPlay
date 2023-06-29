import { Profile } from "./../types/Lens/index";
import { useProfile } from "store/Store";
import { useUploadStore } from "store/UploadStore";

export type CollectModuleType = {
	type: string;
	isFreeCollect?: boolean;
	isRevertCollect?: boolean;
	followerOnlyCollect?: boolean;
	isFreeTimedCollect?: boolean;
	freeCollectLimit?: string;
	isPaidCollect?: boolean;
	isTimedCollect?: boolean;
	isLimitedCollect?: boolean;
	isRefferalEnabled?: boolean;
	referralPercent?: string;
	limitedCollectCount?: string;
	feeCollectDetails?: feeCollectDetailsType;
	timeLimit?: Date;
};
type feeCollectDetailsType = {
	token: string | null;
	amount: string | null;
	name: string | null;
};

function getCollectModule(collectModule: CollectModuleType, currentProfile: Profile) {
	let module;
	switch (collectModule.type) {
		case "freeCollectModule":
			module = {
				freeCollectModule: {
					followerOnly: collectModule?.followerOnlyCollect,
				},
			};
			break;
		case "revertCollectModule":
			module = {
				revertCollectModule: true,
			};
			break;
		case "feeCollectModule":
			module = {
				feeCollectModule: {
					amount: {
						currency: collectModule?.feeCollectDetails?.token,
						value: collectModule?.feeCollectDetails?.amount,
					},
					recipient: currentProfile?.ownedBy,
					referralFee: collectModule?.isRefferalEnabled
						? parseFloat(collectModule?.referralPercent!)
						: 0,
					followerOnly: collectModule?.followerOnlyCollect,
				},
			};
			break;
		case "simpleCollectModule":
			if (collectModule?.isPaidCollect) {
				if (collectModule?.isLimitedCollect && collectModule?.isTimedCollect) {
					module = {
						simpleCollectModule: {
							fee: {
								amount: {
									currency: collectModule?.feeCollectDetails?.token,
									value: collectModule?.feeCollectDetails?.amount,
								},
								referralFee: collectModule?.isRefferalEnabled
									? parseFloat(collectModule?.referralPercent!)
									: 0,
								recipient: currentProfile?.ownedBy,
							},
							collectLimit: collectModule?.limitedCollectCount,
							endTimestamp: collectModule?.timeLimit?.toISOString(),
							followerOnly: collectModule?.followerOnlyCollect,
						},
					};
				} else if (collectModule?.isLimitedCollect) {
					module = {
						simpleCollectModule: {
							fee: {
								amount: {
									currency: collectModule?.feeCollectDetails?.token,
									value: collectModule?.feeCollectDetails?.amount,
								},
								referralFee: collectModule?.isRefferalEnabled
									? parseFloat(collectModule?.referralPercent!)
									: 0,
								recipient: currentProfile?.ownedBy,
							},
							collectLimit: collectModule?.limitedCollectCount,
							followerOnly: collectModule?.followerOnlyCollect,
						},
					};
				} else {
					module = {
						simpleCollectModule: {
							fee: {
								amount: {
									currency: collectModule?.feeCollectDetails?.token,
									value: collectModule?.feeCollectDetails?.amount,
								},
								referralFee: collectModule?.isRefferalEnabled
									? parseFloat(collectModule?.referralPercent!)
									: 0,
								recipient: currentProfile?.ownedBy,
							},
							endTimestamp: collectModule?.timeLimit?.toISOString(),
							followerOnly: collectModule?.followerOnlyCollect,
						},
					};
				}
			} else {
				if (collectModule?.isLimitedCollect && collectModule?.isTimedCollect) {
					module = {
						simpleCollectModule: {
							collectLimit: collectModule?.limitedCollectCount,
							followerOnly: collectModule?.followerOnlyCollect,
							endTimestamp: collectModule?.timeLimit?.toISOString(),
						},
					};
				} else if (collectModule?.isLimitedCollect) {
					module = {
						simpleCollectModule: {
							collectLimit: collectModule?.limitedCollectCount,
							followerOnly: collectModule?.followerOnlyCollect,
						},
					};
				} else {
					module = {
						simpleCollectModule: {
							followerOnly: collectModule?.followerOnlyCollect,
							endTimestamp: collectModule?.timeLimit?.toISOString(),
						},
					};
				}
			}
			break;
	}
	return module;
}
export default getCollectModule;
