import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "customTypes/navigation/types";

const linkingConfig: LinkingOptions<RootStackParamList> = {
	prefixes: [
		Linking.createURL("/"),
	],
	config: {
		screens: {
			NotFound: "*",
			Channel: {
				path: "channel/:handle",
				parse: { handle: String },
			},
			LinkingVideo: {
				path: "watch/:id",
				parse: { id: String },
			},
		},
	},
};

export default linkingConfig;
