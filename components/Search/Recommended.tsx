import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Profile, useRecommendedProfilesQuery } from "../../types/generated";
import getRawurl from "../../utils/getRawUrl";
import Skeleton from "../common/Skeleton";
import NotFound from "../Profile/NotFound";
import ProfileCard from "../ProfileCard";
import Heading from "../UI/Heading";
import ProfileCardSkeleton from "../UI/ProfileCardSkeleton";

const Recommended = () => {
  const { data, error, loading } = useRecommendedProfilesQuery();

  if (loading) {
    return <Skeleton children={<ProfileCardSkeleton />} number={10} />;
  }
  if (error) return <NotFound />;
  if (data) {
    return (
      <View style={{ marginBottom: 16 }}>
        <Heading
          title={"Recommended Channels"}
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "600",
            marginHorizontal: 16,
          }}
        />
        <FlatList
          data={data?.recommendedProfiles as Profile[]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <ProfileCard
                profileIcon={getRawurl(item?.picture)}
                profileName={item?.name || item?.id}
                profileId={item?.id}
                isFollowed={item?.isFollowedByMe || false}
                handle={item?.handle}
                owner={item?.ownedBy}
              />
            );
          }}
        />
      </View>
    );
  }
  return <></>;
};

export default Recommended;

const styles = StyleSheet.create({});
