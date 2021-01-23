module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            components: './src/components',
            store: './src/store',
            pages: './src/pages',
            styles: './src/styles',
            utils: './src/utils',
            services: './src/services',
          },
        },
      ],
    ],
  };
};
