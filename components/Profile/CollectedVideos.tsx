import { View, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../UI/Heading";
import { LensPublication } from "../../types/Lens/Feed";
import { client } from "../../apollo/client";
import getCollectVideos from "../../apollo/Queries/getCollectVideos";
import { useAuthStore } from "../../store/Store";
import { Feather } from "@expo/vector-icons";
import VideoCard from "../VideoCard";
import formatHandle from "../../utils/formatHandle";
import Icon from "../Icon";
import StyledText from "../UI/StyledText";

type CollectedVideosProps = {
  navigation: any;
  handle: string;
  ethAddress: string | undefined;
};

const CollectedVideos = ({
  ethAddress,
  handle,
  navigation,
}: CollectedVideosProps) => {
  const [collectVideos, setcollectVideos] = useState<LensPublication[]>([]);
  const { accessToken } = useAuthStore();
  useEffect(() => {
    getCollects();
  }, []);
  const getCollects = async () => {
    try {
      const getCollectVideo = await client.query({
        query: getCollectVideos,
        variables: {
          ethAddress: ethAddress,
        },
        context: {
          headers: {
            "x-access-token": `Bearer ${accessToken}`,
          },
        },
      });
      setcollectVideos(getCollectVideo.data.publications.items);
    } catch (err) {
      setcollectVideos([]);
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
            title={"Collected Videos"}
            style={{
              fontSize: 20,
              color: "white",
              fontWeight: "600",
            }}
          />
          {collectVideos.length > 0 ? (
            <StyledText
              title={`(${collectVideos?.length})`}
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
              videos: collectVideos,
              title: "Your collects",
            });
          }}
        >
          <Icon
            name="arrowForward"
            size={24}
            color="white"
            style={{
              display: collectVideos?.length > 0 ? "flex" : "none",
            }}
          />
        </Pressable>
      </View>
      <ScrollView
        horizontal={true}
        style={{ marginLeft: -12, marginTop: 8 }}
        showsHorizontalScrollIndicator={false}
      >
        {Boolean(collectVideos) &&
          collectVideos.map((item: any) => {
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
      {collectVideos?.length === 0 && (
        <View style={{ height: 50, justifyContent: "center" }}>
          <Heading
            title={`Looks like ${formatHandle(
              handle
            )} has not collected any video`}
            style={{
              color: "gray",
              fontSize: 15,
            }}
          ></Heading>
        </View>
      )}
    </View>
  );
};

export default CollectedVideos;
