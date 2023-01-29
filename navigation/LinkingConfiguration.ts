import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types/navigation/types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [
    Linking.createURL("lensplay"),
    Linking.createURL("https://lensplay-site.vercel.app"),
    Linking.createURL("https://lenstube.xyz"),
  ],
  config: {
    screens: {
      NotFound: "*",
      Channel: {
        path: "channel",
        parse: { id: String },
      },
      LinkingVideos: {
        path: "watch",
        parse: { id: String },
      },
    },
  },
};

export default linking;
