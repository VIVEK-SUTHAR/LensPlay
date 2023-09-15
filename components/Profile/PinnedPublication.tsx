import { useNavigation } from "@react-navigation/native";
import Sheet from "components/Bottom";
import { type SheetProps } from "components/common/MyVideoCard";
import Icon from "components/Icon";
import Heading from "components/UI/Heading";
import Ripple from "components/UI/Ripple";
import StyledText from "components/UI/StyledText";
import { LENSPLAY_SITE } from "constants/index";
import { black, white } from "constants/Colors";
import { PUBLICATION } from "constants/tracking";
import {
	type Attribute,
	type Post,
	useCreateSetProfileMetadataViaDispatcherMutation,
	usePublicationDetailsLazyQuery,
	type Profile,
} from "customTypes/generated";
import { type ProfileMetaDataV1nput } from "customTypes/index";
import { default as React, useEffect } from "react";
import { Dimensions, Image, Pressable, TouchableOpacity, View } from "react-native";
import usePinStore from "store/pinStore";
import { useActivePublication, useAuthStore, useProfile, useToast } from "store/Store";
import CommonStyles from "styles/index";
import getDifference from "utils/getDifference";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import TrackAction from "utils/Track";
import uploadToArweave from "utils/uploadToArweave";
import { v4 as uuidV4 } from "uuid";
import Unpin from "assets/Icons/Unpin";
import Pin from "assets/Icons/Pin";
import More from "assets/Icons/More";

export function UnPinSheet({ sheetRef }: Pick<SheetProps, "sheetRef">) {
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();
	const { setHasPinned } = usePinStore();
	const toast = useToast();

	const [createSetProfileMetadataViaDispatcherMutation] =
		useCreateSetProfileMetadataViaDispatcherMutation({
			onCompleted: () => {
				setHasPinned(false);
				toast.success("Video pinned successfully");
				void TrackAction(PUBLICATION.PIN_PUBLICATION);
			},
			onError: () => {
				toast.error("Some error occured please try again");
			},
		});

	const RemovepinPublication = async () => {
		let currentAttributes = currentProfile?.attributes;
		let attr = [...currentAttributes!];
		const isAlreadyPinned = attr?.find(
			(attr) => attr.traitType === "pinnedPublicationId" || attr.key === "pinnedPublicationId"
		);

		if (isAlreadyPinned) {
			const index = attr?.indexOf(isAlreadyPinned);
			attr?.splice(index!, 1);
		}

		const newMetaData: ProfileMetaDataV1nput = {
			version: "1.0.0",
			metadata_id: uuidV4(),
			name: currentProfile?.name || "",
			bio: currentProfile?.bio || "",
			cover_picture: getRawurl(currentProfile?.coverPicture),
			attributes: attr,
		};

		const hash = await uploadToArweave(newMetaData);

		void createSetProfileMetadataViaDispatcherMutation({
			variables: {
				request: {
					metadata: `ar://${hash}`,
					profileId: currentProfile?.id,
				},
			},
			context: {
				headers: {
					"x-access-token": `Bearer ${accessToken}`,
					"origin": LENSPLAY_SITE,
				},
			},
		});
	};

	return (
		<Sheet
			ref={sheetRef}
			snapPoints={[100]}
			enablePanDownToClose={true}
			enableOverDrag={true}
			bottomInset={32}
			style={CommonStyles.mx_8}
			detached={true}
			backgroundStyle={{
				backgroundColor: black[600],
			}}
		>
			<Ripple
				onTap={() => {
					RemovepinPublication();
					sheetRef?.current?.close();
				}}
			>
				<View
					style={{
						width: "100%",
						height: "auto",
						paddingVertical: 16,
						paddingHorizontal: 16,
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Unpin height={20} width={20} />
					<StyledText
						title={"Remove pin"}
						style={{
							fontSize: 16,
							marginHorizontal: 8,
							color: "white",
						}}
					/>
				</View>
			</Ripple>
		</Sheet>
	);
}

export default function PinnedPublication({
	sheetRef,
	profile,
	isChannel,
}: {
	sheetRef: Pick<SheetProps, "sheetRef">;
	profile: Profile;
	isChannel: boolean;
}) {
	const activeProfile = useProfile();
	const { accessToken } = useAuthStore();
	const pinStore = usePinStore();
	const navigation = useNavigation();
	const { setActivePublication } = useActivePublication();

	useEffect(() => {
		getPinnedPublication();
	}, [pinStore.publicationId]);

	const getPinnedPublication = () => {
		const attributes = profile?.attributes;

		const pinnedPublication = attributes?.find(
			(attr: Attribute) =>
				attr.traitType === "pinnedPublicationId" || attr.key === "pinnedPublicationId"
		);
		if (pinnedPublication) {
			pinStore.setHasPinned(true);
			pinStore.setPinnedPubId(pinnedPublication.value);
			void fetchPinnedPublication({
				variables: {
					request: {
						publicationId: pinnedPublication.value,
					},
					reactionRequest: {
						profileId: activeProfile?.currentProfile?.id,
					},
				},
			});
		}
	};

	const [fetchPinnedPublication, { data, loading, error }] = usePublicationDetailsLazyQuery({
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});

	if (error) return <></>;
	if (data && pinStore.hasPinned) {
		return (
			<View
				style={{
					marginTop: 24,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Pin height={12} width={12} color={white[200]}/>
					<StyledText
						title="Pinned video"
						style={{
							color: white[200],
							fontSize: 12,
							marginLeft: 8,
						}}
					/>
				</View>
				<Pressable
					style={{
						flexDirection: "row",
						maxWidth: Dimensions.get("window").width,
						marginTop: 16,
					}}
					onPress={() => {
						navigation.navigate("VideoPage");
						setActivePublication(data?.publication as Post);
					}}
				>
					<View>
						<Image
							source={{
								uri: getIPFSLink(getRawurl(data?.publication?.metadata?.cover)),
							}}
							style={{
								width: 160,
								height: 100,
								borderRadius: 8,
							}}
						/>
					</View>
					<View
						style={{
							height: "100%",
							width: "50%",
							marginLeft: 8,
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
								title={data?.publication?.metadata?.name}
								style={{ color: "white", fontSize: 16, fontWeight: "500" }}
								numberOfLines={2}
							/>
							<View
								style={{
									marginTop: 4,
								}}
							>
								<StyledText
									title={
										data?.publication?.metadata?.content || data?.publication?.metadata?.description
									}
									numberOfLines={1}
									style={{ color: "gray", fontSize: 12 }}
								/>
							</View>
							<View
								style={{
									marginTop: 2,
								}}
							>
								<StyledText
									title={getDifference(data?.publication?.createdAt)}
									style={{ color: "gray", fontSize: 12 }}
								/>
							</View>
						</View>
						{!isChannel ? (
							<TouchableOpacity
								activeOpacity={0.5}
								onPress={() => {
									//@ts-ignore Ref as it may be undefined
									sheetRef?.current?.snapToIndex(0);
								}}
								style={{
									padding: 4,
									height: "30%",
								}}
							>
								<More width={16} height={16} />
							</TouchableOpacity>
						) : null}
					</View>
				</Pressable>
			</View>
		);
	}
	return null;
}
