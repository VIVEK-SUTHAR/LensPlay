import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewProps } from "react-native";

type BottomSheetProps = {
  children?: React.ReactNode;
  index?: number;
  bottomSheetBackgroundColor?: string;
  indicatorStyle?: StyleProp<ViewProps>;
};

type BottomSheetRefProps = {
  ref: React.ForwardedRef<BottomSheetMethods>;
};

const Sheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  (
    {
      children,
      index = -1,
      bottomSheetBackgroundColor = "#1d1d1d",
      indicatorStyle = {
        width: "15%",
        backgroundColor: "gray",
        marginTop: 4,
      },
    },
    ref
  ) => {
    const snapPoints = useMemo(() => ["50%", "75%", "95%"], []);
    return (
      <BottomSheet
        ref={ref}
        index={index}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        handleIndicatorStyle={indicatorStyle}
        backgroundStyle={{
          backgroundColor: bottomSheetBackgroundColor,
        }}
      >
        <View style={styles.contentContainer}>{children}</View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});

export default Sheet;
