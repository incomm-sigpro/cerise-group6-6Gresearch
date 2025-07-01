module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@pages': './src/pages',
            '@services': './src/services',
            '@types': './src/types',
            '@config': './src/config',
            '@contexts': './src/contexts',
            '@utils': './src/utils',
            '@hooks': './src/hooks',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
}; 