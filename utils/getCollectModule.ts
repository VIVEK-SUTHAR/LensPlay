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
};
type feeCollectDetailsType = {
	token: string | null;
	amount: string | null;
	name: string | null;
};

function getCollectModule() {
	const { collectModule } = useUploadStore();
	const { currentProfile } = useProfile();
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
					referralFee: collectModule?.isRefferalEnabled ? collectModule?.referralPercent : 0,
					followerOnly: collectModule?.followerOnlyCollect,
				},
			};
			break;
		case "limitedTimedFeeCollectModule":
			module = {
				limitedTimedFeeCollectModule: {
					collectLimit: collectModule?.limitedCollectCount,
					amount: {
						currency: collectModule?.feeCollectDetails?.token,
						value: collectModule?.feeCollectDetails?.amount,
					},
					recipient: currentProfile?.ownedBy,
					referralFee: collectModule?.isRefferalEnabled ? collectModule?.referralPercent : 0,
					followerOnly: collectModule?.followerOnlyCollect,
				},
			};
			break;
		case "limitedFeeCollectModule":
			module = {
				limitedFeeCollectModule: {
					collectLimit: collectModule?.limitedCollectCount,
					amount: {
						currency: collectModule?.feeCollectDetails?.token,
						value: collectModule?.feeCollectDetails?.amount,
					},
					recipient: currentProfile?.ownedBy,
					referralFee: collectModule?.isRefferalEnabled ? collectModule?.referralPercent : 0,
					followerOnly: collectModule?.followerOnlyCollect,
				},
			};
			break;
		case "timedFeeCollectModule":
			module = {
				timedFeeCollectModule: {
					amount: {
						currency: collectModule?.feeCollectDetails?.token,
						value: collectModule?.feeCollectDetails?.amount,
					},
					recipient: currentProfile?.ownedBy,
					referralFee: collectModule?.isRefferalEnabled ? collectModule?.referralPercent : 0,
					followerOnly: collectModule?.followerOnlyCollect,
				},
			};
			break;
	}
	return module;
}
export default getCollectModule;
