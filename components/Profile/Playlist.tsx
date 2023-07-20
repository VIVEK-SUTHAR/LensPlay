import Earth from "assets/Icons/Earth";
import PlaylistIcon from "assets/Icons/Playlist";
import Icon from "components/Icon";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black, primary } from "constants/Colors";
import { Image } from "expo-image";
import React from "react";
import { Dimensions, Pressable, Text } from "react-native";
import { TouchableOpacity, View } from "react-native";
import getIPFSLink from "utils/getIPFSLink";
import getImageProxyURL from "utils/getImageProxyURL";
import getPlaceHolderImage from "utils/getPlaceHolder";
import getRawurl from "utils/getRawUrl";

const Playlist = () => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "black",
				paddingVertical: 8,
			}}
		>
			<PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
		</View>
	);
};

export default Playlist;

const PlaylistCard = () => {
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
				// setActivePublication(publication);
				// navigation.navigate("VideoPage");
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
							formattedLink: getIPFSLink(
								"https://ik.imagekit.io/lens/media-snapshot/e08e47d23df9fcb15162d4d18adca13c2958a9b153fbf27487c60c4a7c38b052.jpg"
							),
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
						backgroundColor: "gray",
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
						title={"Playlist Name"}
						style={{ color: "white", fontSize: 16, fontWeight: "600" }}
						numberOfLines={3}
					/>
                    <View
						style={{
							marginTop: 2,
						}}
					>
						<StyledText
							title={'Sahil Kakwani'}
							style={{ color: "gray", fontSize: 12 }}
						/>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
                            marginTop: 4
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
};
