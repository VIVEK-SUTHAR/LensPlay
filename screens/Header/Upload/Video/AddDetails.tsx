import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";
import Icon from "../../../../components/Icon";
import Heading from "../../../../components/UI/Heading";
import { STATIC_ASSET } from "../../../../constants";
import { RootStackScreenProps } from "../../../../types/navigation/types";
import CollectModule from "../../../../components/Upload/Video/CollectModule";
import CommentModule from "../../../../components/Upload/Video/CommentModule";
import Button from "../../../../components/UI/Button";

export default function AddDetails({
  navigation,
}: RootStackScreenProps<"AddDetails">) {
  const windowHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          height: windowHeight / 4,
          width: "100%",
        }}
      >
        <Image
          source={{
            uri: STATIC_ASSET,
          }}
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "cover",
          }}
        />
      </View>
      <View
        style={{
          padding: 8,
          marginVertical: 16,
        }}
      >
        <Heading
          title={"Title"}
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "600",
          }}
        />
        <TextInput
          placeholder="Add title for your video"
          placeholderTextColor={"gray"}
          numberOfLines={2}
          textAlignVertical="top"
          style={{
            color: "white",
            fontSize: 20,
            paddingVertical: 8,
            marginVertical: 4,
          }}
        />
      </View>
      <Pressable
        onPress={() => {
          navigation.push("AddDescription");
        }}
        android_ripple={{
          color: "gray",
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 8,
          paddingVertical: 16,
          borderTopColor: "gray",
          borderBottomColor: "gray",
          borderBottomWidth: 1,
          borderTopWidth: 1,
        }}
      >
        <Heading
          title="Add description"
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "600",
          }}
        />
        <Icon name="arrowForward" size={20} color="white" />
      </Pressable>
      <CollectModule />
      <CommentModule />
      <View
        style={{
          padding: 8,
          marginVertical: 24,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          title={"Next"}
          py={8}
          width={"30%"}
          textStyle={{
            justifyContent: "center",
            alignItems: "center",
            fontSize: 16,
            fontWeight: "600",
          }}
          onPress={() => {
            navigation.navigate("VideoTypes");
          }}
          bg={"white"}
        />
      </View>
    </SafeAreaView>
  );
}
