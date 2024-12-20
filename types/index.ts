import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetProps } from "@gorhom/bottom-sheet";
import React from "react";
import { InputMaybe, Scalars } from "./generated";
import * as generated from "./generated";

export type IconProps = { width: number; height: number; filled?: boolean };
export { generated }
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

export interface IBottomSheet extends BottomSheetProps {
  children: React.ReactNode;
}



export type ProfileMetaDataV1nput = {
  version: Scalars["String"];
  metadata_id: Scalars["String"];
  name: InputMaybe<Scalars["String"]>;
  bio: InputMaybe<Scalars["String"]>;
  cover_picture: InputMaybe<Scalars["String"]>;
  attributes: InputMaybe<generated.MetadataAttribute[]> | undefined;
};

export type ShotsPublication = {
  item: generated.PrimaryPublication,
  commentRef:React.RefObject<BottomSheetMethods>
};
