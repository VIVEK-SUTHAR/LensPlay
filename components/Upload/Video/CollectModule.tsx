import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import StyledText from "../../UI/StyledText";
import Switch from "../../UI/Switch";
import { dark_primary, primary } from "../../../constants/Colors";

export default function CollectModule({ collectRef }: { collectRef: any }) {
  const [collect, setIsCollect] = useState<boolean>(false);
  
  useEffect(() => {
    if (collect) {
      collectRef.current.snapToIndex(0);
    }
  }, [collect]);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 12,
        marginHorizontal: 8,
        borderRadius: 4,
        marginVertical: 16,
        backgroundColor: dark_primary,
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
        value={collect}
        handleOnPress={() => {
          setIsCollect(!collect);
        }}
        activeTrackColor={primary}
        inActiveTrackColor="rgba(255,255,255,0.2)"
        thumbColor="white"
      />
    </View>
  );
}
