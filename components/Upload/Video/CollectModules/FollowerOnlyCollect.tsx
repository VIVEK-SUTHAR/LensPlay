import React from "react";
import { useUploadStore } from "store/UploadStore";
import { CollectToggle } from "../CollectModule";

const FollowerOnlyCollect = () => {
	const { collectModule, setCollectModule } = useUploadStore();

	return (
		<CollectToggle
			title={"Followers only"}
			subTitle={"By enabling this, Only your followers will be able to collect this video"}
			switchValue={collectModule.followerOnlyCollect!}
			onPress={() => {
				if (!collectModule.followerOnlyCollect) {
					setCollectModule({
						...collectModule,
						followerOnlyCollect: true,
					});
				} else {
					setCollectModule({
						...collectModule,
						followerOnlyCollect: false,
					});
				}
			}}
		/>
	);
};

export default React.memo(FollowerOnlyCollect);
