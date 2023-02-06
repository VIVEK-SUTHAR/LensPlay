import React from "react";
import { Image } from "react-native";
import { IconProps } from "../../types";

const Outline =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA2UlEQVR4nN3QsQpBURjA8VMks83mGSw2s1gMisWiDN7CXWT0EExewGo0mZXJTbIziPx18g1HuTm3zif51+3eezrf+d2uMX8RyW3l8mkPNNICaTsC+UTAd/1dwEq297SArmxfawE54CAj1eCADRjKyNwoAUXgAtyAUnDABkxlbKQFVGQsVgHezvEh800AWODXzudLYtkcOWuRz+FAzQdoAlcXAeryvkz765KQloOMgQJwB85AVgvZyHM5CGAD2g5ykvvAhIxXxDYJCtiAjoP0jUY8kRmQUQF+qgduHbASjH3HSQAAAABJRU5ErkJggg";

const Filled =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAuElEQVR4nN3RsQkCUQyA4QhWTmGnSSf23hIWYiIWguAUdjqDmKCNlVM4g2toaaPCCSd4ojxsEpD7Ic0r8hEeQCUik/x9Uu/0Y1B5EQuYnLuraSMMoCcyCQXI+Ag51AIByVGHvWBA9qEAqdxbm3EzDrDiimUoQMqnWMDKPRUAUqHJLRQg4z4aXxMLDuARFcj3JWh8yeZZPRbRUccFSCFoMgPP6ANBky1411YZvBCVtTsAJbJz++S/7gFhfVRqGqi90QAAAABJRU5ErkJggg";
export default function DisLikeIcon({
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
