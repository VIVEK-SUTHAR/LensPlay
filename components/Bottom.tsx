import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { IBottomSheet } from "customTypes/index";
import React, { useCallback } from "react";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { black } from "constants/Colors";

const Sheet = React.forwardRef<BottomSheetMethods, IBottomSheet>(
  (props, ref) => {
    const renderBackdrop = useCallback(
      (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      []
    );

    return (
      <BottomSheet
        index={-1}
        ref={ref}
        handleIndicatorStyle={{
          width: "15%",
          backgroundColor: "gray",
        }}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: black[600],
        }}
        {...props}
      ></BottomSheet>
    );
  }
);

export default Sheet;
