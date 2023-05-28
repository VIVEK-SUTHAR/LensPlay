import NotFound from "components/common/NotFound";
import Skeleton from "components/common/Skeleton";
import ProfileCard from "components/ProfileCard";
import Heading from "components/UI/Heading";
import ProfileCardSkeleton from "components/UI/ProfileCardSkeleton";
import { type Profile, useRecommendedProfilesQuery } from "customTypes/generated";
import React, { type FC } from "react";
import { FlatList, View } from "react-native";
import CommonStyles from "styles/index";
import getRawurl from "utils/getRawUrl";
const Recommended: FC = () => {
	const { data, error, loading } = useRecommendedProfilesQuery();

	if (loading) {
		return (
			<Skeleton number={10}>
				<ProfileCardSkeleton />
			</Skeleton>
		);
	}
	if (error) return <NotFound message="No Recommanded channels found" />;
	if (data) {
		return (
			<View style={CommonStyles.px_2}>
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
		);
	}
	return null;
};

export default Recommended;
