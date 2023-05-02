import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useAuthStore, useProfile } from "../../store/Store";
import {
  PublicationMainFocus,
  PublicationsQueryRequest,
  PublicationTypes,
  Scalars,
  useProfileCollectsQuery,
} from "../../types/generated";
import formatHandle from "../../utils/formatHandle";
import Icon from "../Icon";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import VideoCard from "../VideoCard";

type CollectedVideosProps = {
  navigation: any;
  handle: Scalars["Handle"];
  ethAddress: Scalars["EthereumAddress"];
  owner: boolean;
};

const CollectedVideos = ({
  ethAddress,
  handle,
  navigation,
  owner,
}: CollectedVideosProps) => {
  const { accessToken } = useAuthStore();
  const { currentProfile } = useProfile();
  const QueryRequest: PublicationsQueryRequest = {
    collectedBy: ethAddress,
    publicationTypes: [PublicationTypes.Post, PublicationTypes.Mirror],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video],
    },
    sources: ["lenstube"],
    limit: 50,
  };
  const { data, error, loading } = useProfileCollectsQuery({
    variables: {
      request: QueryRequest,
      reactionRequest: {
        profileId: currentProfile?.id,
      },
    },
    context: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`,
      },
    },
  });

  if (error) return <></>;
  if (loading) return <></>;
  if (data) {
    const collectVideos = data?.publications?.items;
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
                fontSize: 16,
                color: "white",
                fontWeight: "600",
              }}
            />
            {collectVideos?.length > 0 ? (
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
                owner: owner,
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
            collectVideos?.map((item: any) => {
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
  }
  return <></>;
};

export default React.memo(CollectedVideos);
