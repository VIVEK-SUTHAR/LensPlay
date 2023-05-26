import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { black, white } from "../../constants/Colors";
import CommonStyles from "../../styles";
import { Profile } from "../../types/generated";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";

const { width } = Dimensions.get("screen");

type UserStatsCardProps = {
  title: string;
  count: string;
};

const UserStatsCard: React.FC<UserStatsCardProps> = React.memo(
  ({ count, title }) => {
    return (
      <View style={styles.cardContainer}>
        <Heading title={title} style={styles.cardTitle} />
        <StyledText title={count} style={styles.cardSubTitle} />
      </View>
    );
  }
);

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
    <View style={CommonStyles.my_24}>
      <Heading title={"Stats"} style={styles.statsTitle} />
      <View style={styles.statsWrapper}>
        {stats.map((stat, index) => {
          return (
            <UserStatsCard
              key={index}
              title={stat.title}
              count={stat?.count?.toString()}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 130,
    width: "48%",
    marginTop: 16,
    position: "relative",
    backgroundColor: black[700],
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-between",
  },
  cardTitle: {
    color: white[300],
    fontSize: width / 16,
    fontWeight: "600",
  },
  cardSubTitle: {
    color: white[500],
    fontSize: width / 15,
    fontWeight: "600",
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: white[500],
  },
  statsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
