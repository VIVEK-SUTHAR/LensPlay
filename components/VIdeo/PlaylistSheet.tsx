import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { FlashList } from "@shopify/flash-list";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black, dark_primary, dark_secondary, primary, white } from "constants/Colors";
import { Image } from "expo-image";
import React from "react";
import { Dimensions, Pressable, View } from "react-native";
import getIPFSLink from "utils/getIPFSLink";
import getImageProxyURL from "utils/getImageProxyURL";
import getPlaceHolderImage from "utils/getPlaceHolder";
import NewPlaylistSheet from "./NewPlaylistSheet";

const PlaylistSheet = ({ sheetRef }: { sheetRef: React.RefObject<BottomSheetMethods> }) => {
	const NewPlaylistSheetRef = React.useRef<BottomSheetMethods>(null);
	const Playlist = [
		{
			name: "Music",
			cover:
				"https://ik.imagekit.io/lens/media-snapshot/e08e47d23df9fcb15162d4d18adca13c2958a9b153fbf27487c60c4a7c38b052.jpg",
			videoCount: 10,
		},
		{
			name: "Video",
			cover:
				"https://ik.imagekit.io/lens/media-snapshot/214a2225ed102ece199a5f6f0181fe5002b0f0a2edc284b13f85eb0d8d31cc51.jpg",
			videoCount: 4,
		},
		{
			name: "Romance",
			cover:
				"https://ik.imagekit.io/lens/media-snapshot/e08e47d23df9fcb15162d4d18adca13c2958a9b153fbf27487c60c4a7c38b052.jpg",
			videoCount: 2,
		},
	];
	return (
		<>
			<Sheet
				ref={sheetRef}
				snapPoints={[350]}
				enablePanDownToClose={true}
				enableOverDrag={true}
				bottomInset={32}
				style={{
					marginHorizontal: 8,
				}}
				backgroundStyle={{
					backgroundColor: black[600],
				}}
				detached={true}
			>
				<View
					style={{
						flex: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							paddingHorizontal: 18,
							paddingVertical: 8,
						}}
					>
						<Heading
							title={"Playlists"}
							style={{
								fontSize: 20,
								color: white[800],
								fontWeight: "600",
							}}
						/>
						<Pressable
							onPress={() => {
								NewPlaylistSheetRef?.current?.snapToIndex(0);
                                sheetRef.current?.close();
							}}
						>
							<StyledText
								title={"Create new"}
								style={{
									color: primary,
									fontSize: 16,
									fontWeight: "500",
								}}
							/>
						</Pressable>
					</View>
					<View
						style={{
							borderBottomColor: black[300],
							borderBottomWidth: 1.5,
							marginTop: 4,
						}}
					/>
					<BottomSheetScrollView style={{ flex: 1 }}>
						<FlashList
							data={Playlist}
							renderItem={({ item }) => {
								return (
									<Pressable
										android_ripple={{
											color: black[400],
										}}
										style={{
											flexDirection: "row",
											maxWidth: Dimensions.get("window").width,
											alignItems: "flex-start",
											padding: 8,
											paddingHorizontal: 18,
											marginTop: 8,
											gap: 16,
										}}
										onPress={() => {
											// setActivePublication(publication);
											// navigation.navigate("VideoPage");
										}}
									>
										<Image
											placeholder={getPlaceHolderImage()}
											contentFit="cover"
											transition={500}
											cachePolicy="memory-disk"
											source={{
												uri: getImageProxyURL({
													formattedLink: getIPFSLink(item?.cover),
												}),
											}}
											style={{
												width: 80,
												height: 60,
												borderRadius: 8,
											}}
										/>
										<View>
											<Heading
												title={item?.name}
												style={{
													color: "white",
													fontSize: 18,
													fontWeight: "600",
												}}
											/>
											<StyledText
												title={`${item.videoCount} Videos`}
												style={{
													color: "gray",
													fontSize: 14,
													fontWeight: "400",
												}}
											/>
										</View>
									</Pressable>
								);
							}}
						/>
					</BottomSheetScrollView>
				</View>
			</Sheet>
			<NewPlaylistSheet sheetRef={NewPlaylistSheetRef} />
		</>
	);
};

export default PlaylistSheet;
