import { CollectModule } from "customTypes/generated";

export default function getPublicationCollectModule(collectModule: CollectModule | undefined) {
	if (typeof collectModule === "undefined") {
		return;
	}

	if (collectModule?.__typename === "RevertCollectModuleSettings") {
		return {
			data: {
				text: "Video cannot be collected",
			},
		};
	}

	if (collectModule?.__typename === "FreeCollectModuleSettings") {
		return {
			text: "Free to collect",
			isFollowerOnly: collectModule?.followerOnly,
			contractAddress: collectModule?.contractAddress,
		};
	}
	if (collectModule?.__typename === "FeeCollectModuleSettings") {
		return {
			data: {
				text: "Paid Collect",
				amount: collectModule?.amount?.value,
				token: collectModule?.amount?.asset,
				isFollowerOnly: collectModule?.followerOnly,
				contractAddress: collectModule?.contractAddress,
			},
		};
	}
	if (collectModule?.__typename === "SimpleCollectModuleSettings") {
		return {
			data: {
				text: "Exclusive Collect",
				amount: collectModule?.fee?.amount?.value,
				token: collectModule?.fee?.amount?.asset,
				isFollowerOnly: collectModule?.followerOnly,
				limit: collectModule?.collectLimit,
				endTime: collectModule?.endTimestamp,
				contractAddress: collectModule?.contractAddress,
			},
		};
	}
	if (collectModule?.__typename === "MultirecipientFeeCollectModuleSettings") {
		return {
			data: {
				text: `Splits between ${collectModule?.recipients?.length}`,
				amount: collectModule?.amount?.value,
				token: collectModule?.amount?.asset,
				isFollowerOnly: collectModule?.followerOnly,
				endTime: collectModule?.endTimestamp,
				receipets: collectModule?.recipients,
				referalFee: collectModule?.referralFee,
				contractAddress: collectModule?.contractAddress,
			},
		};
	}
}
