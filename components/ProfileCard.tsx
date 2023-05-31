import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import formatHandle from "utils/formatHandle";
import Avatar from "components/UI/Avatar";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";

type ProfileCardProps = {
  profileIcon: string;
  profileName: string | null | undefined;
  handle: string;
  owner: string;
  isFollowed: boolean;
  profileId: string;
};

function ProfileCard({
  profileIcon,
  profileName,
  handle,
  owner,
  profileId,
  isFollowed,
}: ProfileCardProps) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate("Channel", {
          profileId: profileId,
          isFollowdByMe: isFollowed,
          name: profileName,
          ethAddress: owner,
        });
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 8,
          paddingVertical:14,
          // height: 70,
        }}
      >
        <Avatar src={profileIcon} height={40} width={40} />
        <View
          style={{
            marginLeft: 8,
          }}
        >
          {profileName && (
            <Heading
              title={profileName}
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "500",
              }}
            />
          )}
          <StyledText
            title={formatHandle(handle)}
            style={{
              color: profileName ? "gray" : "white",
              fontSize: profileName ? 12 : 16,
              marginTop: profileName ? 0 : -8,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(ProfileCard);
