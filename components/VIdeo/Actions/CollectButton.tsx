import { Dimensions, Image, View } from "react-native";
import React, { useRef, useState } from "react";
import Drawer from "../../UI/Drawer";
import { useAuthStore, useToast } from "../../../store/Store";
import { freeCollectPublication } from "../../../api";
import Button from "../../UI/Button";
import { ToastType } from "../../../types/Store";
import { dark_primary, dark_secondary } from "../../../constants/Colors";
import CollectIcon from "../../svg/CollectIcon";
import getIPFSLink from "../../../utils/getIPFSLink";
import RBSheet from "../../UI/BottomSheet";

type CollectVideoPrpos = {
  totalCollects: number;
  publicationId: string;
  title: string;
  videoUrl: string;
  bannerUrl: string;
};

const CollectButton = (CollectVideoProps: CollectVideoPrpos) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMute, setIsMute] = useState<boolean>(true);

  const toast = useToast();
  const { accessToken } = useAuthStore();
  const ref = useRef();
  const {
    title,
    bannerUrl,
    publicationId,
    totalCollects,
    videoUrl,
  } = CollectVideoProps;

  const collectPublication = async () => {
    try {
      const data = await freeCollectPublication(publicationId, accessToken);
      if (data) {
        toast.show("Collect Submitted", ToastType.SUCCESS, true);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.show(error.message, ToastType.ERROR, true);
      }
    } finally {
      setIsModalOpen(false);
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
            title={`Collect the video for free`}
            width={"90%"}
            py={12}
            textStyle={{ fontSize: 20, fontWeight: "700", textAlign: "center" }}
            onPress={collectPublication}
          />
        </View>
      </RBSheet>

      <Button
        title={`${totalCollects || 0} Collects`}
        mx={4}
        px={8}
        width={"auto"}
        bg={dark_primary}
        type={"filled"}
        borderRadius={8}
        onPress={() => ref.current.open()}
        icon={<CollectIcon height={20} width={20} filled={true} />}
        textStyle={{ color: "white", marginHorizontal: 4 }}
      />
    </>
  );
};

export default CollectButton;
