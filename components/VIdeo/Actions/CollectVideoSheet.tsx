import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Sheet from "components/Bottom";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import {
	useActivePublication,
	useAuthStore,
	useReactionStore,
	useThemeStore,
	useToast,
} from "store/Store";
import { black, white } from "constants/Colors";
import Heading from "components/UI/Heading";
import Icon from "components/Icon";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import LPImage from "components/UI/LPImage";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import StyledText from "components/UI/StyledText";
import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";
import { ToastType } from "customTypes/Store";
import { useProxyActionMutation } from "customTypes/generated";
import TrackAction from "utils/Track";
import { PUBLICATION } from "constants/tracking";
import { LENSPLAY_SITE } from "constants/index";
import Logger from "utils/logger";

type CollectVideoSheetProps = {
	sheetRef: React.RefObject<BottomSheetMethods>;
};
const CollectVideoSheet: React.FC<CollectVideoSheetProps> = ({ sheetRef: collectRef }) => {
	const { activePublication } = useActivePublication();

	const { collectStats, setCollectStats } = useReactionStore();
	const theme = useThemeStore();
	const toast = useToast();
	const { accessToken } = useAuthStore();
	const [createProcyAction] = useProxyActionMutation({
		onCompleted: (data) => {
			toast.show("Collect Submitted", ToastType.SUCCESS, true);
			setCollectStats(true, collectStats?.collectCount + 1);
			collectRef?.current?.close();
			TrackAction(PUBLICATION.COLLECT_VIDEO);
		},
		onError: (error) => {
			if (error.message == "Can only collect if the publication has a `FreeCollectModule` set") {
				toast.show("You can't collect this video", ToastType.ERROR, true);
			} else {
				toast.show("Something went wrong", ToastType.ERROR, true);
			}

			collectRef?.current?.close();
		},
	});
	const collectPublication = async () => {
		try {
			if (collectStats?.isCollected) {
				toast.show("You have already collected the video", ToastType.ERROR, true);
				return;
			}
			if (!activePublication?.profile?.dispatcher?.canUseRelay) {
				toast.show("Dispatcher is disabled", ToastType.ERROR, true);
				return;
			}
			await createProcyAction({
				variables: {
					request: {
						collect: {
							freeCollect: {
								publicationId: activePublication?.id,
							},
						},
					},
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
						"origin": LENSPLAY_SITE,
					},
				},
			});
		} catch (error) {
			if (error instanceof Error) {
				Logger.Error(error + "");
			}
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
							title={collectStats?.isCollected ? "Video already collected" : `Collect Video`}
							py={12}
							textStyle={{
								fontSize: 20,
								fontWeight: "600",
								textAlign: "center",
							}}
							bg={collectStats?.isCollected ? "#c0c0c0" : theme.PRIMARY}
							onPress={() => {
								collectPublication();
							}}
						/>
					</View>
				</BottomSheetScrollView>
			</View>
		</Sheet>
	);
};

export default CollectVideoSheet;

const styles = StyleSheet.create({});
