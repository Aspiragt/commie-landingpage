const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuración específica para web
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx'];
config.transformer.babelTransformerPath = require.resolve('metro-react-native-babel-transformer');

module.exports = config;
