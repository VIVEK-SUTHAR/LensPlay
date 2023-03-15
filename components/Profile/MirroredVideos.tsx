import { View, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { client } from "../../apollo/client";
import getMirrorVideos from "../../apollo/Queries/getMirrorVideos";
import { LensPublication } from "../../types/Lens/Feed";
import { useAuthStore } from "../../store/Store";
import Heading from "../UI/Heading";
import VideoCard from "../VideoCard";
import formatHandle from "../../utils/formatHandle";
import Icon from "../Icon";
import StyledText from "../UI/StyledText";

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
        <View
          style={{
            flexDirection: "row",
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
          {mirrorVideos.length > 0 ? (
            <StyledText
              title={`(${mirrorVideos?.length})`}
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
              videos: mirrorVideos,
              title: "Your mirrors",
            });
          }}
        >
          <Icon
            name="arrowForward"
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
                  publication={item}
                  id={item?.id}
                  height={150}
                  width={300}
                />
              );
            }
          })}
      </ScrollView>
      {mirrorVideos?.length === 0 && (
        <View style={{ height: 50, justifyContent: "center" }}>
          <Heading
            title={`Seems like ${formatHandle(
              handle
            )} has not mirrored any video`}
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
