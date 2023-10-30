module.exports = function(api) {
  api.cache(true);
  return {
    presets: process.env.NODE_ENV !== 'test' ? ['babel-preset-expo'] : ['babel-preset-expo', '@babel/preset-env'],
    plugins: process.env.NODE_ENV !== 'test' ? ['expo-router/babel'] : ['expo-router/babel', '@babel/plugin-proposal-class-properties'],
  };
};
