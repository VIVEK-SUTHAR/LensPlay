import { FlashList } from "@shopify/flash-list";
import AirStackClient from "apollo/airStackClient";
import ErrorMesasge from "components/common/ErrorMesasge";
import Skeleton from "components/common/Skeleton";
import StyledText from "components/UI/StyledText";
import { black, primary } from "constants/Colors";
import {
	TokenBalance,
	TokenBalancesInput,
	TokenBlockchain,
	useUserNfTsQuery,
} from "customTypes/airstackgenerated";
import { RootStackScreenProps } from "customTypes/navigation";
import { Image } from "expo-image";
import React from "react";
import {
	ActivityIndicator,
	Dimensions,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { useProfile } from "store/Store";
import formatAddress from "utils/formatAddress";
import getIPFSLink from "utils/getIPFSLink";
import getPlaceHolderImage from "utils/getPlaceHolder";
import Logger from "utils/logger";

const PickNFT: React.FC<RootStackScreenProps<"PickNFT">> = () => {
	const { currentProfile } = useProfile();

	const nftRequest: TokenBalancesInput = {
		blockchain: TokenBlockchain.Polygon,
		filter: {
			owner: {
				_eq: currentProfile?.handle,
			},
		},
		limit: 8,
	};
	const { data, loading, error, fetchMore } = useUserNfTsQuery({
		client: AirStackClient,
		variables: {
			req: nftRequest,
			
		},
	});

	const pageInfo = data?.TokenBalances?.pageInfo;

	const keyExtractor = (item: TokenBalance) => item.id;

	const _MoreLoader = () => {
		return (
			<>
				{pageInfo?.nextCursor ? (
					<View
						style={{
							height: 100,
							width: Dimensions.get("screen").width,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<ActivityIndicator size={"small"} color={primary} />
					</View>
				) : (
					<ErrorMesasge message="No more NFTs :(" />
				)}
			</>
		);
	};

	const onEndCallBack = React.useCallback(() => {
		if (!pageInfo?.nextCursor) {
			return;
		}
		fetchMore({
			variables: {
				request: {
					...nftRequest,
					cursor: pageInfo?.nextCursor,
				},
			},
		})
			.catch((err) => {})
			.then((res) => {
				Logger.Count("Paginated Result", res);
			});
	}, [pageInfo?.nextCursor]);

	const ListFooter = React.memo(_MoreLoader);

	if (loading) return <Loader />;

	if (error) return <ErrorMesasge message={JSON.stringify(error.message)} withImage={true} />;

	if (data) {
		return (
			<SafeAreaView style={styles.container}>
				<FlashList
					data={data?.TokenBalances?.TokenBalance as TokenBalance[]}
					keyExtractor={keyExtractor}
					renderItem={({ item }) => {
						return <NFTCard nftData={item} />;
					}}
					ListFooterComponent={ListFooter}
					onEndReached={onEndCallBack}
					removeClippedSubviews={true}
					numColumns={2}
					estimatedItemSize={157}
				/>
			</SafeAreaView>
		);
	}
	return null;
};

export default PickNFT;

type NFTCardProps = {
	nftData: TokenBalance;
};
const NFTCard: React.FC<NFTCardProps> = React.memo((nft) => {
	const getOwnerShipSignature = () => {
		try {
			//TO-DO
			//get wallet instance and sign the ownership challenge
			const signature = "";
		} catch (error) {}
	};

	Logger.Warn("URI", nft?.nftData?.tokenNfts?.metaData?.image);

	const memoizedSource=React.useMemo(()=>getIPFSLink(nft?.nftData?.tokenNfts?.metaData?.image!),[])
	return (
		<TouchableOpacity style={styles.nftCard} activeOpacity={0.9}>
			<Image
				source={{
					uri: memoizedSource,
				}}
				style={{
					height: "80%",
					width: "100%",
					borderTopLeftRadius: 8,
					borderTopRightRadius: 8,
				}}
				contentFit="fill"
				cachePolicy="memory-disk"
				transition={500}
				placeholder={getPlaceHolderImage()}
			/>
			<StyledText
				title={formatAddress(nft?.nftData?.tokenAddress)}
				style={{ fontSize: 16, color: "white", padding: 8 }}
			/>
		</TouchableOpacity>
	);
});

const Loader = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Skeleton number={10}>
				<View style={styles.nftCardLoader}></View>
			</Skeleton>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: black[800],
	},
	nftCard: {
		width: "90%",
		borderRadius: 8,
		height: 180,
		margin: 12,
	},
	nftCardLoader: {
		borderRadius: 8,
		margin: 16,
		height: 220,
		backgroundColor: black[300],
	},
});
