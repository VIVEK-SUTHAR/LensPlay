import {
  AndroidManifest,
  ConfigPlugin,
  withAndroidManifest,
} from "@expo/config-plugins";
import { ExpoConfig } from "@expo/config-types";
import xml2js from "xml2js";

const queriesXml = `
<queries>
  <intent>
    <action android:name="android.intent.action.VIEW" />
    <data android:scheme="wc"/>
  </intent>
  <intent>
    <action android:name="android.intent.action.VIEW" />
    <data android:scheme="https"/>
  </intent>
  <intent>
    <action android:name="android.intent.action.VIEW" />
    <data android:scheme="wss"/>
  </intent>
</queries>`;

type KeyValuePair = {
  $: {
    [key: string]: string | undefined;
  };
};

type Intent = {
  action?: KeyValuePair[];
  data?: KeyValuePair[];
};

type Queries = {
  intent?: Intent[];
};

type ParseResult = {
  queries: Queries;
};

type AndroidManifestWithQuery = AndroidManifest & {
  manifest: {
    $: {
      ["queries"]?: any;
    };
  };
};

/**
 * Does not currently work as expected, need to run `expo prebuild`
 * to configure plugins, but this breaks the `Expo Go` app functionality
 *
 * @param androidManifest A AndroidManifest file that has been updated
 *                        to accept queries as a parameter
 * @returns an updated AndroidManifest file
 *
 * @see https://chafikgharbi.com/expo-android-manifest/
 * @see https://docs.expo.dev/workflow/customizing/
 * @see https://docs.expo.dev/workflow/configuration/
 * @see https://docs.expo.dev/guides/config-plugins/#modifying-the-androidmanifestxml
 */
const addQueryToManifest = (androidManifest: AndroidManifestWithQuery) => {
  const { manifest } = androidManifest;
  let packageQuery: Queries;

  xml2js.parseString(queriesXml, (err, result: ParseResult) => {
    packageQuery = result.queries;

    if (!Array.isArray(manifest.$["queries"])) {
      manifest.$["queries"] = [];
    }

    manifest.$["queries"].push(packageQuery);
  });

  return androidManifest;
};

const withPackageVisibility: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (config) => {
    config.modResults = addQueryToManifest(config.modResults);
    return config;
  });
};

const config: ExpoConfig = {
  name: "LensPlay",
  slug: "LensPlay",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/lensplay.png",
  scheme: "lensplay",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/lensplay.png",
    resizeMode: "contain",
    backgroundColor: "#000000",
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/c3c41aca-6bdd-4196-a006-a524dcf26c4e",
  },
  runtimeVersion: {
    policy: "sdkVersion",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    package: "com.clxyder.lensplay",
    adaptiveIcon: {
      foregroundImage: "./assets/images/lensplay.png",
      backgroundColor: "#000000",
    },
  },
  web: {
    favicon: "./assets/images/favicon.png",
  },
  extra: {
    eas: {
      projectId: "c3c41aca-6bdd-4196-a006-a524dcf26c4e",
    },
  },
  plugins: [
    [
      "expo-image-picker",
      {
        photosPermission:
          "The app accesses your gallery to let you share them with your friends on Lens",
      },
    ],
  ],
};

export default withPackageVisibility(config);
