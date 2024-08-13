module.exports = function (api) {
  api.cache(false);

  const presets = [
    ['@babel/preset-typescript'],
    ['@babel/preset-env'],
  ];

  const plugins = [
    ['@babel/plugin-transform-object-assign'],
    ['@babel/transform-runtime', { useESModules: true, regenerator: true }],
  ];

  return {
    presets,
    plugins,
    ignore: [/\/node_modules\//],
  };
};
