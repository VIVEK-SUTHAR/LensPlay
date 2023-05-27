import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { black, white } from "../../constants/Colors";
import CommonStyles from "../../styles";
import { Profile } from "../../types/generated";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import Icon from "../Icon";

const { width } = Dimensions.get("screen");

type UserStatsCardProps = {
  title: string;
  count: string;
};

const UserStatsCard: React.FC<UserStatsCardProps> = React.memo(
  ({ count, title }) => {
    return (
      <View style={styles.cardContainer}>
        <Icon name="bug" />
        <View>
          <StyledText title={count} style={styles.cardSubTitle} />
          <Heading title={title} style={styles.cardTitle} />
        </View>
      </View>
    );
  }
);

export default function UserStats({ profile }: { profile: Profile }) {
  const stats = [
    {
      title: "TotalPosts",
      count: profile?.stats?.totalPosts || 0,
    },
    {
      title: "TotalCollects",
      count: profile?.stats?.totalCollects || 0,
    },
    {
      title: "TotalMirrors",
      count: profile?.stats?.totalMirrors || 0,
    },
    {
      title: "TotalPublications",
      count: profile?.stats?.totalPublications || 0,
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
    fontSize: width / 20,
    fontWeight: "500",
  },
  cardSubTitle: {
    color: white[500],
    fontSize: width / 12,
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
