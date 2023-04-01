import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { IBottomSheet } from "../types";
import React, { useCallback, useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

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
          marginTop: 4,
        }}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: "#0f0f0f",
        }}
        {...props}
      ></BottomSheet>
    );
  }
);

export default Sheet;
