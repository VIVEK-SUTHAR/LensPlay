/**
 *
 * @param imageUrl The URL of Image
 * @returns Primary color of image
 */

import { getColors } from "react-native-image-colors";
import { useBgColorStore } from "../store/BgColorStore";

const getImageColor = async (imageUrl: string, isAvatar: boolean): Promise<void> => {
	const { setAvatarColors, setCoverColors } = useBgColorStore();
	getColors(imageUrl, {
		cache: true,
		fallback: "black",
		key: imageUrl,
		quality: "lowest",
		pixelSpacing: 500,
	})
		.then((colors) => {
			switch (colors.platform) {
			case "android":
				if (isAvatar) {
					setAvatarColors(colors.average);
					break;
				}
				setCoverColors(colors.average);
				break;
			case "ios":
				if (isAvatar) {
					setAvatarColors(colors.primary);
					break;
				}
				setCoverColors(colors.primary);
				break;
			default:
				setAvatarColors("black");
				setCoverColors("black");
			}
		})
		.catch(() => {});
};
export default getImageColor;
