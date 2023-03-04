import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types/navigation/types";

const linking: LinkingOptions<RootStackParamList> = {
	prefixes: [
		Linking.createURL("lensplay://"),
		Linking.createURL("https://lensplay.xyz"),
		Linking.createURL("https://lenstube.xyz"),
		Linking.createURL("https://testnet.lenstube.xyz"),
	],
	config: {
		screens: {
			NotFound: "*",
			Channel: {
				path: "channel",
				parse: { id: String },
			},
			LinkingVideo: {
				path: "watch/:id",
				parse: { id: String },
			},
		},
	},
};

export default linking;
