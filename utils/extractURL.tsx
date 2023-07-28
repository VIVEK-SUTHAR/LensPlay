import { useNavigation } from "@react-navigation/native";
import StyledText from "components/UI/StyledText";
import { primary } from "constants/Colors";
import { IS_MAINNET, MENTION_REGEX, URL_REGEX } from "constants/index";
import React from "react";
import { Linking } from "react-native";
import Logger from "./logger";

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
	const renderText = (txt: string | undefined) =>
		txt?.split(" ").map((part, index) =>
			URL_REGEX.test(part) ? (
				<StyledText
					title={getDisplayLink(part)}
					key={index}
					style={{ color: primary, fontWeight: "600" }}
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
		const handle=string.split("@")[1]+".lens" ;
		Logger.Success('ok ',handle);
		if (MENTION_REGEX.test(string)) {
			return (
				<StyledText
					title={string}
					key={string}
					style={{ color: primary }}
					onPress={() => {
						navigation.navigate("Channel",{handle:handle});
					}}
				/>
			);
		} else return string;
	};
	return renderText(txt);
}
export default extractURLs;
