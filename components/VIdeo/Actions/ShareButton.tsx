import Icon from "components/Icon";
import Button from "components/UI/Button";
import { dark_primary } from "constants/Colors";
import { PUBLICATION } from "constants/tracking";
import React from "react";
import { Share } from "react-native";
import TrackAction from "utils/Track";

type ShareButtonProps = {
  title: string;
  publicationId: string;
};

const ShareButton = ({ title, publicationId }: ShareButtonProps) => {
  const shareVideo = React.useCallback(async () => {
    try {
       await Share.share({
        message: `Let's watch ${title} on LensPlay,here's link, https://lensplay.xyz/watch/${publicationId}
        `,
      });
      void TrackAction(PUBLICATION.SHARE);
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
