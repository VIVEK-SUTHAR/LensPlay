export interface CollectModuleType {
	type: string;
	isFreeCollect?: boolean;
	isRevertCollect?: boolean;
	followerOnlyCollect?: boolean;
}

function getCollectModule(userSelectedCollectModule: CollectModuleType): any {
	if (userSelectedCollectModule.isRevertCollect === true) {
		return {
			revertCollectModule: true,
		};
	}
	return {
		freeCollectModule: {
			followerOnly: userSelectedCollectModule.followerOnlyCollect as boolean,
		},
	};
}

export default getCollectModule;
