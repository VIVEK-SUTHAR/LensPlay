import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { dark_primary } from "../constants/Colors";
import Avatar from "./UI/Avatar";
import Heading from "./UI/Heading";

type ProfileCardProps = {
  profileIcon: string;
  profileName: string;
  handle: string;
  owner: string;
  isFollowed: boolean;
  profileId: string;
};

export default function ProfileCard({
  profileIcon,
  profileName,
  handle,
  owner,
  profileId,
  isFollowed
}: ProfileCardProps) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
    onPress={() => {
      console.log('touch');
      
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
        padding: 10,
        marginVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: dark_primary,
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
        <Heading
          title={handle}
          style={{
            color: profileName ? "gray" : "white",
            fontSize: profileName ? 12 : 16,
            marginTop: profileName ? 0 : -8,
          }}
        />
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}
