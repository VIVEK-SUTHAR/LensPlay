import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../../components/Icon";
import Avatar from "../../components/UI/Avatar";
import Heading from "../../components/UI/Heading";
import StyledText from "../../components/UI/StyledText";
import InviteCard, {
  InviteCardOptions,
} from "../../components/invite/InviteCard";
import { black, white } from "../../constants/Colors";
import { useProfile } from "../../store/Store";
import CommonStyles from "../../styles";
import getRawurl from "../../utils/getRawUrl";
import { RootStackScreenProps } from "../../types/navigation/types";

const Invite = ({ navigation }: RootStackScreenProps<"Invite">) => {
  const { currentProfile } = useProfile();
  const StatusBarHeight = Constants.statusBarHeight;

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
      <Pressable
        style={{
          position: "absolute",
          top: StatusBarHeight - 8,
          right: 0,
          padding: 16,
        }}
        onPress={() => navigation.pop()}
      >
        <Icon name="close" size={20} />
      </Pressable>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          height: "30%",
        }}
      >
        <Avatar
          src={getRawurl(currentProfile?.picture)}
          height={100}
          width={100}
          borderRadius={100}
        />
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Heading
            title="5/5"
            style={{
              color: white[600],
              fontSize: 32,
              fontWeight: "600",
            }}
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
      </View>
      <View
        style={{
          height: "70%",
        }}
      >
        {InviteCardData &&
          InviteCardData.map((invite, index) => {
            return (
              <View
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
                  index={index}
                />
              </View>
            );
          })}
      </View>
    </SafeAreaView>
  );
};

export default Invite;
