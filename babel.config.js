module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: '.',
          alias: {
            '@assets': './assets',
            '@actions': './actions',
            '@api': './api',
            '@theme': './theme',
            '@components': './components',
            '@constants': './constants',
            '@helpers': './helpers',
            '@reducers': './reducers',
            '@screens': './screens',
            '@middleware': './middleware',
            '@interceptors': './interceptors',
            '@store': './store',
            '@hooks':'./hooks',
            '@navigation':'./navigation'
          }
        }
      ]
    ]
  };
};
