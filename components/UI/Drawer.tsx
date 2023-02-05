import {
  View,
  TouchableWithoutFeedback,
  Modal,
  SafeAreaView,
} from "react-native";
import React from "react";
import { dark_primary } from "../../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useThemeStore } from "../../store/Store";
import Heading from "./Heading";
import CloseIcon from "../svg/CloseIcon";

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Drawer = ({ children, isOpen, setIsOpen }: DrawerProps) => {
  return (
    <SafeAreaView style={{ backgroundColor: dark_primary }}>
      <StatusBar backgroundColor="black" style="auto" translucent={true} />
      <Modal
        animationType="slide"
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        statusBarTranslucent={true}
        transparent={true}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setIsOpen(false);
          }}
        >
          <View
            style={{
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.8)",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></View>
        </TouchableWithoutFeedback>
        <View
          style={{
            position: "absolute",
            top: "40%",
            zIndex: 2,
            backgroundColor: "#1d1d1d",
            height: "100%",
            width: "100%",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              alignItems: "flex-end",
              paddingRight: 16,
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                setIsOpen(false);
              }}
            >
              <CloseIcon width={20} height={20} />
            </TouchableWithoutFeedback>
          </View>
          {children}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Drawer;
