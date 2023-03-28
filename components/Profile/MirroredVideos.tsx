import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useAuthStore } from "../../store/Store";
import {
  PublicationMainFocus,
  PublicationTypes,
  useProfilePostsQuery,
} from "../../types/generated";
import formatHandle from "../../utils/formatHandle";
import Icon from "../Icon";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import VideoCard from "../VideoCard";

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
  const { accessToken } = useAuthStore();

  const QueryRequest = {
    profileId: profileId,
    publicationTypes: [PublicationTypes.Mirror],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: ["lenstube"],
    limit: 50,
  };

  const {
    data: AllMirrorVideosData,
    error: AllMirrorVideoError,
    loading: AllMirrorVideosLoading,
  } = useProfilePostsQuery({
    variables: {
      request: QueryRequest,
      reactionRequest: {
        profileId: profileId,
      },
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });

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
          {AllMirrorVideosData?.publications.items ? (
            <StyledText
              title={`(${AllMirrorVideosData?.publications.items?.length})`}
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
              videos: AllMirrorVideosData?.publications.items,
              title: "Your mirrors",
            });
          }}
        >
          <Icon
            name="arrowForward"
            size={24}
            color="white"
            style={{
              display: AllMirrorVideosData?.publications.items
                ? "flex"
                : "none",
            }}
          />
        </Pressable>
      </View>
      <ScrollView
        horizontal={true}
        style={{ marginLeft: -12, marginTop: 8 }}
        showsHorizontalScrollIndicator={false}
      >
        {Boolean(AllMirrorVideosData?.publications.items) &&
          AllMirrorVideosData?.publications.items.map((item: any) => {
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
      {AllMirrorVideosData?.publications.items?.length === 0 && (
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
