import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Skleton = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#111111",
        padding: 9,
        marginVertical: 2,
        marginHorizontal: 4,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          height: 35,
          width: 35,
          marginHorizontal: 4,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "grey",
          borderRadius: 40,
        }}
      ></View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Pressable>
              <View
                style={{
                  height: 35,
                  width: 35,
                  backgroundColor: "grey",
                  borderRadius: 40,
                }}
              ></View>
            </Pressable>
            <View
              style={{
                height: 8,
                width: 150,
                backgroundColor: "grey",
                marginVertical: 8,
                borderRadius: 2,
              }}
            ></View>
            <View
              style={{
                height: 8,
                width: 200,
                borderRadius: 2,
                backgroundColor: "grey",
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
