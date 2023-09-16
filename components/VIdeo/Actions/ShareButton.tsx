import ShareIcon from "assets/Icons/ShareIcon";
import Button from "components/UI/Button";
import { dark_primary } from "constants/Colors";
import { PUBLICATION } from "constants/tracking";
import React from "react";
import { Share } from "react-native";
import { useActivePublication } from "store/Store";
import TrackAction from "utils/Track";
import Logger from "utils/logger";

const ShareButton = () => {
	const { activePublication } = useActivePublication();
	const title = activePublication?.profile?.name || activePublication?.profile.handle;

	const shareVideo = React.useCallback(async () => {
		try {
			await Share.share({
				message: `Let's watch ${title} on LensPlay,here's link, https://lensplay.xyz/watch/${activePublication?.id}
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
			icon={<ShareIcon height={20} width={20} />}
			onPress={shareVideo}
			textStyle={{ color: "white", marginHorizontal: 4 }}
		/>
	);
};

export default React.memo(ShareButton);
