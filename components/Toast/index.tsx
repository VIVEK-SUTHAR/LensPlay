import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Constants from "expo-constants";
import { useToast } from "../../store/Store";
import { ToastType } from "../../types/Store";

const StatusBarHeight = Constants.statusBarHeight;

const Toast = () => {
  const toastStore = useToast();

  const slideIn = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (toastStore.isVisible === true) {
      Animated.timing(slideIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        toastStore.show("", ToastType.INFO, false);
      }, 5000);
    }
    if (toastStore.isVisible === false) {
      Animated.timing(slideIn, {
        toValue: -100,
        duration: 500,
        useNativeDriver: true,
      }).start();
      // setTimeout(() => {
      //   toastStore.show("", ToastType.INFO, false);
      // }, 5000);
    }
  }, [toastStore.isVisible]);
  return (
    <Animated.View
      style={[
        styles.conatiner,
        {
          display: toastStore.isVisible ? "flex" : "none",
          borderColor:
            toastStore.type === ToastType.ERROR
              ? "red"
              : toastStore.type === ToastType.INFO
              ? "white"
              : "#2AD95C",
          transform: [
            {
              translateY: slideIn,
            },
          ],
        },
      ]}
    >
      <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
        {toastStore.message}
      </Text>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  conatiner: {
    position: "absolute",
    height: 60,
    top: StatusBarHeight + 10,
    // bottom: StatusBarHeight * 2,
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    borderRadius: 5,
    borderColor: "#2AD95C",
    borderWidth: 1,
    backgroundColor: "black",
  },
});
