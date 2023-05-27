import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { dark_primary } from "../constants/Colors";
import formatHandle from "../utils/formatHandle";
import Avatar from "./UI/Avatar";
import Heading from "./UI/Heading";
import StyledText from "./UI/StyledText";

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
          padding: 8,
          marginVertical: 4,
          borderBottomWidth: 1,
          borderBottomColor: dark_primary,
          height: 70,
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
