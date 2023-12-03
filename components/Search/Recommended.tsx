import { FlashList } from "@shopify/flash-list";
import NotFound from "components/common/NotFound";
import Skeleton from "components/common/Skeleton";
import ProfileCard from "components/ProfileCard";
import Heading from "components/UI/Heading";
import ProfileCardSkeleton from "components/UI/ProfileCardSkeleton";
import {
	HandleInfo,
	LimitType,
	Profile,
	useProfileRecommendationsQuery,
} from "customTypes/generated";
import React, { memo, type FC } from "react";
import { FlatList, View } from "react-native";
import { useProfile } from "store/Store";
import formatHandle from "utils/formatHandle";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";

const ITEM_HEIGHT = 64;

const getItemLayout = (_: any, index: number) => {
	return {
		length: ITEM_HEIGHT,
		offset: ITEM_HEIGHT * index,
		index,
	};
};
const Recommended: FC = () => {
	const { currentProfile } = useProfile();
	const { data, error, loading } = useProfileRecommendationsQuery({
		variables: {
			request: {
				for: currentProfile?.id,
				limit: LimitType.Ten,
				shuffle: true,
			},
		},
		skip: !currentProfile,
		fetchPolicy: "cache-and-network",
		nextFetchPolicy: "cache-only",
	});

	if (loading) {
		return (
			<Skeleton number={10}>
				<ProfileCardSkeleton />
			</Skeleton>
		);
	}

	const renderItem = ({ item, index }: { item: Profile; index: number }) => {
		if (index > 10) return null;
		return (
			<ProfileCard
				key={item?.handle?.ownedBy}
				profileIcon={getIPFSLink(getRawurl(item?.metadata?.picture))}
				profileName={item?.metadata?.displayName ?? ""}
				handle={item.handle?.fullHandle}
				profileId={item?.id}
				owner={item?.handle?.ownedBy}
				isFollowed={item?.operations?.isFollowedByMe?.value}
			/>
		);
	};

	if (error) return <NotFound message="No Recommanded channels found" />;
	const formattedData = data?.profileRecommendations?.items?.slice(0, 10);
	return (
		<View style={{ flex: 1 }}>
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
				data={formattedData as Profile[]}
				keyExtractor={(data, index) => `${data?.id}-${String(index)}`}
				removeClippedSubviews={true}
				renderItem={renderItem}
				getItemLayout={getItemLayout}
				windowSize={3}
			/>
		</View>
	);
};

export default memo(Recommended);
