const { getDefaultConfig } = require("expo/metro-config");
const crypto = require.resolve("crypto-browserify");
const url = require.resolve("url/");

const extraNodeModules = {
	crypto,
	url,
	fs: require.resolve("expo-file-system"),
	http: require.resolve("stream-http"),
	https: require.resolve("https-browserify"),
	os: require.resolve("os-browserify/browser.js"),
	path: require.resolve("path-browserify"),
	stream: require.resolve("readable-stream"),
	vm: require.resolve("vm-browserify"),
};

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = extraNodeModules;

module.exports = config;
