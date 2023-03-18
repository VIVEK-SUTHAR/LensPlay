import { Dimensions, Image, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAuthStore, useReactionStore, useThemeStore, useToast } from "../../../store/Store";
import { freeCollectPublication } from "../../../api";
import Button from "../../UI/Button";
import { ToastType } from "../../../types/Store";
import getIPFSLink from "../../../utils/getIPFSLink";
import RBSheet from "../../UI/BottomSheet";
import Icon from "../../Icon";
import { useGuestStore } from "../../../store/GuestStore";
import { primary } from "../../../constants/Colors";
import { client } from "../../../apollo/client";
import fetchPublicationById from "../../../apollo/Queries/fetchPublicationById";

type CollectVideoPrpos = {
  totalCollects: number;
  publicationId: string;
  title: string;
  videoUrl: string;
  bannerUrl: string;
  hasCollected: boolean;
};

const CollectButton = (CollectVideoProps: CollectVideoPrpos) => {
  const { PRIMARY } = useThemeStore();
  const toast = useToast();
  const { accessToken } = useAuthStore();
  const { DARK_PRIMARY } = useThemeStore();
  const ref = useRef();
  const { isGuest } = useGuestStore();

  const {
    title,
    bannerUrl,
    publicationId,
    totalCollects,
    videoUrl,
    hasCollected,
  } = CollectVideoProps;

  const [isAlreadyCollected, setIsAlreadyCollected] = useState<boolean>(hasCollected);
  const [collectCount, setCollectCount] = useState(totalCollects);
  const {setCollect} =  useReactionStore();

  const collectPublication = async () => {
    try {
      if(isAlreadyCollected){
        toast.show(
                "You have already collected the video",
                ToastType.ERROR,
                true
              )
        return
      }
      const data = await freeCollectPublication(publicationId, accessToken);
      if (data) {
        toast.show("Collect Submitted", ToastType.SUCCESS, true);
        setCollectCount(prev=>prev+1);
        setIsAlreadyCollected(true);
        ref?.current?.close();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.show(error.message, ToastType.ERROR, true);
        ref?.current?.close();
      }
    } finally {
      ref?.current?.close();
    }
  };

  const getCollect = async () => {
    const collects = await client.query({
      query: fetchPublicationById,
      variables: {
        pubId: publicationId,
      },
      context: {
        headers: {
          "x-access-token": `Bearer ${accessToken}`,
        },
      },
    });
    setIsAlreadyCollected(collects?.data?.publication?.hasCollectedByMe);
    setCollectCount(collects?.data?.publication?.stats?.totalAmountOfCollects);
    setCollect(true);
  }

  useEffect(() => {
    getCollect()
  }, [])
  

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
            title={isAlreadyCollected?'Already collected the video':`Collect the video for free`}
            width={"90%"}
            py={12}
            textStyle={{ fontSize: 20, fontWeight: "700", textAlign: "center" }}
            bg={isAlreadyCollected?'#c0c0c0':primary}
            onPress={collectPublication}
          />
        </View>
      </RBSheet>

      <Button
        title={`${collectCount || 0} Collects`}
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
          ref?.current?.open();
        }}
        icon={
          <Icon
            name="collect"
            size={20}
            color={isAlreadyCollected ? PRIMARY : "white"}
          />
        }
        textStyle={{
          color: isAlreadyCollected? PRIMARY : "white",
          marginHorizontal: 4,
        }}
      />
    </>
  );
};

export default CollectButton;
