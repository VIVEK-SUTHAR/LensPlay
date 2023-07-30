import { AndroidManifest, ConfigPlugin, withAndroidManifest } from "@expo/config-plugins";
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
	version: "1.0.2",
	// orientation: "portrait",
	backgroundColor: "#000000",
	icon: "./assets/images/icon.png",
	scheme: "lensplay",
	userInterfaceStyle: "automatic",
	splash: {
		image: "./assets/images/adaptive-icon.png",
		resizeMode: "contain",
		backgroundColor: "#000000",
	},
	updates: {
		fallbackToCacheTimeout: 0,
		url: "https://u.expo.dev/2a7e6b8e-3f77-43ee-adeb-2d04c2c03a3f",
	},
	runtimeVersion: {
		policy: "sdkVersion",
	},
	assetBundlePatterns: ["**/*"],
	ios: {
		supportsTablet: false,
		requireFullScreen: true,
		bundleIdentifier: "com.lensplayxyz.lensplay",
		buildNumber: "5.0.0",
		icon: "./assets/images/icon.png",
		backgroundColor: "#000000",
		googleServicesFile: "./GoogleService-Info.plist",
	},
	jsEngine: "hermes",
	android: {
		package: "com.lensplayxyz.lensplay",
		versionCode: 8,
		googleServicesFile: "./google-services.json",
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
		eas: {
			projectId: "2a7e6b8e-3f77-43ee-adeb-2d04c2c03a3f",
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
		[
			"expo-camera",
			{
				cameraPermission: "Allow LensPlay to access your camera.",
			},
		],
		[
			"expo-screen-orientation",
			{
				initialOrientation: "DEFAULT",
			},
		],
		[
			"expo-build-properties",
			{
				ios: {
					useFrameworks: "static",
				},
			},
		],
		[
			"react-native-vision-camera",
			{
				"cameraPermissionText": "LensPlay needs access to your Camera.",

				// optionally, if you want to record audio:
				"enableMicrophonePermission": true,
				"microphonePermissionText": "LensPlay needs access to your Microphone."
			}
		],
		"@react-native-firebase/app",
		"@react-native-firebase/perf",
		"@react-native-firebase/crashlytics",
	],
};

export default withPackageVisibility(config);
