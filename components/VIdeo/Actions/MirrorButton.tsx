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
import Drawer from "../../UI/Drawer";
import { Dimensions, Image, View } from "react-native";
import getIPFSLink from "../../../utils/getIPFSLink";

type MirrorButtonProps = {
  id: string;
  totalMirrors: string | number;
  isAlreadyMirrored: boolean;
  bannerUrl: string;
  setIsAlreadyMirrored: React.Dispatch<React.SetStateAction<boolean>>;
};

const MirrorButton = ({
  id,
  isAlreadyMirrored,
  setIsAlreadyMirrored,
  totalMirrors,
  bannerUrl
}: MirrorButtonProps) => {
  const Toast = useToast();
  const authStore = useAuthStore();
  const userStore = useProfile();
  const { PRIMARY } = useThemeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onMirror = async () => {
    setIsAlreadyMirrored(true);

    try {
      const data = await freeMirror(
        authStore.accessToken,
        userStore.currentProfile?.id,
        id
      );
      setIsModalOpen(false);
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
    <>
      <Drawer isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <View
          style={{
            width: "100%",
            height: "100%",
            opacity: 1,
            alignItems: "center",
          }}
        >
          <View style={{ maxWidth: "90%", height: 300, marginTop: 32 }}>
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
          </View>
          {/* <Heading
            title={`Uploaded by ${title}`}
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "white",
              fontWeight: "600",
              marginVertical: 12,
            }}
          /> */}
          <Button
            title={`Mirror the video for free`}
            width={"90%"}
            py={12}
            my={4}
            textStyle={{ fontSize: 20, fontWeight: "700", textAlign: "center" }}
            onPress={onMirror}
          />
        </View>
      </Drawer>
    <Button
      title={totalMirrors?.toString()}
      onPress={()=>{
        setIsModalOpen(true);
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
    </>
  );
};

export default MirrorButton;
