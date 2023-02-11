import { Dimensions, Image, View } from "react-native";
import React, { useState } from "react";
import Drawer from "../../UI/Drawer";
import { useAuthStore, useToast } from "../../../store/Store";
import { freeCollectPublication } from "../../../api";
import Button from "../../UI/Button";
import { ToastType } from "../../../types/Store";
import { dark_primary } from "../../../constants/Colors";
import CollectIcon from "../../svg/CollectIcon";
import getIPFSLink from "../../../utils/getIPFSLink";

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
            title={`Collect the video for free`}
            width={"90%"}
            py={12}
            my={4}
            textStyle={{ fontSize: 20, fontWeight: "700", textAlign: "center" }}
            onPress={collectPublication}
          />
        </View>
      </Drawer>
      <Button
        title={`${totalCollects || 0} Collects`}
        mx={4}
        px={8}
        width={"auto"}
        bg={dark_primary}
        type={"filled"}
        borderRadius={8}
        onPress={() => {
          setIsModalOpen(true);
        }}
        icon={<CollectIcon height={20} width={20} filled={true} />}
        textStyle={{ color: "white", marginHorizontal: 4 }}
      />
    </>
  );
};

export default CollectButton;
