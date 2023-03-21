import { BottomSheetProps } from "@gorhom/bottom-sheet";
import React from "react";

export type IconProps = { width: number; height: number; filled?: boolean };

export interface QRdata {
  bounds: Bounds;
  cornerPoints: Origin[];
  data: string;
  target: number;
  type: number;
}

export interface Bounds {
  origin: Origin;
  size: Size;
}

export interface Origin {
  x: number;
  y: number;
}

export interface Size {
  height: number;
  width: number;
}

export interface IBottomSheet extends BottomSheetProps{
  children: React.ReactNode;
}
