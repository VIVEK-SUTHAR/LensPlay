import React from "react";
import { FlatList, View, useWindowDimensions } from "react-native";
import Heading from "../UI/Heading";
import { black, white } from "../../constants/Colors";
import { useProfile } from "../../store/Store";
import StyledText from "../UI/StyledText";
import { Profile } from "../../types/generated";

function UserStatsCard({ title, count }: { title: string; count: string }) {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        height: 130,
        width: "48%",
        marginTop: 16,
        position: "relative",
        backgroundColor: black[700],
        borderRadius: 16,
        padding: 16,
        justifyContent: "space-between",
      }}
    >
      <Heading
        title={title}
        style={{ color: white[300], fontSize: width / 16, fontWeight: "600" }}
      />
      <StyledText
        title={count}
        style={{ color: white[500], fontSize: width / 15, fontWeight: "600" }}
      />
    </View>
  );
}

export default function UserStats({ profile }: { profile: Profile }) {
  const stats = [
    {
      title: "TotalPosts",
      count: profile?.stats?.totalPosts,
    },
    {
      title: "TotalCollects",
      count: profile?.stats?.totalCollects,
    },
    {
      title: "TotalMirrors",
      count: profile?.stats?.totalMirrors,
    },
    {
      title: "TotalPublications",
      count: profile?.stats?.totalPublications,
    },
  ];

  return (
    <View
      style={{
        marginVertical: 24,
      }}
    >
      <Heading
        title={"Stats"}
        style={{
          fontSize: 24,
          fontWeight: "600",
          color: white[500],
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {stats.map((stat) => {
          return (
            <UserStatsCard title={stat.title} count={stat.count.toString()} />
          );
        })}
      </View>
    </View>
  );
}
