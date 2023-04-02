import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";
import Icon, { IconProps } from "../../../../components/Icon";
import Heading from "../../../../components/UI/Heading";
import { STATIC_ASSET } from "../../../../constants";
import { RootStackScreenProps } from "../../../../types/navigation/types";
import CollectModule from "../../../../components/Upload/Video/CollectModule";
import CommentModule from "../../../../components/Upload/Video/CommentModule";
import Button from "../../../../components/UI/Button";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Sheet from "../../../../components/Bottom";
import StyledText from "../../../../components/UI/StyledText";
import { useThemeStore } from "../../../../store/Store";
import { FlatList } from "react-native-gesture-handler";

export default function AddDetails({
  navigation,
}: RootStackScreenProps<"AddDetails">) {
  const theme = useThemeStore();
  const windowHeight = Dimensions.get("window").height;
  const ReferenceModuleList = [
    {
      name: "Everyone can",
      isSelected: true,
    },
    {
      name: "My followers",
      isSelected: false,
    },
    {
      name: "My following",
      isSelected: false,
    },
    {
      name: "Friends of friend",
      isSelected: false,
    },
  ];
  const [activeModule, setActiveModule] = useState(ReferenceModuleList[0]);
  const referenceModuleRef = useRef<BottomSheetMethods>(null);
  return (
    <>
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
        <CommentModule
          sheetRef={referenceModuleRef}
          activeModule={activeModule.name}
        />
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
      <Sheet
        ref={referenceModuleRef}
        snapPoints={["45%"]}
        style={{
          height: "auto",
        }}
        enablePanDownToClose={true}
        children={
          <View style={{ padding: 16 }}>
            <StyledText
              title={"Select who can comment"}
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "500",
                marginVertical: 8,
              }}
            />
            <FlatList
              data={ReferenceModuleList}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => {
                      setActiveModule(ReferenceModuleList[index]);
                      referenceModuleRef.current?.close();
                    }}
                  >
                    <View
                      style={{
                        height: "auto",
                        width: "auto",
                        backgroundColor:
                          activeModule.name === item.name
                            ? theme.PRIMARY
                            : "black",
                        borderRadius: 50,
                        padding: 4,
                        marginVertical: 16,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Icon name={"done"} color={"white"} size={18} />
                    </View>
                    <StyledText
                      title={item.name}
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "400",
                        marginHorizontal: 8,
                      }}
                    />
                  </Pressable>
                );
              }}
            />
          </View>
        }
      />
    </>
  );
}
