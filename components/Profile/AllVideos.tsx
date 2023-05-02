import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Post, Scalars } from "../../types/generated";
import Icon from "../Icon";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import VideoCard from "../VideoCard";

type AllVideosProps = {
  profileId: Scalars["ProfileId"];
  navigation: any;
  handle?: string;
  Videos: Post[] | undefined;
  owner?: boolean;
};

const AllVideos = ({ Videos, navigation, owner }: AllVideosProps) => {
  return (
    <>
      <Pressable
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Heading
            title={"Videos"}
            style={{
              fontSize: 16,
              color: "white",
              fontWeight: "600",
            }}
          />
          {Videos && Videos?.length > 0 ? (
            <StyledText
              title={`(${Videos?.length})`}
              style={{
                fontSize: 16,
                color: "white",
                fontWeight: "600",
                marginLeft: 8,
              }}
            />
          ) : (
            <></>
          )}
        </View>
        {Videos && Videos?.length > 0 ? (
          <Pressable
            onPress={() => {
              navigation.navigate("YourVideos", {
                videos: Videos,
                title: "Your videos",
                owner: owner,
              });
            }}
          >
            <Icon
              name="arrowForward"
              size={24}
              color="white"
              style={{
                display: Videos ? "flex" : "none",
              }}
            />
          </Pressable>
        ) : (
          <></>
        )}
      </Pressable>
      <ScrollView
        horizontal={true}
        style={{ marginLeft: -12, marginTop: 8 }}
        showsHorizontalScrollIndicator={false}
      >
        {Boolean(Videos) &&
          Videos?.map((item: Post) => {
            return (
              <VideoCard
                publication={item}
                id={item?.id}
                height={150}
                width={300}
              />
            );
          })}
      </ScrollView>
      {Videos?.length === 0 && (
        <View style={{ height: 50, justifyContent: "center" }}>
          <Heading
            title={`Looks like you have not posted  any video`}
            style={{
              color: "gray",
              fontSize: 14,
            }}
          ></Heading>
        </View>
      )}
    </>
  );
};

export default React.memo(AllVideos);
