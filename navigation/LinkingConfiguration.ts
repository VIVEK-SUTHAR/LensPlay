import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types/navigation/types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("lensplay")],
  config: {
    screens: {
      Root: {
        path: "root",
        screens: {
          Home: {
            screens: {
              TabOneScreen: "home",
            },
          },
          Account: {
            path: "account",

            screens: {
              TabTwoScreen: "account",
            },
          },
        },
      },
      Modal: "modal",
      NotFound: "*",
      VideoPage: {
        path: "video",
        parse: { id: String },
      },
    },
  },
};

export default linking;
