import React from "react";
import { Share } from "react-native";
import { dark_primary } from "../../../constants/Colors";
import { PUBLICATION } from "../../../constants/tracking";
import TrackAction from "../../../utils/Track";
import Icon from "../../Icon";
import Button from "../../UI/Button";

type ShareButtonProps = {
  title: string;
  publicationId: string;
};

const ShareButton = ({ title, publicationId }: ShareButtonProps) => {
  const shareVideo = React.useCallback(async () => {
    try {
      const result = await Share.share({
        message: `Let's watch ${title} on LensPlay,here's link, https://lensplay.xyz/watch/${publicationId}
        `,
      });
      TrackAction(PUBLICATION.SHARE);
    } catch (error) {}
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

export default ShareButton;
