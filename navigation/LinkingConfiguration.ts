import { type LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { type RootStackParamList } from "../types/navigation/types";

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
				path: "channel/:id",
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
