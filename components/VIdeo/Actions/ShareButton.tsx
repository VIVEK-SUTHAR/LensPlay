import Icon from "components/Icon";
import Button from "components/UI/Button";
import { dark_primary } from "constants/Colors";
import { PUBLICATION } from "constants/tracking";
import { type HandleInfo } from "customTypes/generated";
import React from "react";
import { Share } from "react-native";
import { useActivePublication } from "store/Store";
import TrackAction from "utils/Track";
import formatHandle from "utils/formatHandle";
import Logger from "utils/logger";

const ShareButton = () => {
	const { activePublication } = useActivePublication();

	const shareVideo = React.useCallback(async () => {
		try {
			await Share.share({
				message: `Let's watch ${
					activePublication?.by?.metadata?.displayName ||
					formatHandle(activePublication?.by?.handle as HandleInfo)
				} on LensPlay,here's link, https://lensplay.xyz/watch/${activePublication?.id}
        `,
			});
			void TrackAction(PUBLICATION.SHARE);
		} catch (error) {
			Logger.Error("error while sharing video", error);
		}
	}, []);

	return (
		<Button
			title={"Share"}
			mx={4}
			px={10}
			width={"auto"}
			bg={dark_primary}
			type={"filled"}
			borderRadius={8}
			icon={<Icon name="share" size={20} />}
			onPress={shareVideo}
			textStyle={{ color: "white", marginHorizontal: 4 }}
		/>
	);
};

export default React.memo(ShareButton);
