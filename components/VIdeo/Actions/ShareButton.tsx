import { Share } from "react-native";
import React from "react";
import Button from "../../UI/Button";
import { dark_primary } from "../../../constants/Colors";
import ShareIcon from "../../svg/ShareIcon";

type ShareButtonProps = {
  title: string;
  publicationId: string;
};

const ShareButton = ({ title, publicationId }: ShareButtonProps) => {
  const shareVideo = async () => {
    try {
      const result = await Share.share({
        message: `Let's watch ${title} on LensPlay,here's link`,
        url: `https://lensplay.xyz/watch/${publicationId}`,
      });
    } catch (error) {}
  };

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

export default ShareButton;
