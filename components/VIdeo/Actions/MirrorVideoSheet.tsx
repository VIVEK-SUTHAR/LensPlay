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
import { PUBLICATION } from "constants/tracking";
import { ToastType } from "customTypes/Store";
import useMirror from "hooks/reactions/useMirror";
import React from "react";
import { Pressable, View } from "react-native";
import { useMirrorStore } from "store/ReactionStore";
import {
	useActivePublication,
	useAuthStore,
	useProfile,
	useReactionStore,
	useThemeStore,
	useToast,
} from "store/Store";
import TrackAction from "utils/Track";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";

type MirrorVideoSheetProps = {
	sheetRef: React.RefObject<BottomSheetMethods>;
};

const MirrorVideoSheet: React.FC<MirrorVideoSheetProps> = ({ sheetRef: mirrorRef }) => {
	const { activePublication } = useActivePublication();
	const { accessToken } = useAuthStore();
	const { mirrorStats, setMirrorStats } = useReactionStore();

	const isDAPublication = activePublication?.isDataAvailability;
	const toast = useToast();
	const theme = useThemeStore();
	const { currentProfile } = useProfile();
	const { mirrorPublication } = useMirror();
	const { isMirrored, mirrorCount, setIsMirrored, setMirrorCount } = useMirrorStore();

	const handleMirror = async () => {
		if (isMirrored) return;
		if (!activePublication?.profile?.dispatcher?.canUseRelay) {
			toast.show("Dispatcher is disabled", ToastType.ERROR, true);
			mirrorRef.current?.close();
			return;
		}
		try {
			setIsMirrored(true);
			setMirrorCount(mirrorCount + 1);
			mirrorRef.current?.close();
			await mirrorPublication(activePublication);
			TrackAction(PUBLICATION.MIRROR);
		} catch (error) {
			Logger.Error("", error);
		} finally {
			mirrorRef?.current?.close();
		}
	};

	return (
		<Sheet
			ref={mirrorRef}
			index={-1}
			enablePanDownToClose={true}
			backgroundStyle={{
				backgroundColor: black[600],
			}}
			snapPoints={[550]}
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
						title={"Mirror video"}
						style={{
							fontSize: 20,
							color: white[800],
							fontWeight: "500",
						}}
					/>
					<Pressable
						onPress={() => {
							mirrorRef?.current?.close();
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
							marginVertical: 20,
						}}
					>
						<Button
							title={isMirrored ? "Mirrored" : `Mirror Video`}
							py={12}
							textStyle={{
								fontSize: 20,
								fontWeight: "600",
								textAlign: "center",
							}}
							bg={isMirrored ? "#c0c0c0" : theme.PRIMARY}
							onPress={handleMirror}
						/>
					</View>
				</BottomSheetScrollView>
			</View>
		</Sheet>
	);
};

export default MirrorVideoSheet;
