module.exports = function(api) {
  api.cache(true);
  return {
    presets: process.env.NODE_ENV !== 'test' ? ['babel-preset-expo'] : ['babel-preset-expo', '@babel/preset-env'],
    plugins: ['expo-router/babel'],
  };
};