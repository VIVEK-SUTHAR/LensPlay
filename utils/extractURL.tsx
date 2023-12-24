import { useNavigation } from "@react-navigation/native";
import StyledText from "components/UI/StyledText";
import { primary } from "constants/Colors";
import { IS_MAINNET, MENTION_REGEX, URL_REGEX } from "constants/index";
import React from "react";
import { Linking } from "react-native";
import { useThemeStore } from "store/Store";

/**
 * @param txt Simple text that may contain URLs
 * @returns Same text with URLs highlighted
 */

const checkIsLensTubeLink = (url: string) => {
	const lenstube = IS_MAINNET
		? /\bhttps:\/\/lenstube\.xyz\/watch\/\b/
		: /https:\/\/testnet\.lenstube\.xyz\/watch\//;

	const isLentubeLink = lenstube.test(url);
	return isLentubeLink;
};

// Opens Links in External  Browser
async function openLinkInBrowser(markDownLink: string) {
	const match = URL_REGEX.exec(markDownLink);
	if (match) {
		const url = match[0];
		Linking.openURL(url);
	}
}

// Returns a formatted, only link text which is tested on standard http regex
function getDisplayLink(markDownLink: string) {
	const match = URL_REGEX.exec(markDownLink);
	if (match) {
		const url = match[0];
		return url + "\n";
	}
}

function extractURLs(txt: string | undefined) {
	const navigation = useNavigation();
	const { PRIMARY } = useThemeStore();
	const renderText = (txt: string | undefined) =>
		txt?.split(" ").map((part, index) =>
			URL_REGEX.test(part) ? (
				<StyledText
					title={getDisplayLink(part)}
					key={index}
					style={{ color: PRIMARY, fontWeight: "600" }}
					onPress={async () => {
						checkIsLensTubeLink(part)
							? navigation.navigate("LinkingVideo", {
									id: part.split("/watch/")[1],
							  })
							: openLinkInBrowser(part);
					}}
				/>
			) : (
				<>{checkIsLens(part)} </>
			)
		);
	const checkIsLens = (string: string) => {
		var handle = string.split("@")[1];
		if (!string.includes(".lens")) {
			handle = handle + ".lens";
		}

		if (MENTION_REGEX.test(string)) {
			return (
				<StyledText
					title={string}
					key={string}
					style={{ color: PRIMARY }}
					onPress={() => {
						if (!handle) return;
						console.log(string);
						if (string.endsWith(".lens")) {
							const removedLens = string.slice(1, -5);

							navigation.navigate("Channel", { handle: `lens/${removedLens}` });
							return;
						}

						navigation.navigate("Channel", { handle: `lens/${string.slice(1)}` });
					}}
				/>
			);
		} else return string;
	};
	return renderText(txt);
}
export default extractURLs;
