import { Dimensions, Share } from "react-native";
import React, { useRef } from "react";
import Button from "../../UI/Button";
import { dark_primary } from "../../../constants/Colors";
import ShareIcon from "../../svg/ShareIcon";
import RBSheet from "../../UI/BottomSheet";
import StyledText from "../../UI/StyledText";

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
  const ref = useRef();
  return (
    <>
      <RBSheet
        ref={ref}
        height={Dimensions.get("window").height /1.5}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            backgroundColor: "#1A1A1A",
          },
          draggableIcon: {
            backgroundColor: "red",
          },
        }}
      >
        {/* <YourOwnComponent /> */}
      </RBSheet>

      <Button
        title={"Share"}
        mx={4}
        px={10}
        width={"auto"}
        bg={dark_primary}
        type={"filled"}
        borderRadius={8}
        icon={<ShareIcon height={20} width={20} />}
        // onPress={shareVideo}
        onPress={() => ref.current.open()}
        textStyle={{ color: "white", marginHorizontal: 4 }}
      />
    </>
  );
};

export default ShareButton;
