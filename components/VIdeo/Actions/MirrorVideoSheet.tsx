import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Sheet from "components/Bottom";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { black, white } from "constants/Colors";
import {
	useActivePublication,
	useAuthStore,
	useProfile,
	useReactionStore,
	useThemeStore,
	useToast,
} from "store/Store";
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
import {
	useCreateDataAvailabilityMirrorViaDispatcherMutation,
	useCreateMirrorViaDispatcherMutation,
} from "customTypes/generated";
import Logger from "utils/logger";
import { LENSPLAY_SITE } from "constants/index";
import TrackAction from "utils/Track";
import { PUBLICATION } from "constants/tracking";
import { ApolloCache } from "@apollo/client";

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

	const updateCache = (cache: ApolloCache<any>) => {
		try {
			cache.modify({
				id: cache.identify(activePublication as any),
				fields: {
					mirrors: (mirrors) => [...mirrors, currentProfile?.id],
					stats: (stats) => ({
						...stats,
						totalAmountOfMirrors: stats.totalAmountOfMirrors + 1,
					}),
				},
			});
		} catch (error) {
			Logger.Error("error", error);
		}
	};

	const [createOnChainMirror] = useCreateMirrorViaDispatcherMutation({
		onCompleted: (data) => {
			Logger.Success("Mirrored", data);
		},
		onError: (err) => {
			Logger.Error("Error in Mirror", err);
			toast.show(err.message, ToastType.ERROR, true);
		},
		update: (cache) => updateCache(cache),
	});

	const [createDataAvaibalityMirror] = useCreateDataAvailabilityMirrorViaDispatcherMutation({
		onCompleted: (data) => {
			Logger.Success("DA Mirrored", data);
		},
		onError: (err) => {
			Logger.Error("Error in DA Mirror", err);
			toast.show(err.message, ToastType.ERROR, true);
		},
		update: (cache) => updateCache(cache),
	});

	const onMirror = async () => {
		if (mirrorStats?.isMirrored) {
			toast.show("Already mirrored", ToastType.ERROR, true);
			mirrorRef.current?.close();
			return;
		}
		if (!activePublication?.profile?.dispatcher?.canUseRelay) {
			toast.show("Dispatcher is disabled", ToastType.ERROR, true);
			mirrorRef.current?.close();
			return;
		}
		if (isDAPublication) {
			toast.success("Mirror submitted");
			setMirrorStats(true, mirrorStats.mirrorCount + 1);
			mirrorRef.current?.close();
			createDataAvaibalityMirror({
				variables: {
					request: {
						from: currentProfile?.id,
						mirror: activePublication?.id,
					},
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
						"origin": LENSPLAY_SITE,
					},
				},
			});
			return;
		}
		try {
			toast.success("Mirror submitted!");
			setMirrorStats(true, mirrorStats.mirrorCount + 1);
			mirrorRef.current?.close();
			await createOnChainMirror({
				variables: {
					request: {
						profileId: currentProfile?.id,
						publicationId: activePublication?.id,
					},
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
						"origin": LENSPLAY_SITE,
					},
				},
			});
			TrackAction(PUBLICATION.MIRROR);
		} catch (error) {
			if (error instanceof Error) {
				toast.show(error.message, ToastType.ERROR, true);
				mirrorRef?.current?.close();
			}
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
							title={mirrorStats?.isMirrored ? "Video already mirrored" : `Mirror Video`}
							py={12}
							textStyle={{
								fontSize: 20,
								fontWeight: "600",
								textAlign: "center",
							}}
							bg={mirrorStats?.isMirrored ? "#c0c0c0" : theme.PRIMARY}
							onPress={() => {
								onMirror();
							}}
						/>
					</View>
				</BottomSheetScrollView>
			</View>
		</Sheet>
	);
};

export default MirrorVideoSheet;
