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
import ErrorMesasge from "components/common/ErrorMesasge";
import getAllPlaylist from "utils/playlist/getAllPlaylist";
import { useProfile } from "store/Store";
import Logger from "utils/logger";
import Earth from "assets/Icons/Earth";
import { Mirror, Post } from "customTypes/generated";

const PlaylistSheet = ({ sheetRef, publication }: { sheetRef: React.RefObject<BottomSheetMethods>, publication: Post | Mirror | null}) => {
	const NewPlaylistSheetRef = React.useRef<BottomSheetMethods>(null);
	const { currentProfile } = useProfile();
	const [playlist, setPlaylist] = React.useState([]);
	const getPlaylists = async () => {
		const data = await getAllPlaylist(currentProfile?.id);
		if (data.length !== 0) {
			// Logger.Log(data[0], "data");
			setPlaylist(data[0]?.playlist);
		}
	};
	React.useEffect(() => {
		Logger.Success("kkkk");
		getPlaylists();
	}, []);
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
							data={playlist}
							estimatedItemSize={25}
							ListEmptyComponent={NoPlaylist}
							renderItem={({ item }: { item: playlistProps }) => {
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
										<View
											style={{
												gap: 4,
											}}
										>
											<Heading
												title={item?.name}
												style={{
													color: "white",
													fontSize: 18,
													fontWeight: "600",
												}}
											/>
											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
												}}
											>
												<Earth height={12} width={12} />
												<StyledText
													title={"Public"}
													style={{
														color: "gray",
														fontSize: 14,
														fontWeight: "400",
														marginLeft: 4,
													}}
												/>
											</View>
										</View>
									</Pressable>
								);
							}}
						/>
					</BottomSheetScrollView>
				</View>
			</Sheet>
			<NewPlaylistSheet sheetRef={NewPlaylistSheetRef} publication={publication}/>
		</>
	);
};

const NoPlaylist = () => {
	return (
		<View
			style={{
				flex: 1,
				// backgroundColor: "red",
				alignItems: "center",
				justifyContent: "center",
				flexGrow: 1,
				minHeight: 200,
				gap: 10,
			}}
		>
			<Image
				style={{ height: 180, width: 180, resizeMode: "contain" }}
				source={require("../../assets/images/error.png")}
			/>
			<StyledText
				title={"You have not created any playlist yet!"}
				style={{ color: white[300], fontSize: 16, fontWeight: "500" }}
			/>
		</View>
	);
};

export type playlistProps = {
	cover: string;
	name: string;
	profileId: string;
	playlistId:string
};

export default PlaylistSheet;
