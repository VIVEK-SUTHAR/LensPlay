import { Image, ImageProps } from "expo-image";
import React from "react";
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

	const mergedProps = {
		...defaultProps,
		...props,
	};

	return <Image {...mergedProps} />;
};

export default React.memo(LPImage);
