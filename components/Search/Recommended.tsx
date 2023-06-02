import { FlashList } from "@shopify/flash-list";
import NotFound from "components/common/NotFound";
import Skeleton from "components/common/Skeleton";
import ProfileCard from "components/ProfileCard";
import Heading from "components/UI/Heading";
import ProfileCardSkeleton from "components/UI/ProfileCardSkeleton";
import { useRecommendedProfilesQuery, type Profile } from "customTypes/generated";
import React, { memo, type FC } from "react";
import { View } from "react-native";
import getRawurl from "utils/getRawUrl";
const Recommended: FC = () => {
	const { data, error, loading } = useRecommendedProfilesQuery({
		fetchPolicy: "cache-and-network",
		nextFetchPolicy:"cache-only"
	});

	if (loading) {
		return (
			<Skeleton number={10}>
				<ProfileCardSkeleton />
			</Skeleton>
		);
	}

	const renderItem = ({ item }: { item: Profile }) => {
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
	};

	if (error) return <NotFound message="No Recommanded channels found" />;
	if (data) {
		return (
				<View style={{flex:1}}>
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
						<FlashList
							data={data?.recommendedProfiles as Profile[]}
							keyExtractor={(_, index) => index.toString()}
							removeClippedSubviews={true}
							renderItem={renderItem}
							estimatedItemSize={68}
						/>
				</View>
		);
	}
	return null;
};

export default memo(Recommended);
