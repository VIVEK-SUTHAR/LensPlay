import React from "react";
import { Linking } from "react-native";
import { IS_MAINNET, MENTION_REGEX, URL_REGEX } from "../constants";
import { primary } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import StyledText from "../components/UI/StyledText";

/**
 *
 * @param txt Simple text that may contain URLs
 * @returns Same text with URLs highlighted
 */

const checkIsLensTubeLink = (url: string): boolean => {
	const lenstube = IS_MAINNET
		? /\bhttps:\/\/lenstube\.xyz\/watch\/\b/
		: /https:\/\/testnet\.lenstube\.xyz\/watch\//;

	const isLentubeLink = lenstube.test(url);
	if (isLentubeLink) {
		return true;
	} else {
		// Linking.openURL(url);
		return false;
	}
};

function extractURLs(txt: string | undefined): JSX.Element[] | undefined {
	const navigation = useNavigation();
	const renderText = (txt: string | undefined): JSX.Element[] | undefined =>
		txt?.split(" ").map((part, index) =>
			URL_REGEX.test(part) ? (
				<StyledText
					title={part + " "}
					key={index}
					style={{ color: primary, textDecorationLine: "underline" }}
					onPress={() => {
						if (checkIsLensTubeLink(part)) {
							navigation.navigate("LinkingVideo", {
								id: part.split("/watch/")[1],
							});
						} else {
							Linking.openURL(part).catch(() => {});
						}
					}}
				/>
			) : (
				<>{checkIsLens(part)} </>
			)
		);
	const checkIsLens = (string: string): string | JSX.Element => {
		if (MENTION_REGEX.test(string)) {
			return (
				<StyledText
					title={string}
					key={string}
					style={{ color: primary }}
					onPress={() => {
						// navigation.navigate("Channel");
					}}
				/>
			);
		} else return string;
	};
	return renderText(txt);
}
export default extractURLs;
