import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { black, white } from "../../constants/Colors";
import CommonStyles from "../../styles";
import { Profile } from "../../types/generated";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import Icon, { IconName } from "../Icon";
import formatInteraction from "../../utils/formatInteraction";

const { width } = Dimensions.get("screen");

type UserStatsCardProps = {
  title: string;
  count: string | number;
  icon: IconName;
  iconColor: string;
  iconSize: number;
};

const UserStatsCard: React.FC<UserStatsCardProps> = React.memo(
  ({ count, title, icon, iconColor, iconSize }) => {
    return (
      <View style={styles.cardContainer}>
        <Icon name={icon} color={iconColor} size={iconSize} />
        <View>
          <StyledText
            title={formatInteraction(count as number)}
            style={styles.cardSubTitle}
          />
          <Heading title={title} style={styles.cardTitle} />
        </View>
      </View>
    );
  }
);

export default function UserStats({ profile }: { profile: Profile }) {
  const stats: UserStatsCardProps[] = [
    {
      title: "TotalPosts",
      count: profile?.stats?.totalPosts || 0,
      icon: "image",
      iconColor: "#F97B22",
      iconSize: 24,
    },
    {
      title: "TotalCollects",
      count: profile?.stats?.totalCollects || 0,
      icon: "collect",
      iconColor: "#D4ADFC",
      iconSize: 28,
    },
    {
      title: "TotalMirrors",
      count: profile?.stats?.totalMirrors || 0,
      icon: "mirror",
      iconColor: "#6bd841",
      iconSize: 28,
    },
    {
      title: "TotalPublications",
      count: profile?.stats?.totalPublications || 0,
      icon: "images",
      iconColor: "#FF55BB",
      iconSize: 24,
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
              icon={stat.icon}
              iconColor={stat.iconColor}
              iconSize={stat.iconSize}
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
