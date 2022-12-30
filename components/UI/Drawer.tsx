import {
    View,
    TouchableWithoutFeedback,
    SafeAreaView,
    Modal,
    Text,
} from "react-native";
import React, { useState } from "react";
import { dark_primary } from "../../constants/Colors";
import { StatusBar } from "expo-status-bar";

interface DrawerProps {
    children: React.ReactNode;
    isOpen: boolean,
    setIsOpen: any
}



const Drawer = ({ children, isOpen, setIsOpen }:DrawerProps) => {

    return (
        <SafeAreaView style={{ backgroundColor: dark_primary }}>
            <Modal
                animationType="slide"
                visible={isOpen}
                onRequestClose={() => {
                    setIsOpen(false);
                }}
                statusBarTranslucent={true}
                transparent={true}
            >
                <StatusBar style="auto" />

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
                        position: 'absolute',
                        top: '40%',
                        zIndex: 2,
                        backgroundColor: "#1d1d1d",
                        height: '100%',
                        width: "100%",
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        paddingVertical: 20,
                    }}
                >
                    {children}
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Drawer;