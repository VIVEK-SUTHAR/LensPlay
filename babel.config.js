module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					alias: {
						apollo: './apollo',
						assets: './assets',
						components: './components',
						constants: './constants',
						hooks: './hooks',
						navigation: './navigation',
						screens: './screens',
						store: './store',
						styles: './styles',
						customTypes: './types',
						utils: './utils',
					},
				},
			],
			'react-native-reanimated/plugin',
		],
	};
};
