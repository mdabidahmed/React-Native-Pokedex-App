module.exports = {
  root: true,
  'prettier/prettier': [
    'error',
    {
      fileInfoOptions: {
        withNodeModules: true,
      },
    },
  ],
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
