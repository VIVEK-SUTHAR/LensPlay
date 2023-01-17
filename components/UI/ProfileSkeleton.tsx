import React, { FC } from "react";
import { StyleProp, Text, TextStyle, View } from "react-native";
import Heading from "./Heading";
import VideoCardSkeleton from "./VideoCardSkeleton";

const ProfileSkeleton = () => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: "#111111",
      }}
    >
      <View
        style={{
          height: 150,
          alignItems: "flex-start",
          marginBottom: 30,
          borderRadius: 10,
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          marginTop: "-20%",
          //   backgroundColor: "green",
        }}
      >
        <View
          style={{
            // padding:30,
            height: 100,
            width: 100,
            borderRadius: 50,
            // justifyContent: "center",
            backgroundColor: "white",
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          marginVertical: 10,
          width: 80,
          height: 15,
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      />
      <View
        style={{
          padding: 4,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          //   backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        <View
          style={{
            marginHorizontal: 5,
            width: 80,
            height: 5,
            backgroundColor: "yellow",
          }}
        />
        <View
          style={{
            marginHorizontal: 5,
            width: 100,
            height: 5,
            backgroundColor: "grey",
          }}
        />
        <View
          style={{
            marginHorizontal: 5,
            width: 50,
            height: 5,
            backgroundColor: "purple",
          }}
        />
      </View>

      <View
        style={{
          height: 5,
          width: 200,
          backgroundColor: "gray",
          marginVertical: 10,
          justifyContent: "center",
        }}
      />
      <View style={{ paddingVertical: 10 }}>
        <View style={{ paddingVertical: 10 }}>
          <Heading
            title="Videos"
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "white",
            }}
          />
          <VideoCardSkeleton />
          <VideoCardSkeleton />
          <VideoCardSkeleton />
        </View>
        <View></View>
        {/* {Boolean(allVideos) &&
                allVideos.map((item: any, index) => {
                  if (item?.appId?.includes("lenstube")) {
                    console.log(item.profile.isFollowedByMe);
                    return (
                      <VideoCard
                        key={item?.id}
                        id={item?.id}
                        date={convertDate(item?.createdAt)}
                        banner={item?.metadata?.cover}
                        title={item?.metadata?.name}
                        avatar={item?.profile?.picture?.original?.url}
                        playbackId={item?.metadata?.media[0]?.original?.url}
                        uploadedBy={item?.profile?.name}
                        profileId={item?.profile?.id}
                        stats={item?.stats}
                        isFollowdByMe={item.profile.isFollowedByMe}
                        reaction={item?.reaction}
                      />
                    );
                  }
                })} */}
      </View>
    </View>
  );
};

export default ProfileSkeleton;
