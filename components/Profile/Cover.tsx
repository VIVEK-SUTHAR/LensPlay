import { Dimensions, Image, Modal, Pressable, View } from "react-native";
import React, { useState } from "react";
import getIPFSLink from "../../utils/getIPFSLink";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import { dark_primary, primary } from "../../constants/Colors";
import Icon from "../Icon";
type CoverProps = {
  url: string;
  navigation: any;
};

const Cover = ({ url, navigation }: CoverProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate("FullImage", {
            url: url,
          });
        }}
      >
        <View
          style={{
            height: 180,
            marginBottom: 34,
          }}
        >
          <Image
            source={{
              uri: getIPFSLink(url),
            }}
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "cover",
            }}
          />
        </View>
      </Pressable>
    </>
  );
};

export default Cover;
