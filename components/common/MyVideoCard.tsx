import React from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import StyledText from "../UI/StyledText";
import Heading from "../UI/Heading";
import Icon from "../Icon";
import { Mirror, Post } from "../../types/generated";
import { useNavigation } from "@react-navigation/native";
import { useActivePublication } from "../../store/Store";
import getIPFSLink from "../../utils/getIPFSLink";
import getRawurl from "../../utils/getRawUrl";
import getDifference from "../../utils/getDifference";
import { black } from "../../constants/Colors";

type MyVideoCardProps = {
  publication: Mirror | Post;
  id: string;
};

export default function MyVideoCard({ publication, id }: MyVideoCardProps) {
  const navigation = useNavigation();
  const { setActivePublication } = useActivePublication();

  return (
    <Pressable
      key={id}
      android_ripple={{
        color: black[400],
      }}
      style={{
        flexDirection: "row",
        maxWidth: Dimensions.get("window").width,
        padding: 16,
      }}
      onPress={() => {
        setActivePublication(publication);
        navigation.navigate("VideoPage");
      }}
    >
      <View>
        <Image
          source={{
            uri: getIPFSLink(getRawurl(publication?.metadata?.cover)),
          }}
          style={{
            width: 140,
            height: 80,
            borderRadius: 8,
          }}
        />
      </View>
      <View
        style={{
          height: "100%",
          width: "58%",
          marginLeft: 8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "80%",
          }}
        >
          <Heading
            title={publication?.metadata?.name}
            style={{ color: "white", fontSize: 14, fontWeight: "400" }}
            numberOfLines={3}
          />
          <View
            style={{
              marginTop: 2,
            }}
          >
            <StyledText
              title={getDifference(publication?.createdAt)}
              style={{ color: "gray", fontSize: 12 }}
            />
          </View>
        </View>
        <Pressable>
          <Icon name="delete" size={16} color="red" />
        </Pressable>
      </View>
    </Pressable>
  );
}
