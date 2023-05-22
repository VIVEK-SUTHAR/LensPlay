import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const Skleton = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "black",
        paddingHorizontal: 9,
        paddingVertical: 16,
        // marginVertical: 2,
        // marginHorizontal: 4,
        // borderRadius: 8,
        borderBottomColor: "#1d1d1d",
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          height: 35,
          width: 35,
          marginHorizontal: 4,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1d1d1d",
          borderRadius: 40,
        }}
      ></View>
      <View style={{ flex: 1, marginLeft: 6 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Pressable>
              <View
                style={{
                  height: 35,
                  width: 35,
                  backgroundColor: "#1d1d1d",
                  borderRadius: 40,
                }}
              ></View>
            </Pressable>
            <View
              style={{
                height: 8,
                width: 150,
                backgroundColor: "rgba(255,255,255,0.1)",
                marginVertical: 8,
                borderRadius: 2,
              }}
            ></View>
            <View
              style={{
                height: 8,
                width: 200,
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
            ></View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Skleton;

const styles = StyleSheet.create({});
