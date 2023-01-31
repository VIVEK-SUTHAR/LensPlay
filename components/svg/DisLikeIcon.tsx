import React from "react";
import { Image } from "react-native";
import { IconProps } from "../../types";

const Outline ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAjElEQVR4nN3RsQmDYBCG4ROsMoUrZAGnSJE+lYvoEGlsrJwiM2SNpEwThVd+bET9xeI+EN/y4Hg4zuwUMSs231GpBr7ARQmEHmrgDSRKIJSrgVYN9ECmBEKVGvioAU4ExAI6NXAD/pH9l3nEiKxd8gNSNXJ1ATaQwjxjidSuQAi4T5CnKWJEGrcnH7oBxY9oeKb+eAYAAAAASUVORK5CYII'

const Filled ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAuElEQVR4nN3RsQkCUQyA4QhWTmGnSSf23hIWYiIWguAUdjqDmKCNlVM4g2toaaPCCSd4ojxsEpD7Ic0r8hEeQCUik/x9Uu/0Y1B5EQuYnLuraSMMoCcyCQXI+Ag51AIByVGHvWBA9qEAqdxbm3EzDrDiimUoQMqnWMDKPRUAUqHJLRQg4z4aXxMLDuARFcj3JWh8yeZZPRbRUccFSCFoMgPP6ANBky1411YZvBCVtTsAJbJz++S/7gFhfVRqGqi90QAAAABJRU5ErkJggg'
export default function DisLikeIcon({ width, height, filled=false}:IconProps) {
  return (
    <Image
      source={{ uri: filled ? Filled : Outline }}
      style={{ height: height, width: width }}
    />
  );
}
