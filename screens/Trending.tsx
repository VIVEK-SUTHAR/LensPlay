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
import { dark_primary, dark_secondary, primary } from "../constants/Colors";
import { Feather } from "@expo/vector-icons";
import convertDate from "../utils/formateDate";
import AnimatedLottieView from "lottie-react-native";

type TrendingPageProps = {
  navigation: any;
};

const Trending = ({ navigation }: TrendingPageProps) => {
  const [TrendingItems, setTrendingItems] = useState([]);

  async function getTrendingData() {
    const trendingData = await client.query({
      query: getTrendingPublication,
    });
    setTrendingItems(trendingData.data.explorePublications.items);
    console.log(TrendingItems);
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
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    marginVertical: 5,
                    marginHorizontal: 15,
                    fontWeight: "600",
                    alignSelf: "flex-start",
                  }}
                >
                  Getting videos
                </Text>
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
                  banner={item?.metadata?.cover}
                  avatar={item?.profile?.picture?.original?.url}
                  uploadedBy={item?.profile?.handle}
                  playbackId={item?.metadata?.media[0]?.original?.url}
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

const styles = StyleSheet.create({});
