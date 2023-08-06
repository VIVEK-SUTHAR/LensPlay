import { FlashList } from "@shopify/flash-list";
import { black } from "constants/Colors";
import { RootStackScreenProps } from "customTypes/navigation";
import { Image } from "expo-image";
import useUserNFTLazyQuery from "hooks/useUserNFTs";
import React from "react";
import { InteractionManager, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import getIPFSLink from "utils/getIPFSLink";
import Logger from "utils/logger";

const PickNFT: React.FC<RootStackScreenProps<"PickNFT">> = () => {
	const { fetchUserNFTs, data, error, loading } = useUserNFTLazyQuery();

	React.useEffect(() => {
		InteractionManager.runAfterInteractions(() => {
			Logger.Log("Interactions Done");
			fetchUserNFTs();
		});
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			{loading && data ? (
				<View></View>
			) : (
				<View>
					<FlashList
						data={data}
						renderItem={({ item }) => {
							return <NFTCard imageUri="" contractAddress="" tokenId={78} />;
						}}
						estimatedItemSize={160}
						numColumns={2}
					/>
				</View>
			)}
		</SafeAreaView>
	);
};

export default PickNFT;

type NFTCardProps = {
	imageUri: string;
	tokenId: number;
	contractAddress: string;
};
const NFTCard: React.FC<NFTCardProps> = React.memo((nft) => {
	const getOwnerShipSignature = () => {
		Logger.Success("NFT Details", nft);
		try {
			//TO-DO
			//get wallet instance and sign the ownership challenge
			const signature = "";
		} catch (error) {}
	};

	return (
		<TouchableOpacity style={styles.nftCard}>
			<Image
				source={{
					uri: getIPFSLink(nft.imageUri),
				}}
				cachePolicy="memory-disk"
				transition={500}
			/>
		</TouchableOpacity>
	);
});
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: black[800],
	},
	nftCard: {
		width: "40%",
		height: 150,
	},
	nftCardLoader: {
		width: "40%",
		height: 150,
		backgroundColor: black[400],
	},
});
