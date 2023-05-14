import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ErrorMessage from "../../components/common/ErrorMesasge";
import Icon from "../../components/Icon";
import InviteCard from "../../components/invite/InviteCard";
import Avatar from "../../components/UI/Avatar";
import Heading from "../../components/UI/Heading";
import StyledText from "../../components/UI/StyledText";
import { black, white } from "../../constants/Colors";
import useInviteCodes, { GetInviteResponse } from "../../hooks/useInviteCodes";
import { useProfile } from "../../store/Store";
import CommonStyles from "../../styles";
import { RootStackScreenProps } from "../../types/navigation/types";
import getRawurl from "../../utils/getRawUrl";
import formatHandle from "../../utils/formatHandle";

const StatusBarHeight = Constants.statusBarHeight;

const Invite = ({ navigation }: RootStackScreenProps<"Invite">) => {
  const { currentProfile } = useProfile();
  const { inviteCodes, error, isLoading } = useInviteCodes(currentProfile?.id);
  const { width, height } = useWindowDimensions();

  if (isLoading) return <InviteSkleton />;

  if (error === GetInviteResponse.ZERO_INVITES) {
    return (
      <View style={CommonStyles.screenContainer}>
        <Pressable
          style={styles.closeContainer}
          onPress={() => navigation.pop()}
        >
          <Icon name="close" size={20} />
        </Pressable>
        <ErrorMessage message="Sorry,You don't have invites at this moment" />
      </View>
    );
  }
  if (error === GetInviteResponse.ERROR) {
    return (
      <View style={CommonStyles.screenContainer}>
        <Pressable
          style={styles.closeContainer}
          onPress={() => navigation.pop()}
        >
          <Icon name="close" size={20} />
        </Pressable>
        <ErrorMessage message="Looks like something went wrong" />
      </View>
    );
  }

  if (inviteCodes) {
    const leftInvites = inviteCodes.filter((code) => code.isValid).length;
    return (
      <SafeAreaView
        style={[
          CommonStyles.screenContainer,
          { padding: 16, alignItems: "center", justifyContent: "space-around" },
        ]}
      >
        <StatusBar style="auto" />
        <Pressable
          style={styles.closeContainer}
          onPress={() => navigation.pop()}
        >
          <Icon name="close" size={20} />
        </Pressable>
        <View style={styles.upperContainer}>
          <Avatar
            src={getRawurl(currentProfile?.picture)}
            height={80}
            width={80}
            borderRadius={100}
          />
          <View
            style={{
              marginTop: 16,
            }}
          >
            <Heading
              title={`Hey, ${
                currentProfile?.name || formatHandle(currentProfile?.handle)
              } 👋`}
              style={{
                color: white[700],
                fontSize: width / 16,
                fontWeight: "600",
              }}
            />
            <StyledText
              title={`${leftInvites}/5 Invites Left`}
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
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {inviteCodes.map((invite) => {
            return (
              <InviteCard
                key={invite.id}
                inviteCode={invite.inviteCode}
                isValid={invite.isValid}
              />
            );
          })}
          <View
            style={{
              height: height / 6,
              width: "48%",
              marginTop: 16,
              position: "relative",
              backgroundColor: black[600],
              borderRadius: 8,
              padding: 16,
              justifyContent: "space-between",
            }}
          >
            <Heading
              title={"Bring your friend to LensPlay 😉"}
              style={{
                color: white[500],
                fontSize: width / 14,
                fontWeight: "600",
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
};
export default Invite;

const _InviteSkleton = () => {
  return (
    <SafeAreaView
      style={[
        CommonStyles.screenContainer,
        { padding: 8, alignItems: "center", justifyContent: "space-between" },
      ]}
    >
      <View style={styles.upperContainer}>
        <View style={styles.skletonAvatar} />
        <View
          style={{
            alignItems: "center",
          }}
        >
          <View style={styles.skletonText} />
          <View style={[styles.skletonText, { marginTop: 8 }]} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const InviteSkleton = React.memo(_InviteSkleton);

const styles = StyleSheet.create({
  closeContainer: {
    position: "absolute",
    top: StatusBarHeight - 8,
    right: 0,
    padding: 16,
    zIndex: 1,
  },
  upperContainer: {
    justifyContent: "space-around",
    width: "100%",
  },
  skletonAvatar: {
    height: 100,
    width: 100,
    backgroundColor: black[400],
    borderRadius: 50,
  },
  skletonText: {
    width: Dimensions.get("screen").width / 6,
    height: 30,
    borderRadius: 8,
    backgroundColor: black[400],
    padding: 12,
  },
});
