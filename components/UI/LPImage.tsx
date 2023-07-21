import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image, ImageProps } from "expo-image";
import getPlaceHolderImage from "utils/getPlaceHolder";

type LPImageProps = Omit<ImageProps, "placeholder">;

const LPImage: React.FC<LPImageProps> = (props) => {
	const memoizedCoverImage = React.useMemo(() => getPlaceHolderImage(), []);

	const defaultProps: ImageProps = {
		transition: 500,
		placeholder: memoizedCoverImage,
		placeholderContentFit: "cover",
		contentFit: "cover",
	};

	const mergerdProps = {
		defaultProps,
		...props,
	};

	return <Image {...mergerdProps} />;
};

export default React.memo(LPImage);
