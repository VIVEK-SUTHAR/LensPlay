import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import LPImage from "components/UI/LPImage";
import StyledText from "components/UI/StyledText";
import { black, white } from "constants/Colors";
import { ToastType } from "customTypes/Store";
import useCollect from "hooks/reactions/useCollect";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useCollectStore } from "store/ReactionStore";
import { useActivePublication, useThemeStore, useToast } from "store/Store";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";

type CollectVideoSheetProps = {
	sheetRef: React.RefObject<BottomSheetMethods>;
};

const CollectVideoSheet: React.FC<CollectVideoSheetProps> = ({ sheetRef: collectRef }) => {
	const { activePublication } = useActivePublication();
	const theme = useThemeStore();
	const toast = useToast();
	const { collectPublication } = useCollect();
	const { collectCount, isCollected, setCollectCount, setIsCollected } = useCollectStore();

	const handleCollect = async () => {
		try {
			if (isCollected) {
				toast.show("You have already collected the video", ToastType.ERROR, true);
				return;
			}
			if (!activePublication?.profile?.dispatcher?.canUseRelay) {
				toast.show("Dispatcher is disabled", ToastType.ERROR, true);
				return;
			}
			setIsCollected(true);
			setCollectCount(collectCount + 1);
			collectPublication(activePublication);
		} catch (error) {
			Logger.Error(error + "");
		} finally {
			collectRef?.current?.close();
		}
	};

	return (
		<Sheet
			ref={collectRef}
			index={-1}
			enablePanDownToClose={true}
			backgroundStyle={{
				backgroundColor: black[600],
			}}
			snapPoints={[580]}
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
						paddingHorizontal: 16,
						paddingVertical: 8,
					}}
				>
					<Heading
						title={"Collect video"}
						style={{
							fontSize: 20,
							color: white[800],
							fontWeight: "500",
						}}
					/>
					<Pressable
						onPress={() => {
							collectRef?.current?.close();
						}}
					>
						<Icon name="close" size={16} />
					</Pressable>
				</View>
				<View
					style={{
						borderBottomColor: black[300],
						borderBottomWidth: 1.5,
						marginTop: 8,
					}}
				/>
				<BottomSheetScrollView
					style={{
						flex: 1,
						paddingHorizontal: 16,
					}}
				>
					<View
						style={{
							marginTop: 20,
						}}
					>
						<LPImage
							source={{
								uri: getIPFSLink(getRawurl(activePublication?.metadata?.cover)),
							}}
							style={{
								height: 200,
								borderRadius: 8,
								width: "100%",
							}}
						/>

						<StyledText
							title={activePublication?.metadata?.name}
							style={{
								fontSize: 20,
								color: white[800],
								fontWeight: "600",
								marginTop: 16,
							}}
							numberOfLines={2}
						/>
					</View>
					<View
						style={{
							marginTop: 16,
						}}
					>
						<Heading
							title={"Posted by"}
							style={{
								fontSize: 16,
								color: white[100],
								fontWeight: "600",
							}}
						/>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginTop: 8,
							}}
						>
							<Avatar src={getRawurl(activePublication?.profile?.picture)} height={40} width={40} />
							<View
								style={{
									marginHorizontal: 8,
									maxWidth: "100%",
								}}
							>
								<Heading
									title={activePublication?.profile?.name}
									numberOfLines={1}
									style={{
										color: "white",
										fontSize: 16,
										fontWeight: "500",
									}}
								/>
								<StyledText
									title={activePublication?.profile?.handle}
									style={{
										color: "gray",
										fontSize: 12,
										fontWeight: "500",
									}}
								/>
							</View>
						</View>
					</View>
					<View
						style={{
							marginVertical: 24,
						}}
					>
						<Button
							title={isCollected ? "Collected" : `Collect Video`}
							py={12}
							textStyle={{
								fontSize: 20,
								fontWeight: "600",
								textAlign: "center",
							}}
							bg={isCollected ? "#c0c0c0" : theme.PRIMARY}
							onPress={handleCollect}
						/>
					</View>
				</BottomSheetScrollView>
			</View>
		</Sheet>
	);
};

export default CollectVideoSheet;

const styles = StyleSheet.create({});
