import { useNavigation } from "@react-navigation/native";
import Earth from "assets/Icons/Earth";
import PlaylistIcon from "assets/Icons/Playlist";
import Icon from "components/Icon";
import { playlistProps } from "components/Playlist/PlaylistSheet";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import MyVideoCard from "components/common/MyVideoCard";
import { black, primary } from "constants/Colors";
import { RootStackScreenProps } from "customTypes/navigation";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, ScrollView, Text } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { useProfile } from "store/Store";
import getIPFSLink from "utils/getIPFSLink";
import getImageProxyURL from "utils/getImageProxyURL";
import getPlaceHolderImage from "utils/getPlaceHolder";
import getRawurl from "utils/getRawUrl";
import getAllPlaylist from "utils/playlist/getAllPlaylist";

const Playlist = () => {
	const [playlistData, setplaylistData] = useState();
	const { currentProfile } = useProfile();
	const fetchPlaylist = async () => {
		const allPlaylist = await getAllPlaylist(currentProfile?.id);

		console.log("all playlist", allPlaylist[0]);
		setplaylistData(allPlaylist[0]?.playlist);
		console.log("apna ", playlistData);
	};

	useEffect(() => {
		fetchPlaylist();
	}, []);

	const renderItem = ({ item }: { item: playlistProps }) => {
		return (
			<>
				<PlaylistCard playlistId={item.playlistId} profileId={item.profileId} name={item.name} cover={item.cover} />
			</>
		);
	};
	return (
		<View style={{ flex: 1, backgroundColor: black[800] }}>
			<FlatList data={playlistData} renderItem={renderItem} />
		</View>
	);
};

export default React.memo(Playlist);

const PlaylistCard = React.memo(({ name, cover,playlistId }: playlistProps) => {
	const navigation = useNavigation();
	return (
		<Pressable
			android_ripple={{
				color: black[400],
			}}
			style={{
				flexDirection: "row",
				maxWidth: Dimensions.get("window").width,
				padding: 8,
			}}
			onPress={() => {
				navigation.navigate("PlayListScreen",{playlistId:playlistId,playlistTitle:name});
			}}
		>
			<View
				style={{
					width: 140,
					height: 80,
				}}
			>
				<Image
					placeholder={getPlaceHolderImage()}
					contentFit="cover"
					transition={500}
					cachePolicy="memory-disk"
					source={{
						uri: getImageProxyURL({
							formattedLink: getIPFSLink(cover),
						}),
					}}
					style={{
						borderRadius: 4,
						flex: 1,
					}}
				/>
				<View
					style={{
						bottom: 0,
						height: 20,
						width: "100%",
						flex: 1,
						position: "absolute",
						backgroundColor: "#191919",
						opacity: 0.8,
						borderBottomLeftRadius: 4,
						borderBottomRightRadius: 4,
						alignItems: "flex-end",
					}}
				>
					<PlaylistIcon height={20} width={20} style={{ marginRight: 8 }} />
				</View>
			</View>
			<View
				style={{
					height: "100%",
					width: "50%",
					marginLeft: 16,
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<View
					style={{
						width: "80%",
					}}
				>
					<Heading
						title={name}
						style={{ color: "white", fontSize: 16, fontWeight: "600" }}
						numberOfLines={3}
					/>
					{/* <View
						style={{
							marginTop: 2,
						}}
					>
						<StyledText title={"Sahil Kakwani"} style={{ color: "gray", fontSize: 12 }} />
					</View> */}
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginTop: 4,
						}}
					>
						<Earth height={10} width={10} />
						<StyledText
							title={"Public"}
							style={{
								color: "gray",
								fontSize: 12,
								fontWeight: "400",
								marginLeft: 4,
							}}
						/>
					</View>
				</View>
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => {
						// setPublication(publication);
						// sheetRef?.current?.snapToIndex(0);
					}}
					style={{
						padding: 4,
						height: "30%",
					}}
				>
					<Icon name="more" size={16} />
				</TouchableOpacity>
			</View>
		</Pressable>
	);
});
