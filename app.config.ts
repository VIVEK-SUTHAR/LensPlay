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
  slug: "lensplay",
  version: "0.0.4",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "lensplay",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/adaptive-icon.png",
    resizeMode: "contain",
    backgroundColor: "#000000",
  },
  backgroundColor: "#000000",
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/b2fcb561-ea34-43d1-acf0-dabcba685aa2",
  },
  runtimeVersion: {
    policy: "sdkVersion",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  jsEngine: "hermes",
  android: {
    package: "com.lensplayxyz.lensplay",
    versionCode: 4,
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#000000",
    },
    intentFilters: [
      {
        action: "VIEW",
        data: [
          {
            scheme: "lensplay",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
      {
        action: "VIEW",
        autoVerify: true,
        data: [
          {
            scheme: "https",
            host: "www.lensplay.xyz",
            pathPrefix: "/watch/",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
      {
        action: "VIEW",
        autoVerify: true,
        data: [
          {
            scheme: "https",
            host: "www.lensplay.xyz",
            pathPrefix: "/channel/",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
  },
  web: {
    favicon: "./assets/images/favicon.png",
  },
  extra: {
    // eas: {
    //   projectId: "b2fcb561-ea34-43d1-acf0-dabcba685aa2",
    // },
  },
  plugins: [
    [
      "expo-image-picker",
      {
        photosPermission:
          "The app accesses your gallery to let you share them with your friends on Lens",
      },
    ],
    [
      "expo-camera",
      {
        cameraPermission: "Allow LensPlay to access your camera.",
      },
    ],
    [
      "react-native-vision-camera",
      {
        cameraPermissionText: "LensPlay needs access to your Camera.",
        enableMicrophonePermission: true,
        microphonePermissionText: "LensPlay needs access to your Microphone.",
      },
    ],
  ],
};

export default withPackageVisibility(config);
