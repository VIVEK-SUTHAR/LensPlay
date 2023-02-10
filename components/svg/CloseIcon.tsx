import React from "react";
import { Image } from "react-native";
import { IconProps } from "../../types";

const Filled =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAABR0lEQVR4nO3aywqCUBSFYR/RQdGgnl4fo+APqYgIQ4/7mntBs2D5oR45W7uuUqlUKpVKmgA9MD5//V/3A0fgyjs34KJa6tXPd5kp2rSf+TITtGk/j3vmV9kr039OIqWf/acV/dvvaR6Lw9KIoldgXxmtwWLoBuyUwfKSFkM3YmUu6SnAoeEAmhaSBQvUXNd5bZc7OgzWAh0Oq4kOi9VAh8dKotNgJdDpsALPTNNne4QznevMGqLjYRXRcbEK6PhYQXQerAA6H3ZK43PWfDDojc2HZjs2Dxo5bHw08ti4aPSw8dDsafPAhi2e5WBQJBL72TRoBDfv4dEoTCrColEcy4RDYzCDCoPGcODmjmZvL9PI9bp03NsL8UGitN/VJw8LFxLVsYxLP/OlJjMol36+S00Hbi79vD/9G5w/PXTpr1QqlUql0jXnDlC1ENnXTlc8AAAAAElFTkSuQmCC";

export default function CloseIcon({ width, height }: IconProps) {
  return (
    <Image
      source={{
        uri: Filled,
      }}
      style={{ height: height, width: width }}
    />
  );
}
