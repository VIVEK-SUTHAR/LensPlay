import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import Constants from "expo-constants";
import { useToast } from "../../store/Store";
import { ToastType } from "../../types/Store";
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "../Icon";

const StatusBarHeight = Constants.statusBarHeight;

const Toast = () => {
  const toastStore = useToast();

  const slideIn = useRef(new Animated.Value(-100)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (toastStore.isVisible === true) {
      Animated.timing(slideIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        toastStore.show("", ToastType.INFO, false);
      }, 5000);
    }
    if (toastStore.isVisible === false) {
      Animated.timing(scale, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      Animated.timing(slideIn, {
        toValue: -100,
        duration: 500,
        useNativeDriver: true,
      }).start();
      // setTimeout(() => {
      //   toastStore.show("", ToastType.INFO, false);
      // }, 5000);
    }
  }, [toastStore.message]);
  return (
    <Animated.View
      style={[
        styles.conatiner,
        {
          display: toastStore.isVisible ? "flex" : "none",
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
            {
              scale: scale,
            },
          ],
        },
      ]}
    >
      <Icon
        name={
          toastStore.type === ToastType.ERROR
            ? "report"
            : toastStore.type === ToastType.INFO
            ? "info"
            : "success"
        }
        color={toastStore.type === ToastType.INFO ? "#000000" : "#FFFFFF"}
        style={{ marginHorizontal: 2 }}
        size={24}
      />
      <Text
        style={{
          fontSize: 16,
          color: `${
            toastStore.type === ToastType.INFO ? "#000000" : "#FFFFFF"
          }`,
          fontWeight: "500",
          textAlign: "center",
          marginHorizontal: 2,
        }}
      >
        {toastStore.message}
      </Text>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  conatiner: {
    position: "absolute",
    height: 40,
    flexDirection: "row",
    top: StatusBarHeight + 20,
    width: "auto",
    alignSelf: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    alignItems: "center",
    zIndex: 100,
    borderRadius: 100,
    backgroundColor: "black",
  },
});
