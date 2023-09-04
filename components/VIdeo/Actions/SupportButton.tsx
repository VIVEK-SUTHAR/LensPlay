import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Support from "assets/Icons/Support";
import Icon from "components/Icon";
import Button from "components/UI/Button";
import { dark_primary, white } from "constants/Colors";
import { PUBLICATION } from "constants/tracking";
import React from "react";
import { Share } from "react-native";
import TrackAction from "utils/Track";

type ShareButtonProps = {
	supportSheetRef: React.RefObject<BottomSheetMethods>;
};

const SupportButton = ({ supportSheetRef }: ShareButtonProps) => {
	return (
		<Button
			title={"Support"}
			mx={4}
			px={10}
			width={"auto"}
			bg={dark_primary}
			type={"filled"}
			borderRadius={8}
			icon={<Support height={18} width={18} fill={white[800]} />}
			onPress={async () => {
				supportSheetRef.current?.snapToIndex(0);
			}}
			textStyle={{ color: "white" }}
		/>
	);
};

export default SupportButton;
