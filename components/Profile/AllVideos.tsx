import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { LensPublication } from "../../types/Lens/Feed";
import VideoCard from "../VideoCard";
import Heading from "../UI/Heading";
import Icon from "../Icon";

type AllVideosProps = {
  profileId: string | undefined;
  navigation: any;
  handle?: string;
  Videos: LensPublication[];
};

const AllVideos = ({
  Videos,
  profileId,
  handle,
  navigation,
}: AllVideosProps) => {
  return (
    <>
      <Pressable
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
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
          Videos.map((item: LensPublication) => {
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
