import * as Clipboard from "expo-clipboard";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useToast } from "../../store/Store";
import Icon from "../Icon";
import StyledText from "../UI/StyledText";

export type InviteCardOptions = {
  bgColor: string;
  color: string;
  inviteCode: string;
};

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const InviteCard: React.FC<InviteCardOptions> = ({
  bgColor,
  color,
  inviteCode,
}) => {
  const toast = useToast();

  const copyInviteCode = React.useCallback(() => {
    Clipboard.setStringAsync(inviteCode).then(() => {
      Vibration.vibrate(10);
      toast.success("Invite code copied");
    });
  }, []);

  const xvalue = useSharedValue(0);
  const yvalue = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: xvalue.value,
        },
        {
          translateY: yvalue.value,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[styles.inviteCardContainer, { backgroundColor: bgColor }, style]}
    >
      <View style={styles.inviteCodeTextContainer}>
        <StyledText
          title={inviteCode}
          style={{ fontSize: 20, color, fontWeight: "600" }}
        />
        <TouchableOpacity
          style={styles.copyIconContainer}
          onPress={copyInviteCode}
        >
          <Icon name="copy" size={16} style={{ color: color }} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default React.memo(InviteCard);

const styles = StyleSheet.create({
  inviteCardContainer: {
    marginBottom: -48,
    height: height * 0.15,
    width: width,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    zIndex: 2,
  },
  inviteCodeTextContainer: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: "center",
  },

  copyIconContainer: {
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 16,
    opacity: 0.7,
    borderRadius: 100,
  },
});
