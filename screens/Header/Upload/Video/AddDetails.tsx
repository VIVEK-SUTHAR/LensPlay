import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Sheet from "../../../../components/Bottom";
import Icon from "../../../../components/Icon";
import Button from "../../../../components/UI/Button";
import Heading from "../../../../components/UI/Heading";
import StyledText from "../../../../components/UI/StyledText";
import Switch from "../../../../components/UI/Switch";
import CollectModule from "../../../../components/Upload/Video/CollectModule";
import CommentModule from "../../../../components/Upload/Video/CommentModule";
import { STATIC_ASSET } from "../../../../constants";
import { dark_secondary, primary } from "../../../../constants/Colors";
import { useThemeStore } from "../../../../store/Store";
import { UploadStore } from "../../../../store/UploadStore";
import { CollectModules } from "../../../../types/generated";
import { RootStackScreenProps } from "../../../../types/navigation/types";

export default function AddDetails({
  navigation,
}: RootStackScreenProps<"AddDetails">) {
  const theme = useThemeStore();
  const windowHeight = Dimensions.get("window").height;

  const ReferenceModuleList = [
    {
      name: "Everyone",
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
  const referenceModuleRef = useRef<BottomSheetMethods>(null);
  const collectModuleRef = useRef<BottomSheetMethods>(null);

  const [activeModule, setActiveModule] = useState(ReferenceModuleList[0]);
  const [isFollowersOnlyCollect, setIsFollowersOnlyCollect] = useState<boolean>(
    false
  );
  const [isPaidCollect, setIsPaidCollect] = useState<boolean>(false);
  const [collectAmmount, setCollectAmmount] = useState(0);
  const [isCollectEnabled, setIsCollectEnabled] = useState<boolean>(false);

  const uploadStore = UploadStore();

  useEffect(() => {
    if (isFollowersOnlyCollect) {
      uploadStore.setIsFollowesOnlyCollect(true);
      return;
    }
    if (!isFollowersOnlyCollect) {
      uploadStore.setIsFollowesOnlyCollect(false);
    }
  }, [isFollowersOnlyCollect]);

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
        <CollectModule collectRef={collectModuleRef} />
        <CommentModule
          sheetRef={referenceModuleRef}
          activeModule={activeModule.name}
        />
        <View
          style={{
            padding: 8,
            // marginVertical: 24,
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
        snapPoints={["50%"]}
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
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onPress={() => {
                      setActiveModule(ReferenceModuleList[index]);
                      referenceModuleRef.current?.close();
                    }}
                  >
                    <StyledText
                      title={item.name}
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: 18,
                        fontWeight: "400",
                        marginVertical: 16,
                      }}
                    />
                    {activeModule.name === item.name ? (
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
                        <Icon
                          name={"done"}
                          color={
                            activeModule.name === item.name ? "black" : "white"
                          }
                          size={18}
                        />
                      </View>
                    ) : (
                      <></>
                    )}
                  </Pressable>
                );
              }}
            />
          </View>
        }
      />
      <Sheet
        ref={collectModuleRef}
        snapPoints={["98%"]}
        containerStyle={{
          height: "auto",
        }}
        enablePanDownToClose={true}
        children={
          <ScrollView
            contentContainerStyle={{
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View style={{ padding: 16 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Heading
                  title={"Collect Settings"}
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginHorizontal: 8,
                    marginBottom: 16,
                    fontWeight: "600",
                  }}
                />
              </View>
              <View
                style={{
                  backgroundColor: dark_secondary,
                  marginVertical: 8,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginVertical: 16,
                  }}
                >
                  <View
                    style={{
                      maxWidth: "80%",
                    }}
                  >
                    <StyledText
                      title={"Make this Video collectible"}
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "500",
                      }}
                    />
                    <StyledText
                      title={
                        "By enabling this, your video will be collectible by others as NFT"
                      }
                      style={{
                        color: "gray",
                        fontSize: 14,
                        fontWeight: "500",
                      }}
                    />
                  </View>
                  <Switch
                    value={isCollectEnabled}
                    handleOnPress={() => {
                      setIsCollectEnabled((prev) => !prev);
                    }}
                    activeTrackColor={primary}
                    inActiveTrackColor="rgba(255,255,255,0.2)"
                    thumbColor="white"
                  />
                </View>
              </View>
              {isCollectEnabled && (
                <>
                  <View
                    style={{
                      backgroundColor: dark_secondary,
                      marginVertical: 8,
                      borderRadius: 8,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        padding: 12,
                        borderRadius: 4,
                        marginVertical: 2,
                      }}
                    >
                      <View
                        style={{
                          maxWidth: "80%",
                        }}
                      >
                        <StyledText
                          title={"Only Followers can collect"}
                          style={{
                            color: "white",
                            fontSize: 16,
                            fontWeight: "500",
                          }}
                        />
                        <StyledText
                          title={
                            "By enabling this,only your followers will be able to collect this video as NFT"
                          }
                          style={{
                            color: "gray",
                            fontSize: 14,
                            fontWeight: "500",
                          }}
                        />
                      </View>
                      <Switch
                        value={isFollowersOnlyCollect}
                        handleOnPress={() => {
                          setIsFollowersOnlyCollect((prev) => !prev);
                        }}
                        activeTrackColor={primary}
                        inActiveTrackColor="rgba(255,255,255,0.2)"
                        thumbColor="white"
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: dark_secondary,
                      marginVertical: 8,
                      borderRadius: 8,
                      paddingHorizontal: 12,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        paddingVertical: 12,
                        borderRadius: 4,
                        marginVertical: 2,
                      }}
                    >
                      <View
                        style={{
                          maxWidth: "80%",
                        }}
                      >
                        <StyledText
                          title={"Enable Paid Collect"}
                          style={{
                            color: "white",
                            fontSize: 16,
                            fontWeight: "500",
                          }}
                        />
                        <StyledText
                          title={
                            "By enabling this,you will get paid whenever someone collects your post"
                          }
                          style={{
                            color: "gray",
                            fontSize: 14,
                            fontWeight: "500",
                          }}
                        />
                      </View>
                      <Switch
                        value={isPaidCollect}
                        handleOnPress={() => {
                          setIsPaidCollect((prev) => !prev);
                        }}
                        activeTrackColor={primary}
                        inActiveTrackColor="rgba(255,255,255,0.2)"
                        thumbColor="white"
                      />
                    </View>
                    {isPaidCollect && (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginVertical: 8,
                        }}
                      >
                        <TextInput
                          placeholder="Collect Fee"
                          selectionColor={theme.PRIMARY}
                          placeholderTextColor={"gray"}
                          keyboardType="number-pad"
                          style={{
                            backgroundColor: "#1a1a1a",
                            flex: 0.8,
                            paddingVertical: 4,
                            paddingHorizontal: 8,
                            color: "white",
                            borderRadius: 8,
                          }}
                          onChange={(e) => {
                            e.preventDefault();
                            setCollectAmmount(parseInt(e.nativeEvent.text));
                          }}
                        />
                        <View
                          style={{
                            backgroundColor: "#1a1a1a",
                            flex: 0.25,
                            flexDirection: "row",
                            paddingVertical: 8,
                            paddingHorizontal: 8,
                            borderRadius: 8,
                            marginLeft: 4,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <StyledText
                            title="WMATIC"
                            style={{
                              color: "white",
                            }}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                </>
              )}
            </View>
            <View
              style={{
                width: "100%",
                padding: 16,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Button
                title={"Save"}
                width={"30%"}
                bg={"white"}
                borderRadius={8}
                textStyle={{
                  textAlign: "center",
                  fontWeight: "600",
                }}
                onPress={useCallback(() => {
                  collectModuleRef?.current?.close();
                }, [])}
              />
            </View>
          </ScrollView>
        }
      />
    </>
  );
}
