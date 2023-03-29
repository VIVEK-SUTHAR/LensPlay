import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Profile, useRecommendedProfilesQuery } from "../../types/generated";
import getRawurl from "../../utils/getRawUrl";
import Skeleton from "../common/Skeleton";
import NotFound from "../Profile/NotFound";
import ProfileCard from "../ProfileCard";
import Heading from "../UI/Heading";
import ProfileCardSkeleton from "../UI/ProfileCardSkeleton";
import StyledText from "../UI/StyledText";

const Recommended = () => {
  const { data, error, loading } = useRecommendedProfilesQuery();

  if (loading) {
    return <Skeleton children={<ProfileCardSkeleton />} number={10} />;
  }
  if (error) return <NotFound />;
  if (data) {
    return (
      <>
        <StyledText
          title={"No channel found"}
          style={{
            color: "gray",
            fontSize: 12,
            fontWeight: "600",
            marginTop: 24,
            textAlign: "center",
          }}
        />
        <View style={{ paddingVertical: 24 }}>
          <Heading
            title={"Recommended Channels"}
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "600",
              marginHorizontal: 12,
              marginVertical: 8,
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
      </>
    );
  }
  return <></>;
};

export default Recommended;

const styles = StyleSheet.create({});
