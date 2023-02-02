import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { LensPublication } from "../../types/Lens/Feed";
import VideoCard from "../VideoCard";
import Heading from "../UI/Heading";
import { Feather } from "@expo/vector-icons";
import { client } from "../../apollo/client";
import getPublications from "../../apollo/Queries/getPublications";
import { useAuthStore } from "../../store/Store";

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
          <Feather
            name={`chevron-right`}
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
                key={item?.id}
                id={item?.id}
                date={item?.createdAt}
                banner={item?.metadata?.cover}
                title={item?.metadata?.name}
                avatar={item?.profile?.picture?.original?.url}
                playbackId={item?.metadata?.media[0]?.original?.url}
                ethAddress={item?.profile.ownedBy}
                description={item?.metadata?.description}
                uploadedBy={item?.profile?.name}
                profileId={item?.profile?.id}
                stats={item?.stats}
                isFollowdByMe={item.profile.isFollowedByMe}
                reaction={item?.reaction}
                width={300}
                height={150}
                attributes={item?.metadata?.attributes}
              />
            );
          })}
      </ScrollView>
      {Videos?.length === 0 && (
        <View style={{ height: 50, justifyContent: "center" }}>
          <Heading
            title={`Looks like ${handle} has not posted  any video`}
            style={{
              color: "gray",
              fontSize: 14,
              textAlign: "center",
            }}
          ></Heading>
        </View>
      )}
    </>
  );
};

export default AllVideos;
