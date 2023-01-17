import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { dark_secondary, primary } from "../constants/Colors";
import getDifference from "../utils/getDifference";
import Heading from "./UI/Heading";
import SubHeading from "./UI/SubHeading";
import extractURLs from "../utils/extractURL";
import { useNavigation } from "@react-navigation/native";
import Button from "./UI/Button";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";

type CommentCardProps = {
  avatar: string;
  username: string;
  commentText: string;
  commentTime: string;
  id: string;
  isFollowdByMe: boolean;
  name: string;
};

const CommentCard = ({
  avatar,
  username,
  commentText,
  commentTime,
  id,
  isFollowdByMe,
  name
}: CommentCardProps) => {
  const [isalreadyDisLiked, setisalreadyDisLiked] = useState(false);
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#111111",
        padding: 8,
        marginVertical: 4,
        borderRadius: 8,
      }}
    >
      <View style={{ height: 40, width: 40, marginRight: 8 }}>
        <Pressable
          onPress={() => {
            navigation.navigate("Channel", {
              profileId: id,
              isFollowdByMe:isFollowdByMe
            });
          }}
        >
          <Image
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 50,
              resizeMode: "contain",
            }}
            source={{
              uri: `https://ipfs.io/ipfs/${avatar?.split("//")[1]}`,
            }}
          />
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <View>
          <Heading title={name} style={{ fontSize: 14, color: "white", fontWeight: "500" }} />
          <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Heading title={`@${username}`} style={{ fontSize: 12, color: "gray", marginTop: 2 }} />
          <SubHeading
            title={getDifference(commentTime)}
            style={{ fontSize: 10, color: "gray" }}
          />
          </View>
        </View>

        {/* <Hyperlink linkDefault={true} linkStyle={ { color: '#2980b9' } }> */}
        <Text style={{ fontSize: 14, color: "white", fontWeight: "600", marginTop: 4 }}>
          {extractURLs(commentText)}
        </Text>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 8,
          // justifyContent: "space-between"
        }}>
        <Button
              title=""
              onPress={()=>{setisalreadyDisLiked(prev=>!prev)}}
              px={12}
              py={4}
              width={"auto"}
              type={"outline"}
              textStyle={{
                fontSize: 14,
                fontWeight: "500",
                color: "white",
                // marginLeft: 4,
              }}
              borderColor={isalreadyDisLiked ? primary : "white"}
              icon={
                <AntDesign
                  name={isalreadyDisLiked ? "like1" : "like2"}
                  size={16}
                  color={isalreadyDisLiked ? primary : "white"}
                />
              }
            />

          <Button
              title={''}
              mx={8}
              px={12}
              py={4}
              width={"auto"}
              type={"outline"}
              icon={<Entypo name="folder-video" size={16} color={"white"} />}
              onPress={() => {
                // setIsmodalopen(true);
              }}
              textStyle={{ color: "white" }}
            />
            <Button
              title={''}
              // mx={4}
              px={12}
              py={4}
              width={"auto"}
              type={"outline"}
              icon={<MaterialIcons name="report" size={16} color="white" />}
              onPress={() => {
                // setIsmodalopen(true);
              }}
              textStyle={{ color: "white" }}
            />
        </View>
        {/* </Hyperlink> */}
      </View>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({});
