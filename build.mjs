import { execSync } from "child_process";
import fs from "fs";
import yargs from "yargs";
const LogLevel = {
	SUCCESS: "\x1b[36m",
	ERROR: "\x1b[31m",
	WARNING: "\x1b[33m",
	TIMECOUNT: "\x1b[35m",
};

/**
Build Script Workflow
Update Android Version Code and iOS Build Number:

The script reads the current values from app.json.
Increments the Android version code and iOS build number by one.
Writes the updated values back to app.json.
Commit Changes to the Repository:

Commits the changes made to app.json to the local Git repository.
Uses a default commit message, but you can customize it in the script if needed.
EAS Build Submission:

If the --android flag is present, submits an EAS build for Android.
If the --ios flag is present, submits an EAS build for iOS.

Run Below Command to Build

-> yarn build

-> Run yarn build --prod for Release Builds

*/

const LensPlayProductionConfig = {
	Slug: "lensplay",
	EasProjectID: "3b494bf0-e3fd-4a2c-b484-931ab7394de1",
	updatesUrl: `https://u.expo.dev/3b494bf0-e3fd-4a2c-b484-931ab7394de1`,
};
const LensPlayDevelopmentConfig = {
	Slug: "test",
	EasProjectID: "dc292891-6e08-49db-8e82-247dd43a39f7",
	updatesUrl: `https://u.expo.dev/dc292891-6e08-49db-8e82-247dd43a39f7`,
};

const APP_JSON_PATH = "./app.json";

function updateReleaseConfigForiOS() {
	try {
		console.log("Updating Build number for iOS...");
		const appJsonContent = fs.readFileSync(APP_JSON_PATH);
		let appConfig = JSON.parse(appJsonContent);
		if (appConfig.expo && appConfig.expo.ios && appConfig.expo.ios.buildNumber) {
			const currentBuildNumber = appConfig.expo.ios.buildNumber.split(".").map(Number);
			if (currentBuildNumber.length !== 3) {
				console.error("Error: Invalid build number format in app.json");
				return;
			}
			// Increment the last component of the build number
			currentBuildNumber[0] += 1;
			// Update the build number in the appConfig
			appConfig.expo.ios.buildNumber = currentBuildNumber.join(".");
			fs.writeFileSync(APP_JSON_PATH, JSON.stringify(appConfig, null, 2));
			console.log("iOS build number updated successfully!", LogLevel.SUCCESS);
		} else {
			console.error("Error: expo.ios.buildNumber not found in app.json", LogLevel.ERROR);
			return;
		}
	} catch (error) {}
}

function updateVersionCode() {
	try {
		const appJsonContent = fs.readFileSync(APP_JSON_PATH, "utf-8");
		let appConfig = JSON.parse(appJsonContent);
		// Increment the versionCode property for Android by one
		if (appConfig.expo.android && appConfig.expo.android.versionCode) {
			appConfig.expo.android.versionCode += 1;
		} else {
			console.error("Error: android.versionCode not found in app.json", LogLevel.ERROR);
			return;
		}
		// Write the updated content back to app.json
		fs.writeFileSync(APP_JSON_PATH, JSON.stringify(appConfig, null, 2));

		console.log("Android versionCode updated successfully!", LogLevel.SUCCESS);
	} catch (error) {
		console.log("Failed to update version code for android", LogLevel.ERROR, error);
	}
}

function commitToGit() {
	try {
		console.log("Commiting the changes to github...");
		execSync("git add .");
		execSync("git commit -m 'chore:update build config for release' ");
	} catch (error) {
		console.log("Failed to commit to gitub", LogLevel.ERROR, error);
	}
}

function submitEASBuildForAndroid() {
	try {
		console.log("Submitting Android Release build to EAS", LogLevel.WARNING);
		try {
			execSync("eas build --profile beta --platform android");
		} catch (error) {
			console.log("Failed to submit EAS Build for android", LogLevel.ERROR, error);
		}
	} catch (error) {}
}
function logEASBuildMessage() {
	console.log("EAS Builds are only available fro android via automated script");
	console.log("For iOS build Please run the below command");
	console.log("eas build --profile beta --platform android");
}

function updateAppJsononEnvironment(isProductionBuild) {
	try {
		const appJsonContent = fs.readFileSync(APP_JSON_PATH, "utf-8");
		let appConfig = JSON.parse(appJsonContent);
		if (isProductionBuild) {
			appConfig.expo.slug = LensPlayProductionConfig.Slug;
			appConfig.expo.updates.url = LensPlayProductionConfig.updatesUrl;
			appConfig.expo.extra.eas.projectId = LensPlayProductionConfig.EasProjectID;
		} else {
			appConfig.expo.slug = LensPlayDevelopmentConfig.Slug;
			appConfig.expo.updates.url = LensPlayDevelopmentConfig.updatesUrl;
			appConfig.expo.extra.eas.projectId = LensPlayDevelopmentConfig.EasProjectID;
		}
		fs.writeFileSync(APP_JSON_PATH, JSON.stringify(appConfig, null, 2));
	} catch (error) {}
}

function main() {
	try {
		let isProductionBuild = yargs.argv.prod ?? false;
		console.log("IS Release Build", isProductionBuild);
		updateAppJsononEnvironment(isProductionBuild);
		if (!yargs.argv.ios && !yargs.argv.android) {
			console.log("No Platform Specified...", LogLevel.WARNING);
			console.log("Building for Android and iOS");
			if (isProductionBuild) {
				updateReleaseConfigForiOS();
				updateVersionCode();
				commitToGit();
			}
			logEASBuildMessage();
			submitEASBuildForAndroid();
		}
		if (yargs.argv.ios) {
			console.log("Platform : iOS Syncing config and startiing...");
			if (isProductionBuild) {
				updateReleaseConfigForiOS();
				commitToGit();
			}
			logEASBuildMessage();
		}
		if (yargs.argv.android) {
			console.log("Platform : Android Syncing config and starting...");
			if (isProductionBuild) {
				updateVersionCode();
				commitToGit();
			}
			submitEASBuildForAndroid();
		}
	} catch (error) {}
}

main();
