import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { memo } from "react";
import { Dimensions, Pressable, TouchableOpacity, View } from "react-native";
import { black } from "constants/Colors";
import { useActivePublication, useProfile } from "store/Store";
import { Mirror, Post, Scalars } from "customTypes/generated";
import getDifference from "utils/getDifference";
import getIPFSLink from "utils/getIPFSLink";
import getImageProxyURL from "utils/getImageProxyURL";
import getPlaceHolderImage from "utils/getPlaceHolder";
import getRawurl from "utils/getRawUrl";
import Icon, { IconName } from "components/Icon";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "constants/Storage";
import Logger from "utils/logger";
import getWatchLaters from "utils/watchlater/getWatchLaters";

type MyVideoCardProps = {
	publication: Mirror | Post;
	id: string;
	sheetRef?: React.RefObject<BottomSheetMethods>;
	setPubId?: (pubId: Scalars["InternalPublicationId"]) => void;
	setInWatchLater: (inWatchLater: boolean) => void;
};

function MyVideoCard({ publication, id, sheetRef, setPubId, setInWatchLater }: MyVideoCardProps) {
	const navigation = useNavigation();
	const { setActivePublication } = useActivePublication();
	const { currentProfile } = useProfile();

	const checkInWatchLater = async () => {
		// allWatchLaters?.find()
		const watchLaters = await AsyncStorage.getItem(StorageKeys.WatchLaters);
		console.log(watchLaters, "idhar hu");

		try {
			//first check pubId in async storage
			if (watchLaters) {
				const watchLaterArray = JSON.parse(watchLaters);
				const result = watchLaterArray.filter((item: string) => {
					if (item == publication?.id) {
						return true;
					} else {
						return false;
					}
				});
				if (result.length != 0) {
					setInWatchLater(true);
				} else {
					setInWatchLater(false);
				}
			}
			//if async storage is not yet set than check in db
			else {
				const watchLaterArray = await getWatchLaters(currentProfile?.id);
				const result = watchLaterArray.filter((item: string) => {
					if (item == publication?.id) {
						return true;
					} else {
						return false;
					}
				});
				if (result.length != 0) {
					setInWatchLater(true);
				} else {
					setInWatchLater(false);
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				Logger.Error(error.message);
			}
		} finally {
			sheetRef?.current?.snapToIndex(0);
		}
	};

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
				setActivePublication(publication);
				navigation.navigate("VideoPage");
			}}
		>
			<View>
				<Image
					placeholder={getPlaceHolderImage()}
					contentFit="cover"
					transition={500}
					cachePolicy="memory-disk"
					source={{
						uri: getImageProxyURL({
							formattedLink: getIPFSLink(getRawurl(publication?.metadata?.cover)),
						}),
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
						title={publication?.metadata?.name}
						style={{ color: "white", fontSize: 16, fontWeight: "500" }}
						numberOfLines={3}
					/>
					<View
						style={{
							marginTop: 4,
						}}
					>
						<StyledText
							title={publication?.metadata?.content || publication?.metadata?.description}
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
							title={getDifference(publication?.createdAt)}
							style={{ color: "gray", fontSize: 12 }}
						/>
					</View>
				</View>
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => {
						if (setPubId) {
							checkInWatchLater();
							setPubId(publication.id);
						}
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
}

export default memo(MyVideoCard);

export type SheetProps = {
	sheetRef: React.RefObject<BottomSheetMethods>;
	pubId: Scalars["InternalPublicationId"];
	profileId: Scalars["ProfileId"];
	inWatchLater: boolean;
};

export type actionListType = {
	name: string;
	icon: IconName;
	onPress: (pubId: Scalars["InternalPublicationId"]) => void;
};
