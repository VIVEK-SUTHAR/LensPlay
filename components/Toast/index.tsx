import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;

type ToastProps = {
  message: string;
  timeout?: number;
  type?: ToastTypes;
};
enum ToastTypes {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  INFO = "INFO",
}
const Toast = ({
  message,
  timeout = 2000,
  type = ToastTypes.INFO,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  setTimeout(() => {
    setIsVisible(false);
  }, timeout);
  return (
    <View style={[styles.conatiner, { display: isVisible ? "flex" : "none" }]}>
      <Text>index</Text>
    </View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  conatiner: {
    position: "absolute",
    height: 60,
    bottom: StatusBarHeight * 2,
    width: "95%",
    alignSelf: "center",
    zIndex: 100,
    borderRadius: 5,
    borderColor: "#2AD95C",
    borderWidth: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
  },
});
