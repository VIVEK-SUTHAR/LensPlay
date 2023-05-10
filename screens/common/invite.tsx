import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Heading from "../../components/UI/Heading";
import StyledText from "../../components/UI/StyledText";
import InviteCard, {
  InviteCardOptions,
} from "../../components/invite/InviteCard";
import { black, white } from "../../constants/Colors";
import CommonStyles from "../../styles";

export default function Invite() {
  const AnimatedView = Animated.createAnimatedComponent(View);

  const InviteCardData: InviteCardOptions[] = [
    {
      color: "black",
      bgColor: "#FFFFFF",
      inviteCode: "lensplay-0xhf33-34fff",
    },
    {
      color: "black",
      bgColor: "#E5E5E5",
      inviteCode: "lensplay-0xhf33-34fff",
    },
    {
      color: "black",
      bgColor: "#FCA311",
      inviteCode: "lensplay-0xhf33-34fff",
    },
    {
      color: "white",
      bgColor: "#14213D",
      inviteCode: "lensplay-0xhf33-34fff",
    },
    {
      color: "white",
      bgColor: black[400],
      inviteCode: "lensplay-0xhf33-34fff",
    },
  ];
  return (
    <SafeAreaView
      style={[
        CommonStyles.screenContainer,
        { padding: 8, alignItems: "center", justifyContent: "space-between" },
      ]}
    >
      <StatusBar style="auto" />
      <View style={{ alignItems: "center", paddingVertical: 36 }}>
        <Heading
          title="5/5"
          style={{ color: white[600], fontSize: 36, fontWeight: "600" }}
        />
        <StyledText
          title="Invites Left"
          style={{
            color: white[100],
            fontSize: 24,
            fontWeight: "500",
            marginTop: 4,
          }}
        />
      </View>
      <View
        style={{
          flex: 0.8,
        }}
      >
        {InviteCardData &&
          InviteCardData.map((invite, index) => {
            return (
              <AnimatedView
                entering={FadeInDown.delay((4 - index) * 300).springify()}
                key={index}
                style={{
                  alignItems: "center",
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <InviteCard
                  bgColor={invite.bgColor}
                  color={invite.color}
                  inviteCode={invite.inviteCode}
                />
              </AnimatedView>
            );
          })}
      </View>
    </SafeAreaView>
  );
}
