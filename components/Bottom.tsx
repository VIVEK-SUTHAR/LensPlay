import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React from "react";
import { IBottomSheet } from "../types";

const Sheet = React.forwardRef<BottomSheetMethods, IBottomSheet>(
  (props, ref) => {
    return (
      <BottomSheet
        index={-1}
        ref={ref}
        handleIndicatorStyle={{
          width: "15%",
          backgroundColor: "gray",
          marginTop: 4,
        }}
        backgroundStyle={{
          backgroundColor: "#1d1d1d",
        }}
        {...props}
      />
    );
  }
);
export default Sheet;
