import { useNavigation } from "@react-navigation/native";
import Avatar from "components/UI/Avatar";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { HandleInfo, PrimaryPublication, VideoMetadataV3 } from "customTypes/generated";
import { Image } from "expo-image";
import * as React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useActivePublication } from "store/Store";
import formatHandle from "utils/formatHandle";
import getDifference from "utils/getDifference";
import getImageProxyURL from "utils/getImageProxyURL";
import getIPFSLink from "utils/getIPFSLink";
import getPlaceHolderImage from "utils/getPlaceHolder";
import getRawurl from "utils/getRawUrl";
import getVideoDuration from "utils/getVideoDuration";
import Logger from "utils/logger";

type VideoCardProp = {
	publication: PrimaryPublication;
	id: string;
	height?: number | string;
	width?: number | string;
};

const VideoCard: React.FC<VideoCardProp> = ({ width = "auto", height = 200, publication }) => {
	const { setActivePublication } = useActivePublication();
	const navigation = useNavigation();
	const metadata = publication.metadata as VideoMetadataV3;
	const formattedHandle = formatHandle(publication.by.handle as HandleInfo);

	const navigateToVideoPage = React.useCallback(() => {
		Logger.Count("Start Navigation from VideoCard");
		setActivePublication(publication);
		navigation.navigate("VideoPage");
	}, [publication]);

	const navigateToUserChannel = React.useCallback(() => {
		navigation.navigate("Channel", {
			handle: formattedHandle,
			name: publication?.by.metadata?.displayName ?? "",
		});
	}, [publication]);

	const coverImage = getImageProxyURL({
		formattedLink: getIPFSLink(getRawurl(metadata.asset.cover)),
	});

	return (
		<View style={[styles.videoCardContainer, { width: width }]}>
			<View style={{ height: height }}>
				<TouchableWithoutFeedback onPress={navigateToVideoPage}>
					<Image
						placeholder={getPlaceHolderImage()}
						contentFit="cover"
						transition={500}
						recyclingKey={coverImage}
						source={{
							uri: coverImage,
						}}
						onError={(e) => {
							Logger.Error(
								`Failed to Load Video Cover of ${publication?.by.handle?.fullHandle}`,
								e.error
							);
						}}
						style={styles.coverImage}
					/>
				</TouchableWithoutFeedback>
				{getVideoDuration(metadata.asset.duration) && (
					<View style={styles.videoDurationBox}>
						<StyledText
							title={getVideoDuration(metadata.asset.duration)}
							style={{ color: "white", fontSize: 12 }}
						/>
					</View>
				)}
			</View>
			<TouchableWithoutFeedback onPress={navigateToUserChannel}>
				<View style={styles.videoTitleContainer}>
					<Avatar src={getRawurl(publication?.by.metadata?.picture)} height={40} width={40} />
					<View style={styles.videoTitle}>
						<Heading
							title={metadata.title}
							style={{ fontSize: 16, fontWeight: "600", color: "white" }}
							numberOfLines={1}
						/>
						<StyledText
							title={`By ${
								publication?.by?.metadata?.displayName || formattedHandle
							} ${getDifference(publication?.createdAt)}`}
							style={{ fontSize: 12, color: "gray" }}
							numberOfLines={1}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default React.memo(VideoCard);

const styles = StyleSheet.create({
	videoCardContainer: {
		margin: 10,
		borderRadius: 10,
	},
	coverImage: {
		height: "100%",
		width: "100%",
		borderRadius: 10,
		resizeMode: "cover",
	},
	videoDurationBox: {
		position: "absolute",
		bottom: 8,
		right: 8,
		width: "auto",
		paddingHorizontal: 4,
		paddingVertical: 2,
		height: "auto",
		backgroundColor: "rgba(0,0,0,0.6)",
		borderRadius: 4,
	},
	videoTitleContainer: {
		paddingVertical: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		// alignItems: "center",
	},
	videoTitle: {
		flex: 0.97,
	},
});
