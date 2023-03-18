import React, { useRef, useState } from "react";
import Button from "../../UI/Button";
import { dark_primary, primary } from "../../../constants/Colors";
import {
  useAuthStore,
  useProfile,
  useThemeStore,
  useToast,
} from "../../../store/Store";
import { freeMirror } from "../../../api";
import { ToastType } from "../../../types/Store";
import { Dimensions, Image, View } from "react-native";
import getIPFSLink from "../../../utils/getIPFSLink";
import RBSheet from "../../UI/BottomSheet";
import Icon from "../../Icon";
import { useIsMirrored } from "../../../hooks/useFeed";
import { useGuestStore } from "../../../store/GuestStore";

type MirrorButtonProps = {
  id: string;
  totalMirrors: number;
  bannerUrl: string;
};

const MirrorButton = ({
  id,
  totalMirrors,
  bannerUrl,
}: MirrorButtonProps) => {
  const Toast = useToast();
  const authStore = useAuthStore();
  const userStore = useProfile();
  const { PRIMARY } = useThemeStore();
  const ref = useRef();
  const { isGuest } = useGuestStore();
  const [isAlreadyMirrored, setIsAlreadyMirrored] = useState<boolean>(false);
  const [mirrorCount, setMirrorCount] = useState<number>(totalMirrors);

  const { data, error } = useIsMirrored(id);

  const onMirror = async () => {
    if (isAlreadyMirrored || data?.publication?.mirrors?.length > 0) {
      Toast.show("Already mirrored", ToastType.ERROR, true);
      ref.current?.close();
      return;
    }
    try {
      const data = await freeMirror(
        authStore.accessToken,
        userStore.currentProfile?.id,
        id
        );
        if (data) {
          Toast.show("Mirror submitted", ToastType.SUCCESS, true);
          setMirrorCount(prev=>prev+1);
          ref.current?.close();
          setIsAlreadyMirrored(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        Toast.show(error.message, ToastType.ERROR, true);
        ref?.current?.close();
      }
    }    
  };

  return (
    <>
      <RBSheet ref={ref} height={Dimensions.get("window").height / 1.85}>
        <View
          style={{
            maxWidth: "100%",
            height: 300,
            marginTop: 32,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={{
              uri: getIPFSLink(bannerUrl),
            }}
            style={{
              height: 180,
              borderRadius: 8,
              width: Dimensions.get("screen").width - 48,
              resizeMode: "cover",
            }}
            progressiveRenderingEnabled={true}
          />
          <Button
            title={isAlreadyMirrored || data?.publication?.mirrors?.length > 0?'Already mirrored these video':'Mirror the video for free'}
            width={"90%"}
            py={12}
            my={4}
            textStyle={{ fontSize: 20, fontWeight: "700", textAlign: "center" }}
            onPress={onMirror}
            bg={data?.publication?.mirrors?.length > 0 || isAlreadyMirrored?'#c0c0c0':primary}
          />
        </View>
      </RBSheet>
      <Button
        title={mirrorCount?.toString()}
        onPress={() => {
          if (isGuest) {
            Toast.show("Please Login", ToastType.ERROR, true);
            return;
          }
          ref?.current?.open();
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
          color:
            isAlreadyMirrored || data?.publication?.mirrors?.length > 0
              ? PRIMARY
              : "white",
          marginLeft: 4,
        }}
        //   borderColor={isalreadyDisLiked ? PRIMARY : "white"}
        icon={
          <Icon
            name="mirror"
            size={20}
            color={
              isAlreadyMirrored || data?.publication?.mirrors?.length > 0
                ? PRIMARY
                : "white"
            }
          />
        }
      />
    </>
  );
};

export default MirrorButton;
