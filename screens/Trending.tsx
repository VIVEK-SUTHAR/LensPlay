import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import * as React from "react";
import { useState } from "react";
import VideoCard from "../components/VideoCard";
import { client } from "../apollo/client";
import getTrendingPublication from "../apollo/Queries/getTrendingPublication";
import { useEffect } from "react";
import { dark_primary, primary } from "../constants/Colors";
import convertDate from "../utils/formateDate";
import AnimatedLottieView from "lottie-react-native";
import Heading from "../components/UI/Heading";
import useStore from "../store/Store";

type TrendingPageProps = {
  navigation: any;
};

const Trending = ({ navigation }: TrendingPageProps) => {
  const [TrendingItems, setTrendingItems] = useState([]);
  const [tags, setTags] = useState([
    {
      name: "Top Collected",
      active: true,
    },
    {
      name: "Top Commented",
      active: false,
    },
    {
      name: "Latest",
      active: false,
    },
    {
      name: "Curated",
      active: false,
    },
    {
      name: "Technology",
      active: false,
    },
  ]);
  const [currentTag, setCurrentTag] = useState(tags[0]);
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
    setTrendingItems(trendingData.data.explorePublications.items);
  }
  useEffect(() => {
    getTrendingData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView
        style={{
          height: 60,
          paddingVertical: 8,
          maxHeight: 60,
          paddingStart: 2,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {tags.map((item, index) => {
          return (
            <Pressable
              android_ripple={{
                color: primary,
                radius: 25,
              }}

              onTouchEndCapture={() => {
                setCurrentTag(tags[index]);
              }}
              key={index}
              style={{
                marginHorizontal: 4,
                backgroundColor: `${
                  currentTag.name === item.name ? primary : "transparent"
                }`,
                width: "auto",
                height: "auto",
                paddingHorizontal: 12,
                paddingVertical: 6,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                borderColor: `${
                  currentTag.name === item.name ? primary : "white"
                }`,
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: "white",
                }}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <ScrollView>
        <View>
          {TrendingItems && TrendingItems.length === 0 ? (
            <Pressable
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
            </Pressable>
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
