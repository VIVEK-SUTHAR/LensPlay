import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as React from "react";
import { useState } from "react";
import VideoCard from "../components/VideoCard";
import { client } from "../apollo/client";
import getTrendingPublication from "../apollo/Queries/getTrendingPublication";
import { useEffect } from "react";
import { dark_primary } from "../constants/Colors";
import convertDate from "../utils/formateDate";
import AnimatedLottieView from "lottie-react-native";
import Heading from "../components/UI/Heading";
import useStore from "../store/Store";

type TrendingPageProps = {
  navigation: any;
};

const Trending = ({ navigation }: TrendingPageProps) => {
  const [TrendingItems, setTrendingItems] = useState([]);
  const store = useStore();
  async function getTrendingData() {
    const trendingData = await client.query({
      query: getTrendingPublication,
      variables: {
        id: store.profileId,
      },
      context: {
        headers: {
          "x-access-token": `Bearer ${store.accessToken}`,
        },
      },
    });
    console.log(trendingData.data.explorePublications.items[0].profile.isFollowedByMe);

    setTrendingItems(trendingData.data.explorePublications.items);
  }
  useEffect(() => {
    getTrendingData();
  }, []);

  const Tags = [
    {
      name: "Top Collected",
      active: true,
    },
    {
      name: "Top Commented",
      active: false,
    },
    {
      name: "Art",
      active: false,
    },
    {
      name: "Technology",
      active: false,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark_primary }}>
      {/* <ScrollView
        style={{
          height: 60,
          maxHeight: 60,
          paddingVertical: 12,
          paddingHorizontal: 8,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {Tags.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                marginHorizontal: 4,
                backgroundColor: `${item.active ? primary : "transparent"}`,
                width: "auto",
                height: "auto",
                paddingHorizontal: 16,
                paddingVertical: 4,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                borderColor: `${item.active ? primary : "white"}`,
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: "white",
                }}
              >
                {item.name}
              </Text>
            </View>
          );
        })}
      </ScrollView> */}
      <ScrollView>
        <View style={{ marginTop: 10 }}>
          {TrendingItems && TrendingItems.length === 0 ? (
            <View
              style={{
                height: 500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AnimatedLottieView
                autoPlay
                style={{
                  height: "auto",
                }}
                source={require("../assets/loader.json")}
              />
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Heading
                  title="Getting videos"
                  style={{
                    fontSize: 16,
                    color: "white",
                    marginVertical: 5,
                    marginHorizontal: 15,
                    fontWeight: "600",
                    alignSelf: "flex-start",
                  }}
                />
              </View>
            </View>
          ) : (
            <></>
          )}
          {TrendingItems &&
            TrendingItems?.map((item, index) => {
              return (
                <VideoCard
                  key={index}
                  id={item?.id}
                  navigation={navigation}
                  date={convertDate(item?.createdAt)}
                  title={item?.metadata?.name}
                  isFollowdByMe={item?.profile?.isFollowedByMe}
                  banner={item?.metadata?.cover}
                  avatar={item?.profile?.picture?.original?.url}
                  uploadedBy={item?.profile?.handle}
                  profileId={item?.profile?.id}
                  stats={item?.stats}
                  playbackId={item?.metadata?.media[0]?.original?.url}
                  reaction={item?.reaction}
                />
              );
              // }
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Trending;
