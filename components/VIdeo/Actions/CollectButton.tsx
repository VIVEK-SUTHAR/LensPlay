import React, { useCallback } from "react";
import {
  useAuthStore,
  useReactionStore,
  useThemeStore,
  useToast,
} from "../../../store/Store";
import Button from "../../UI/Button";
import { ToastType } from "../../../types/Store";
import Icon from "../../Icon";
import { useGuestStore } from "../../../store/GuestStore";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

type CollectVideoPrpos = {
  totalCollects: number;
  publicationId?: string;
  title?: string;
  videoUrl?: string;
  bannerUrl?: string;
  hasCollected: boolean;
  collectRef: React.RefObject<BottomSheetMethods>;
};

const CollectButton = (CollectVideoProps: CollectVideoPrpos) => {
  const { PRIMARY } = useThemeStore();
  const toast = useToast();
  const { accessToken } = useAuthStore();
  const { DARK_PRIMARY } = useThemeStore();
  const { isGuest } = useGuestStore();

  const { totalCollects, hasCollected, collectRef } = CollectVideoProps;

  const onPress = useCallback(() => {
    collectRef.current?.snapToIndex(0);
  }, []);

  return (
    <>
      <Button
        title={`${totalCollects || 0} Collects`}
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
          onPress();
        }}
        icon={
          <Icon
            name="collect"
            size={20}
            color={hasCollected ? PRIMARY : "white"}
          />
        }
        textStyle={{
          color: hasCollected ? PRIMARY : "white",
          marginHorizontal: 4,
        }}
      />
    </>
  );
};

export default CollectButton;
