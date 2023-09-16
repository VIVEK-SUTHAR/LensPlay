import type { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Collect from "assets/Icons/Collect";
import Button from "components/UI/Button";
import { ToastType } from "customTypes/Store";
import React, { useCallback } from "react";
import { useGuestStore } from "store/GuestStore";
import { useCollectStore } from "store/ReactionStore";
import { useActivePublication, useThemeStore, useToast } from "store/Store";

type CollectVideoPrpos = {
	collectRef: React.RefObject<BottomSheetMethods>;
};

const CollectButton = ({ collectRef }: CollectVideoPrpos) => {
	const { PRIMARY } = useThemeStore();
	const toast = useToast();
	const { DARK_PRIMARY } = useThemeStore();
	const { isGuest } = useGuestStore();
	const { activePublication } = useActivePublication();
	const { setCollectCount, setIsCollected, isCollected, collectCount } = useCollectStore();

	const isPaidCollet = activePublication?.collectModule?.__typename === "FeeCollectModuleSettings";

	const isRevertCollect =
		activePublication?.collectModule.__typename === "RevertCollectModuleSettings";

	const isLimitedCollect =
		activePublication?.collectModule.__typename === "LimitedFeeCollectModuleSettings";

	React.useEffect(() => {
		setIsCollected(activePublication?.hasCollectedByMe!);
		setCollectCount(activePublication?.stats?.totalAmountOfCollects!);
	}, []);

	const handleCollect = useCallback(() => {
		if (isGuest) {
			toast.show("Please Login", ToastType.ERROR, true);
			return;
		}
		if (isRevertCollect) {
			toast.error("This video is not collectible");
			return;
		}
		if (isPaidCollet) {
			toast.error("Paid collects are coming soon!");
			return;
		}
		if (isLimitedCollect) {
			toast.error("Collects are Limited");
			return;
		}
		collectRef.current?.snapToIndex(0);
	}, []);

	return (
		<Button
			title={`${collectCount} Collects`}
			mx={4}
			px={8}
			width={"auto"}
			bg={DARK_PRIMARY}
			type={"filled"}
			borderRadius={8}
			onPress={handleCollect}
			icon={<Collect height={20} width={20} color={isCollected ? PRIMARY : "white"} />}
			textStyle={{
				color: isCollected ? PRIMARY : "white",
				marginHorizontal: 4,
			}}
		/>
	);
};

export default CollectButton;
