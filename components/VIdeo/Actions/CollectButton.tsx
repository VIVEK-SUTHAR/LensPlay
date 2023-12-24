import type { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Icon from "components/Icon";
import Button from "components/UI/Button";
import { ToastType } from "customTypes/Store";
import React, { useCallback, useState } from "react";
import { useGuestStore } from "store/GuestStore";
import { useActivePublication, useReactionStore, useThemeStore, useToast } from "store/Store";

type CollectVideoPrpos = {
	collectRef: React.RefObject<BottomSheetMethods>;
};

const CollectButton = ({ collectRef }: CollectVideoPrpos) => {
	const { PRIMARY } = useThemeStore();
	const toast = useToast();
	const { DARK_PRIMARY } = useThemeStore();
	const { isGuest } = useGuestStore();
	const { collectStats } = useReactionStore();

	const onPress = useCallback(() => {
		collectRef.current?.snapToIndex(0);
	}, []);

	const activePublication = useActivePublication();
	const isPaidCollet =
		activePublication?.activePublication?.collectModule?.__typename === "FeeCollectModuleSettings";

	const isRevertCollect =
		activePublication?.activePublication?.collectModule.__typename ===
		"RevertCollectModuleSettings";

	const isLimitedCollect =
		activePublication?.activePublication?.collectModule.__typename ===
		"LimitedFeeCollectModuleSettings";

	return (
		<>
			<Button
				title={`${collectStats.collectCount || 0} Collects`}
				mx={4}
				px={8}
				width={"auto"}
				bg={DARK_PRIMARY}
				type={"filled"}
				borderRadius={8}
				onPress={() => {
					if (isGuest) {
						toast.show("Please Login", ToastType.ERROR, true);
						return;
					}
					if (isRevertCollect) {
						toast.error("This video can't be collected");
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
					onPress();
				}}
				icon={
					<Icon name="collect" size={20} color={collectStats.isCollected ? PRIMARY : "white"} />
				}
				textStyle={{
					color: collectStats.isCollected ? PRIMARY : "white",
					marginHorizontal: 4,
				}}
			/>
		</>
	);
};

export default CollectButton;
