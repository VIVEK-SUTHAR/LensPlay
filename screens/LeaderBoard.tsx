import React from "react";
import { Image, Pressable, View } from "react-native";
import { dark_primary } from "../constants/Colors";
import CopyIcon from "../components/svg/CopyIcon";
import Heading from "../components/UI/Heading";
import SubHeading from "../components/UI/SubHeading";
import { RootStackScreenProps } from "../types/navigation/types";

export default function LeaderBoard({
  navigation,
  route,
}: RootStackScreenProps<"LeaderBoard">) {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        paddingVertical: 64,
        paddingHorizontal: 16,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../assets/images/icon.png")}
          style={{ width: 40, height: 40 }}
        />
        <Heading
          title="LensPlay"
          style={{
            fontSize: 32,
            fontWeight: "700",
            textTransform: "uppercase",
            color: "white",
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 16,
          paddingVertical: 24,
          backgroundColor: "white",
          marginTop: 32,
          alignItems: "center",
          borderRadius: 8,
        }}
      >
        <View
          style={{
            paddingVertical: 16,
            alignItems: "center",
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderTopColor: dark_primary,
            borderBottomColor: dark_primary,
          }}
        >
          <SubHeading
            title="Your spot in line"
            style={{
              fontSize: 16,
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          />
          <Heading
            title={route.params.rankingPosition}
            style={{
              fontSize: 32,
              fontWeight: "700",
              marginTop: 8,
            }}
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <View
          style={{
            padding: 16,
            backgroundColor: "white",
            marginTop: 16,
            alignItems: "center",
            borderRadius: 8,
            width: "48%",
          }}
        >
          <SubHeading
            title="Points"
            style={{
              fontSize: 16,
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          />
          <Heading
            title={route.params.rankingPoints}
            style={{
              fontSize: 24,
              fontWeight: "700",
            }}
          />
        </View>
        <View
          style={{
            padding: 16,
            backgroundColor: "white",
            marginTop: 16,
            alignItems: "center",
            borderRadius: 8,
            width: "48%",
          }}
        >
          <SubHeading
            title="Refferal"
            style={{
              fontSize: 16,
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          />
          <Heading
            title={route.params.referralsCount}
            style={{
              fontSize: 24,
              fontWeight: "700",
            }}
          />
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 48 }}>
        <Heading
          title="Go Ahead of the Heard"
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "white",
          }}
        />
        <SubHeading
          title="Move up in the queue by inviting your friends with this link"
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "gray",
            marginTop: 4,
            textAlign: "center",
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          width: "100%",
          padding: 8,
          borderRadius: 4,
          marginTop: 24,
        }}
      >
        {/* <TextInput
          value={route.params.refferalLink}
          editable={false}
          style={{
            color: "black",
            fontSize: 16,
            fontWeight: "700",
            width: "90%",
          }}
          selectionColor={"black"}
          placeholderTextColor={"black"}
        /> */}
        <SubHeading
          title={route.params.refferalLink}
          style={{
            color: "black",
            fontSize: 16,
            fontWeight: "700",
            width: "90%",
          }}
          numberOfLines={1}
        />
        <Pressable style={{ marginHorizontal: 8 }} onPress={() => {}}>
          <CopyIcon width={16} height={16} />
        </Pressable>
      </View>
    </View>
  );
}
