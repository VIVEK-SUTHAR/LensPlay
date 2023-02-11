import React from "react";
import { Image } from "react-native";
import { IconProps } from "../../types";

const Outline =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEZElEQVR4nO2dS48NQRTHi/GY8R6P8YgIEY+NxGsyIj6B2IjEgkjYs2AlvgA+gthbmIiETGI3+Ag2hA0Lj/G6w2CMO/KTdot4zO1T3dN1q6vm/BIrrf7V51/Vdau7zmGMoiiKoiiKoiiKoiiKoiiK0gZgPXANeAl8AG4AWzVgHQAYAN7zP43s7zrRhxkLsKdN8H8xCuwL3c+ZGnw1wfNjJxvdroxKjyPgGDBJffkMPAHuA5eB/cBsb0GuMPgpmfAvz4BTQFfdg5+yCRkPgB11eeZLiAszcBRoEhdjwOG6jvwyM+F4hDPhO3CkriO/zEw4R3x8AfbWdeSXmQmDxMdjYG5dR36hmQBsBL4SH6frPPILz4TQAD3ALuAi8MnhnkaA+WWEttn3OC58dFiUXI1sxPICD9gMPHK4p4NlGh9yDFgW2APCNd8KzqbbJhKATQ73daVMwxOOwc8CO0+4bsK26WrCeJDtfUmAC8L9PCzTaNP1eZ0944Rrv/7RrosJzY5t6ysA2CDcz8cyjd51CX5RAxxNGDaR4bAOLi7aYL99FIgfWIBuQXx8ivYH2izy45VtYDoI8FyIwboyjWYmDNtHQvYb/BawZYrrChtg/93WbMG1bTet1l4TIcALIQZrp9N4V96iaH8b5/FFaH92TM/8jhsgASwQxD+bxAFeCTFY7VNcDSCsAQsF8U8mcWi9csijz6e4GgCvBQNW+TRgkSA+ZhKHwAYsrnwnGBnAGyEGK32KqwGENWCJIP7BJA7wVojBCp/iagBhDVgqiI+axAHeCTFY7lN8mSDeMImD/N2816e4GkBYA3oF8fcmcZC/ny/zKa4GENaA5YL4O5M4yJ9Zl/oUVwMIa8AKQfytSRxaSYl5LPEpvlIQf2MSh6o/yhcUVwMIa8AqQfy1SRxaiRl5LPIprgYQ1oA+QXzEJA7ySemFPsXVAH6mr+axwKcBqwXxVyZxCGzAGkH8pUkcWjlhefT4FFcDCGvAWkH8hYkYYJZPA+zRzznT6WCSBgA7gTv2xPaEPUi8vc21U50k/5PuNmlgQ7btpk0J6C/T0XWC+HMTZ/DHXOsfFTVAOJ7fX/WxlOhORdAa+c7ZnA4ptPO9Jqg47ATXm0igdVxeGtH/Zgk5GeCaolWm01K65nkTEciL6l8mOCQ1ziuSpFimw1eFRrOP1htNJAA3HQL12wSbipvHgQJpurfKdPiQQ8PZLNls4knCbjgGbNQmo+chva7+RWOqNDCXDnc7nBDGvrS6BOz2uj2vgOhKNQBniI9vebPSDhTp1Fs96mTYhSYr0RIbg3Uv11N0A+NSRaRunBXuy9dMqL5CTFauy2FRqhuTWXm0upVsm44JBx2OatTRhBMdmgn+ayNlJRxtKcfYTDgWumxn1dv6k8BT4mHSowlhqoJZI/bZPcA9+2tJ+oyXmgm1L8kWHbivCRr8gCZo8H2T84FF/wOLTmHrHw3a0jXZn+ulXqwpiqIoiqIoiqIoiqIoiqKYmcIPzmPG6/5g1uMAAAAASUVORK5CYII";

const Filled =
  "data:image/png;base64,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";

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
