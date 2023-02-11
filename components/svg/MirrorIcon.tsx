import React from "react";
import { Image } from "react-native";
import { IconProps } from "../../types";

const Outline =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAoklEQVR4nO2UwQ2DMAxFuQAzZBQQ87AKHQFunYVDOwnswOlVroKE0gRiFYkDeZIlK3H848hOliXuBdCKWb8CFuKZgAdQhJKvCcWqjaCWzpfcAPMmSHyjrL6xZyd3IwdGz03eQKkU+eIuDjvlPv8WUAUckASueSL2m6Q/QyAPtPnrp83tuAuNUsREDaqMOXra0FfjEyisyFpJDJKwdj/LxI34AEftJWZpbyTuAAAAAElFTkSuQmCC";

const Filled =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAxElEQVR4nGNgGAUjC2jdjEkDYRBb43aspebNmJ9aN2P+E4mfat6M7tC6EsqG1XCYgSAMYiNZ+J8UrHkzph3T8GvRklo3Y54hKXwGEiPJ9zdibWA+QZEwPpPGqnUj5hCGa27EHFe5lctOYhCD9aIIat6InonTuzdiFlBsAUkKCIBRCwYmiDTxJ5IZFFtgjDOZRx/DSOagTAKRjLUhxRINYjMqKJuTWjRooZVdyEUNBgAVVFBLnpJQ9vzUvh5jhV5YjoIRBAAHUjxVu/kcXAAAAABJRU5ErkJggg==";
export default function MirrorIcon({
  width,
  height,
  filled = false,
}: IconProps) {
  return (
    <Image
      source={{ uri: filled ? Filled : Outline }}
      style={{ height: height, width: width }}
    />
  );
}