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

function getCollectModule(userSelectedCollectModule: CollectModuleType) {
	if (userSelectedCollectModule.isRevertCollect) {
		return {
			revertCollectModule: true,
		};
	}
	if (userSelectedCollectModule.isFreeTimedCollect) {
		return {
			simpleCollectModule: {
				collectLimit: userSelectedCollectModule.freeCollectLimit,
				followerOnly: userSelectedCollectModule.followerOnlyCollect as boolean,
			},
		};
	}
	return {
		freeCollectModule: {
			followerOnly: userSelectedCollectModule.followerOnlyCollect as boolean,
		},
	};
}
export default getCollectModule;
