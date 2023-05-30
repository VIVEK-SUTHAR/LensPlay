import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { getColors } from "react-native-image-colors";
import { useBgColorStore } from "store/BgColorStore";
import getImageProxyURL from "utils/getImageProxyURL";
import getIPFSLink from "utils/getIPFSLink";
import getPlaceHolderImage from "utils/getPlaceHolder";

type CoverProps = {
	url: string;
	navigation: any;
};

const Cover = ({ url, navigation }: CoverProps) => {
	const { setCoverColors } = useBgColorStore();
	const coverURL = React.useMemo(
		() =>
			getImageProxyURL({
				formattedLink: getIPFSLink(url),
			}),
		[url, navigation]
	);
	React.useEffect(() => {
		getColors(coverURL, {
			fallback: "#000000",
			cache: true,
			key: coverURL,
			quality: "lowest",
			pixelSpacing: 500,
		}).then((colors) => {
			switch (colors.platform) {
				case "android":
					setCoverColors(colors.average);
					break;
				case "ios":
					setCoverColors(colors.primary);
					break;
				default:
					setCoverColors("black");
			}
		});

		return () => {
			setCoverColors(null);
		};
	}, []);

	const navigateToFullImage = React.useCallback(() => {
		navigation.navigate("FullImage", {
			url: url,
		});
	}, [url]);

	return (
		<Pressable onPress={navigateToFullImage} style={styles.coverContainer}>
			<Image
				placeholder={getPlaceHolderImage(true)}
				placeholderContentFit="cover"
				transition={500}
				priority={"high"}
				source={{
					uri: getImageProxyURL({ formattedLink: getIPFSLink(url) }),
				}}
				style={styles.imageStyle}
				contentFit="cover"
			/>
		</Pressable>
	);
};

export default React.memo(Cover);

const styles = StyleSheet.create({
	coverContainer: {
		height: 180,
		marginBottom: 34,
	},
	imageStyle: {
		height: "100%",
		width: "100%",
	},
});
