import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import Input from "components/UI/Input";
import { black, dark_primary, dark_secondary, primary, white } from "constants/Colors";
import { Mirror, Post } from "customTypes/generated";
import React, { useRef } from "react";
import { Platform, Pressable, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useProfile, useToast } from "store/Store";
import Logger from "utils/logger";
import createPlaylist from "utils/playlist/createPlaylist";

const NewPlaylistSheet = ({ sheetRef, publication }: { sheetRef: React.RefObject<BottomSheetMethods>, publication: Post | Mirror | null }) => {
    const [name, setName] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState(false);
    const {currentProfile} = useProfile();
    const toast = useToast();

    const create = async(publication: Post | Mirror | null) => {
        setIsLoading(true);
        const playlistId = await createPlaylist(currentProfile?.id, name, publication?.metadata?.cover?.original?.url);
        setIsLoading(false);
        toast.success('Playlist created successfully');
        sheetRef?.current?.close();
        Logger.Log(playlistId);
    }

	return (
		<Sheet
			ref={sheetRef}
			snapPoints={[230]}
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
						title={"New Playlist"}
						style={{
							fontSize: 20,
							color: white[800],
							fontWeight: "600",
						}}
					/>
				</View>
				<View
					style={{
						borderBottomColor: black[300],
						borderBottomWidth: 1.5,
						marginTop: 4,
					}}
				/>
				<BottomSheetScrollView>
					<View style={{
                        padding: 12,
                    }}>
						<TextInput
							placeholder="Playlist Name"
							value={name}
							placeholderTextColor={white[200]}
							selectionColor={primary}
							style={{
								backgroundColor: black[400],
								color: "white",
								paddingHorizontal: 16,
								paddingVertical: Platform.OS === "ios" ? 16 : 8,
								borderRadius: 8,
								flex: 1,
								marginBottom: 8,
                                // borderColor: white[300],
                                // borderWidth: 2
							}}
							keyboardType="default"
							onChange={(e) => {
								e.preventDefault();
                                setName(e.nativeEvent.text);
							}}
						/>
                        <Button
						onPress={async () => {
                            await create(publication);
						}}
						mt={16}
						title="Create"
						bg={"#f5f5f5"}
						textStyle={{
							fontWeight: "600",
							fontSize: 16,
							color: "black",
						}}
                        isLoading={isLoading}
						py={12}
						borderRadius={8}
					/>
					</View>
				</BottomSheetScrollView>
			</View>
		</Sheet>
	);
};

export default NewPlaylistSheet;
