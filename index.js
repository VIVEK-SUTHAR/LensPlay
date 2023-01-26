/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

const { Platform } = require("react-native");

if (Platform.OS !== "web") {
  require("./global");
}

const { registerRootComponent, scheme } = require("expo");
const { default: App } = require("./App");

const {
  default: AsyncStorage,
} = require("@react-native-async-storage/async-storage");
const { withWalletConnect } = require("@walletconnect/react-native-dapp");

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(
  withWalletConnect(App, {
    clientMeta: {
      name: "LensPlay",
      description:
        "Lensplay is a decentralized video-centric social graph built on top of Lens Protocol. It is designed to empower creators to own their social graph, forming a fully composable, user-owned social graph.",
      icons: ["https://lensplay-site.vercel.app/lensplay.png"],
      url: "https://lensplay-site.vercel.app",
    },
    redirectUrl:
      Platform.OS === "web" ? window.location.origin : `${scheme}://`,
    storageOptions: {
      asyncStorage: AsyncStorage,
    },
  })
);
