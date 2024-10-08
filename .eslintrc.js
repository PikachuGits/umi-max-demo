module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  rules: {
    'react/no-unknown-property': [
      'error',
      {
        ignore: ['intensity', 'position', 'castShadow', 'receiveShadow', 'attach', 'args'],
      },
    ],
  },
};
