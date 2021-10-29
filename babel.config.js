module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    ['@babel/preset-env', {targets: {node: 'current'}}],
    ['@babel/preset-react', {targets: {node: 'current'}}],
    {
      plugins: [
        '@babel/plugin-syntax-jsx'
      ]
    }
  ],
};
