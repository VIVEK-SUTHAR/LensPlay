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

type TrendingPageProps = {
  navigation: any;
};

const Trending = ({ navigation }: TrendingPageProps) => {
  const [TrendingItems, setTrendingItems] = useState([]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "LensPlay",
      headerStyle: { backgroundColor: dark_secondary, elevation: 0 },
      headerRight: () => (
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather name="search" size={24} color="white" />
        </View>
      ),
      headerLeft: () => (
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "600", color: "white" }}>
            LensPlay
          </Text>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              width: "auto",
              height: 20,
              marginHorizontal: 5,
              paddingHorizontal: 5,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.6)",
            }}
          >
            <Text style={{ color: primary, fontSize: 12 }}>Beta</Text>
          </View>
        </View>
      ),
    });
  }, []);
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
      name: "Top Liked",
      active: true,
    },
    {
      name: "Top Commented",
      active: false,
    },
    {
      name: "Top Collected",
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
      <ScrollView
        style={{
          height: 36,
          maxHeight: 36,
          paddingVertical: 2,
          paddingHorizontal: 8
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
                backgroundColor: `${item.active ? primary : "rgba(255,255,255,0.1)"}`,
                width: "auto",
                height: "auto",
                paddingHorizontal: 16,
                paddingVertical: 4,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                borderColor: primary,
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
      </ScrollView>
      <ScrollView>
        <View style={{ marginTop: 10 }}>
          {TrendingItems && TrendingItems.length === 0 ? (
            <View style={{ height: "50%", alignItems: "center" }}>
              <Image source={require("../assets/images/no.png")} />
              <Text
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                No Videos found
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "400",
                  color: "grey",
                }}
              >
                Try again later
              </Text>
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
