import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import Constants from "expo-constants";
import { useToast } from "../../store/Store";
import { ToastType } from "../../types/Store";
import { MaterialIcons } from "@expo/vector-icons";

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
              : "#22ae4a",
          backgroundColor:
            toastStore.type === ToastType.ERROR
              ? "#ff4d4d"
              : toastStore.type === ToastType.INFO
              ? "#FFAA1D"
              : "#2AD95C",
          transform: [
            {
              translateY: slideIn,
            },
          ],
        },
      ]}
    >
      <MaterialIcons
        name={
          toastStore.type === ToastType.ERROR
            ? "error-outline"
            : toastStore.type === ToastType.INFO
            ? "info-outline"
            : "check-circle-outline"
        }
        color={"white"}
        style={{ marginHorizontal: 8 }}
        size={24}
      />
      <Text style={{ fontSize: 16, color: "white", textAlign: "center" }}>
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
    flexDirection: "row",
    top: StatusBarHeight + 10,
    // bottom: StatusBarHeight * 2,
    width: "auto",
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    alignItems: "center",
    zIndex: 100,
    borderRadius: 5,
    borderColor: "#2AD95C",
    borderWidth: 1,
    backgroundColor: "black",
  },
});