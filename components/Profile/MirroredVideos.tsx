import { View, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { client } from "../../apollo/client";
import getMirrorVideos from "../../apollo/Queries/getMirrorVideos";
import { LensPublication } from "../../types/Lens/Feed";
import { useAuthStore } from "../../store/Store";
import Heading from "../UI/Heading";
import VideoCard from "../VideoCard";
import { Feather } from "@expo/vector-icons";
import formatHandle from "../../utils/formatHandle";

type MirroredVideosProps = {
  profileId: string | undefined;
  handle?: string;
  navigation: any;
};

const MirroredVideos = ({
  navigation,
  profileId,
  handle,
}: MirroredVideosProps) => {
  const [mirrorVideos, setmirrorVideos] = useState<LensPublication[]>([]);

  const { accessToken } = useAuthStore();

  useEffect(() => {
    getAllMirroredVideos();
  }, []);

  const getAllMirroredVideos = async () => {
    try {
      const data = await client.query({
        query: getMirrorVideos,
        variables: {
          id: profileId,
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${accessToken}`,
          },
        },
      });
      setmirrorVideos(data.data.publications.items);
    } catch (err) {
      setmirrorVideos([]);
    }
  };

  return (
    <View style={{ marginTop: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Heading
          title={"Mirrored Videos"}
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: "600",
          }}
        />
        <Pressable
          onPress={() => {
            navigation.navigate("YourVideos", {
              videos: mirrorVideos,
              title: "Your mirrors",
            });
          }}
        >
          <Feather
            name={`chevron-right`}
            size={24}
            color="white"
            style={{
              display: mirrorVideos?.length > 0 ? "flex" : "none",
            }}
          />
        </Pressable>
      </View>
      <ScrollView
        horizontal={true}
        style={{ marginLeft: -12, marginTop: 8 }}
        showsHorizontalScrollIndicator={false}
      >
        {Boolean(mirrorVideos) &&
          mirrorVideos.map((item: any) => {
            if (item?.appId?.includes("lenstube")) {
              return (
                <VideoCard
                  key={item?.id}
                  id={item?.id}
                  date={item?.createdAt}
                  banner={item?.metadata?.cover}
                  ethAddress={item?.profile.ownedBy}
                  description={item?.metadata?.description}
                  title={item?.metadata?.name}
                  avatar={item?.profile?.picture?.original?.url}
                  playbackId={item?.metadata?.media[0]?.original?.url}
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
            }
          })}
      </ScrollView>
      {mirrorVideos?.length === 0 && (
        <View style={{ height: 50, justifyContent: "center" }}>
          <Heading
            title={`Seems like ${formatHandle(handle)} has not mirrored any video`}
            style={{
              color: "gray",
              fontSize: 14,
            }}
          ></Heading>
        </View>
      )}
    </View>
  );
};

export default MirroredVideos;
