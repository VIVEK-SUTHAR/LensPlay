import * as Clipboard from "expo-clipboard";
import React from "react";
import { Share, Vibration, View, useWindowDimensions } from "react-native";
import { black, white } from "constants/Colors";
import { useToast } from "store/Store";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";

export type InviteCardOptions = {
  inviteCode: string;
  isValid: boolean;
};

const InviteCard: React.FC<InviteCardOptions> = ({ inviteCode, isValid }) => {
  const { height, width } = useWindowDimensions();
  const toast = useToast();

  const copyInviteCode = React.useCallback(() => {
    Vibration.vibrate(100);
    Clipboard.setStringAsync(inviteCode).then(() => {
      toast.success("Invite code copied");
    });
  }, []);

  const ShareCode = React.useCallback(async (inviteCode: string) => {
    try {
      const result = await Share.share({
        message: `Join lensplay by using my invite code, Invite code: ${inviteCode}`,
      });
    } catch (error) {}
  }, []);

  return (
    <View
      style={{
        height: 150,
        width: "48%",
        marginTop: 16,
        position: "relative",
        backgroundColor: black[600],
        borderRadius: 16,
        padding: 16,
        justifyContent: "space-between",
      }}
    >
      <Heading
        title={inviteCode}
        style={{ color: white[500], fontSize: width / 22, fontWeight: "600" }}
      />
      <Button
        title={isValid ? "Share" : "Used"}
        disabled={!isValid}
        bg={white[500]}
        py={8}
        textStyle={{ textAlign: "center", fontWeight: "600", fontSize: 16 }}
        onPress={() => {
          ShareCode(inviteCode);
        }}
      />
    </View>
  );
};

export default React.memo(InviteCard);
