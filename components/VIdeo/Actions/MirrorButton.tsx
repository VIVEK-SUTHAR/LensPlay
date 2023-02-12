import React, { useState } from "react";
import Button from "../../UI/Button";
import { dark_primary } from "../../../constants/Colors";
import {
  useAuthStore,
  useProfile,
  useReactionStore,
  useThemeStore,
  useToast,
} from "../../../store/Store";
import MirrorIcon from "../../svg/MirrorIcon";
import { freeMirror } from "../../../api";
import { ToastType } from "../../../types/Store";

type MirrorButtonProps = {
  id: string;
  totalMirrors: string | number;
  isAlreadyMirrored: boolean;
  setIsAlreadyMirrored: React.Dispatch<React.SetStateAction<boolean>>;
};

const MirrorButton = ({
  id,
  isAlreadyMirrored,
  setIsAlreadyMirrored,
  totalMirrors
}: MirrorButtonProps) => {
  const Toast = useToast();
  const authStore = useAuthStore();
  const userStore = useProfile();
  const { PRIMARY } = useThemeStore();

  const onMirror = async () => {
    setIsAlreadyMirrored(true);

    try {
      const data = await freeMirror(
        authStore.accessToken,
        userStore.currentProfile?.id,
        id
      );
      if (data) {
        Toast.show("Video Mirrored", ToastType.SUCCESS, true);
      }
    } catch (error) {
      if (error instanceof Error) {
        Toast.show(error.message, ToastType.ERROR, true);
      }
    }
  };

  return (
    <Button
      title={totalMirrors?.toString()}
      onPress={onMirror}
      mx={4}
      px={16}
      width={"auto"}
      bg={dark_primary}
      type={"filled"}
      borderRadius={8}
      textStyle={{
        fontSize: 14,
        fontWeight: "500",
        color: isAlreadyMirrored?PRIMARY:"white",
        marginLeft:4
      }}
      //   borderColor={isalreadyDisLiked ? PRIMARY : "white"}
      icon={
        <MirrorIcon
          height={20}
          width={20}
          filled={isAlreadyMirrored ? true : false}
        />
      }
    />
  );
};

export default MirrorButton;
