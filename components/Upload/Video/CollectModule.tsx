import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import {
  black,
  dark_primary,
  dark_secondary,
  primary,
} from "constants/Colors";
import { useUploadStore } from "store/UploadStore";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import Switch from "components/UI/Switch";

type CollectModuleSheetProp = {
  collectModuleRef: React.RefObject<BottomSheetMethods>;
};

export default function CollectModule({
  collectModuleRef,
}: CollectModuleSheetProp) {
  return (
    <Pressable
      style={{
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginHorizontal: 8,
        borderRadius: 8,
        backgroundColor: dark_primary,
        marginTop: 16,
        marginBottom: 8,
      }}
      onPress={(e) => {
        collectModuleRef?.current?.snapToIndex(0);
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <StyledText
          title={"Who can collect"}
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "500",
            maxWidth: "75%",
          }}
        />
        <StyledText
          title={"Free"}
          style={{
            color: "gray",
            fontSize: 12,
            fontWeight: "500",
            marginHorizontal: 2,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <StyledText
          title={"By default, no one can collect this video"}
          style={{
            color: "gray",
            fontSize: 12,
            fontWeight: "500",
            maxWidth: "65%",
          }}
        />
        <Icon name="arrowForward" size={16} />
      </View>
    </Pressable>
  );
}

function CollectModuleSheet({ collectModuleRef }: CollectModuleSheetProp) {
  const [isFollowersOnlyCollect, setIsFollowersOnlyCollect] = useState<boolean>(
    false
  );
  const [isCollectEnabled, setIsCollectEnabled] = useState<boolean>(false);
  const uploadStore = useUploadStore();

  useEffect(() => {
    if (isFollowersOnlyCollect) {
      uploadStore.setCollectModule({
        type: "freeCollectModule",
        followerOnlyCollect: true,
        isFreeCollect: true,
        isRevertCollect: false,
      });
      return;
    }
    if (!isFollowersOnlyCollect) {
      uploadStore.setCollectModule({
        type: "freeCollectModule",
        followerOnlyCollect: false,
        isFreeCollect: true,
        isRevertCollect: false,
      });
    }
  }, [isFollowersOnlyCollect]);
  useEffect(() => {
    if (isCollectEnabled) {
      uploadStore.setCollectModule({
        type: "freeCollectModule",
        followerOnlyCollect: isFollowersOnlyCollect,
        isFreeCollect: true,
        isRevertCollect: false,
      });
    }
    if (!isCollectEnabled) {
      uploadStore.setCollectModule({
        type: "freeCollectModule",
        followerOnlyCollect: isFollowersOnlyCollect,
        isFreeCollect: true,
        isRevertCollect: true,
      });
    }
  }, [isCollectEnabled]);
  return (
    <Sheet
      ref={collectModuleRef}
      snapPoints={[680]}
      containerStyle={{
        height: "auto",
      }}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: black[600]
      }}
    >
      <ScrollView
          contentContainerStyle={{
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View style={{ padding: 16 }}>
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
                {/* <View
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
                </View> */}
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
    </Sheet>
  );
}

export { CollectModuleSheet };
