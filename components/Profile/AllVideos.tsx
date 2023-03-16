import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { LensPublication } from "../../types/Lens/Feed";
import VideoCard from "../VideoCard";
import Heading from "../UI/Heading";
import Icon from "../Icon";
import StyledText from "../UI/StyledText";
import { Post, Scalars } from "../../types/generated";

type AllVideosProps = {
  profileId: Scalars["ProfileId"];
  navigation: any;
  handle?: string;
  Videos: Post[];
};

const AllVideos = ({ Videos, navigation }: AllVideosProps) => {
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
              fontSize: 20,
              color: "white",
              fontWeight: "600",
            }}
          />
          {Videos?.length > 0 ? (
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
        <Pressable
          onPress={() => {
            navigation.navigate("YourVideos", {
              videos: Videos,
              title: "Your videos",
            });
          }}
        >
          <Icon
            name="arrowForward"
            size={24}
            color="white"
            style={{
              display: Videos?.length > 0 ? "flex" : "none",
            }}
          />
        </Pressable>
      </Pressable>
      <ScrollView
        horizontal={true}
        style={{ marginLeft: -12, marginTop: 8 }}
        showsHorizontalScrollIndicator={false}
      >
        {Boolean(Videos) &&
          Videos.map((item: Post) => {
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

export default AllVideos;
