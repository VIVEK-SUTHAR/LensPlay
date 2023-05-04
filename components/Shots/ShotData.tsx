import { default as React, useCallback, useRef } from "react";
import { Dimensions, Pressable, ScrollView, View } from "react-native";
import getRawurl from "../../utils/getRawUrl";
import Avatar from "../UI/Avatar";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import Sheet from "../Bottom";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ShotsPublication } from "../Bytes/ByteCard";
import { white } from "../../constants/Colors";

function ShotData({ item }: { item: ShotsPublication }) {
  const descriptionRef = useRef<BottomSheetMethods>(null);

  const handleSheet = useCallback(() => {
    descriptionRef?.current?.snapToIndex(0);
  }, []);

  return (
    <>
      <View
        style={{
          position: "absolute",
          width: Dimensions.get("window").width,
          zIndex: 0,
          bottom: 0,
          padding: 10,
        }}
      >
        <View style={{ marginVertical: 10 }}>
          <View style={{ width: "auto", maxWidth: 250 }}>
            <Pressable onPress={handleSheet}>
              <Heading
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                }}
                numberOfLines={1}
                title={item?.metadata?.name}
              />
              <StyledText
                style={{
                  color: white[300],
                  fontSize: 12,
                  fontWeight: "500",
                }}
                numberOfLines={2}
                title={item?.metadata?.description}
              />
            </Pressable>
            <View
              style={{
                width: "auto",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Avatar
                src={getRawurl(item?.profile?.picture)}
                height={40}
                width={40}
              />
              <View style={{ marginLeft: 8 }}>
                <StyledText
                  style={{ color: "white", fontSize: 16, fontWeight: "500" }}
                  title={item?.profile?.name || item?.profile?.id}
                />
                <StyledText
                  style={{ color: white[300], fontSize: 12, fontWeight: "500" }}
                  title={item?.profile?.handle}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <Sheet
        ref={descriptionRef}
        index={-1}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: "#1d1d1d",
        }}
        snapPoints={["50%"]}
        children={
          <View style={{ paddingHorizontal: 8 }}>
            <ScrollView style={{ padding: 8 }}>
              <Heading
                title={item?.metadata?.name}
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "white",
                }}
              />
              <StyledText
                title={
                  item?.metadata?.description ||
                  item?.metadata?.content ||
                  "No description provided by creator"
                }
                style={{
                  color: "white",
                }}
              />
            </ScrollView>
          </View>
        }
      />
    </>
  );
}

export default React.memo(ShotData);
