import React from "react";
import { Image } from "react-native";
import { IconProps } from "../../types";

const Outline =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA2UlEQVR4nN3QsQpBURjA8VMks83mGSw2s1gMisWiDN7CXWT0EExewGo0mZXJTbIziPx18g1HuTm3zif51+3eezrf+d2uMX8RyW3l8mkPNNICaTsC+UTAd/1dwEq297SArmxfawE54CAj1eCADRjKyNwoAUXgAtyAUnDABkxlbKQFVGQsVgHezvEh800AWODXzudLYtkcOWuRz+FAzQdoAlcXAeryvkz765KQloOMgQJwB85AVgvZyHM5CGAD2g5ykvvAhIxXxDYJCtiAjoP0jUY8kRmQUQF+qgduHbASjH3HSQAAAABJRU5ErkJggg=='
const Filled ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABjklEQVR4nO2av0oDQRDGg42tjaJ9isx3oL0RLH0E4XZi8AGsfAAbtRVLzUwCdr6FmNiIlRa+hYUK2ohyGElQz/tjchvP+WCasJm9330zO1tcpWIy+RWJ60L5tcggcd1SgED4fOQgpkkS+SgrHUOf+ASB9UlZReIuvJWVjrBPfEOgHyMD+XUi3/vDQP6oI0ud5gwJX0axeMJzWfchcfsk7hHKe3n2T1SaRNXDrWmIOxs0p7vJCkPKD/3/3mfdP5USE+3sTEH49OtJEw8T/Q7lqyg+1kROUAQjvOsFBMIH8ec/39aO3MLw+qpuzkL4+qc1hYNAw+3kGTDkTOTeuxOp3cO4QagdrkPdS7rJPHjrQbuxBnFP361BpzlfKEhNG6tQ95ztmpEPBuMCoeONgJTv8lwz8sDA80A2le7qjrjyVO6lBvH9sEgIA8F/dCRo83JS/qAV1icfpBXWk/M3ViYeBGUpLRgImyNWWrAeYTu1YMev+p8XsIHYl+83DnPkk0rjCCn3fD8sivysw2SqxOoNn7HOogzWoQcAAAAASUVORK5CYII='
export default function CollectIcon({
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
