import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React from "react";
import { dark_primary } from "../../../constants/Colors";
import { useGuestStore } from "../../../store/GuestStore";
import { useThemeStore, useToast } from "../../../store/Store";
import { ToastType } from "../../../types/Store";
import Icon from "../../Icon";
import Button from "../../UI/Button";

type MirrorButtonProps = {
  id: string;
  totalMirrors: number;
  bannerUrl: string;
  isAlreadyMirrored: boolean;
  mirrorRef: React.RefObject<BottomSheetMethods>;
};

const MirrorButton = ({
  totalMirrors,
  isAlreadyMirrored,
  mirrorRef,
}: MirrorButtonProps) => {
  const Toast = useToast();
  const { PRIMARY } = useThemeStore();
  const { isGuest } = useGuestStore();

  return (
    <Button
      title={totalMirrors?.toString()}
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
        color: isAlreadyMirrored ? PRIMARY : "white",
        marginLeft: 4,
      }}
      //   borderColor={isalreadyDisLiked ? PRIMARY : "white"}
      icon={
        <Icon
          name="mirror"
          size={20}
          color={isAlreadyMirrored ? PRIMARY : "white"}
        />
      }
    />
  );
};

export default MirrorButton;
