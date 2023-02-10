import React from "react";
import { Image } from "react-native";
import getIPFSLink from "../../utils/getIPFSLink";

type AvatarProps = {
  src: string;
  height: number;
  width: number;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
};

export default function Avatar({
  src,
  height,
  width,
  borderRadius = 500,
  borderColor = "transparent",
  borderWidth = 0,
}: AvatarProps) {
  return (
    <Image
      source={{
        uri: `${
          getIPFSLink(src) ===
          "https://lens.infura-ipfs.io/ipfs/bafybeibv2kpqpjtvuj5uprvq6knnr2reb7ylq3o4bnypqjioqgxmjw2akq/5460475.webp"
            ? `https://xsgames.co/randomusers/assets/avatars/pixel/${Math.floor(
                53 * Math.random()
              )}.jpg`
            : getIPFSLink(src)
        }`,
      }}
      style={{
        height: height,
        width: width,
        borderRadius: borderRadius,
        backgroundColor: "black",
        borderColor: borderColor,
        borderWidth: borderWidth,
        zIndex: 9,
      }}
    />
  );
}
