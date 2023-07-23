import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useNavigation } from "@react-navigation/native";
import Icon, { IconName } from "components/Icon";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black } from "constants/Colors";
import { Mirror, Post, Scalars } from "customTypes/generated";
import { Image } from "expo-image";
import React, { memo } from "react";
import { Dimensions, Pressable, TouchableOpacity, View } from "react-native";
import { useActivePublication } from "store/Store";
import getDifference from "utils/getDifference";
import getIPFSLink from "utils/getIPFSLink";
import getImageProxyURL from "utils/getImageProxyURL";
import getPlaceHolderImage from "utils/getPlaceHolder";
import getRawurl from "utils/getRawUrl";

type MyVideoCardProps = {
	publication: Mirror | Post;
	id: string;
	sheetRef?: React.RefObject<BottomSheetMethods>;
	setPublication: (publication: Mirror | Post) => void;
};

function MyVideoCard({ publication, id, sheetRef, setPublication }: MyVideoCardProps) {
	const navigation = useNavigation();
	const { setActivePublication } = useActivePublication();

	const memoizedPlaceHolder = React.useMemo(
		()=>getPlaceHolderImage(),[]
	)

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
					placeholder={memoizedPlaceHolder}
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
						setPublication(publication);
						sheetRef?.current?.snapToIndex(0);
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
	publication: Post | Mirror | null;
	profileId: Scalars["ProfileId"];
	playlistId?:string;
};

export type actionListType = {
	name: string;
	icon: IconName;
	onPress: (pubId: Scalars["InternalPublicationId"]) => void;
};
