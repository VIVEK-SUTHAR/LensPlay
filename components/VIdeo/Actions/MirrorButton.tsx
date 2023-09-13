import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Icon from "components/Icon";
import Button from "components/UI/Button";
import { dark_primary } from "constants/Colors";
import { ToastType } from "customTypes/Store";
import React from "react";
import { useGuestStore } from "store/GuestStore";
import { useReactionStore, useThemeStore, useToast } from "store/Store";

type MirrorButtonProps = {
	mirrorRef: React.RefObject<BottomSheetMethods>;
};

const MirrorButton = ({ mirrorRef }: MirrorButtonProps) => {
	const Toast = useToast();
	const { PRIMARY } = useThemeStore();
	const { isGuest } = useGuestStore();
	const { mirrorStats } = useReactionStore();

	return (
		<Button
			title={mirrorStats.mirrorCount?.toString()}
			onPress={() => {
				if (isGuest) {
					Toast.show("Please Login", ToastType.ERROR, true);
					return;
				}
				mirrorRef?.current?.snapToIndex(0);
			}}
			mx={4}
			px={16}
			width={"auto"}
			bg={dark_primary}
			type={"filled"}
			borderRadius={8}
			textStyle={{
				fontSize: 14,
				fontWeight: "500",
				color: mirrorStats.isMirrored ? PRIMARY : "white",
				marginLeft: 4,
			}}
			icon={<Icon name="mirror" size={20} color={mirrorStats.isMirrored ? PRIMARY : "white"} />}
		/>
	);
};

export default React.memo(MirrorButton);
