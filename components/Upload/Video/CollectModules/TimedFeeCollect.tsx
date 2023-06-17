import React from "react";
import { useUploadStore } from "store/UploadStore";
import { CollectToggle } from "../CollectModule";

const TimedFeeCollect = () => {
	const { collectModule, setCollectModule } = useUploadStore();

	return (
		<CollectToggle
			title={"Limited for 24 hours"}
			subTitle={"By enabling this, You will limit collects for first 24h only"}
			switchValue={collectModule.isTimedCollect!}
			onPress={() => {
				if (!collectModule.isTimedCollect && collectModule.isLimitedCollect) {
					setCollectModule({
						...collectModule,
						type: "limitedTimedFeeCollectModule",
						isTimedCollect: true,
					});
				} else if (!collectModule.isTimedCollect && !collectModule.isLimitedCollect) {
					setCollectModule({
						...collectModule,
						type: "timedFeeCollectModule",
						isTimedCollect: true,
					});
				} else if (collectModule.isTimedCollect && collectModule.isLimitedCollect) {
					setCollectModule({
						...collectModule,
						type: "limitedFeeCollectModule",
						isTimedCollect: false,
					});
				} else {
					setCollectModule({
						...collectModule,
						type: "feeCollectModule",
						isTimedCollect: false,
					});
				}
			}}
		/>
	);
};

export default React.memo(TimedFeeCollect);
